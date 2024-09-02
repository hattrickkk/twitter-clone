import {
    collection,
    deleteDoc,
    doc,
    DocumentData,
    getDocs,
    limit,
    onSnapshot,
    orderBy,
    query,
    QueryDocumentSnapshot,
    setDoc,
    startAfter,
    updateDoc,
    where,
} from 'firebase/firestore'

import { Collections } from '@/constants/fireStoreCollections'
import { Messages } from '@/constants/messages'
import { Status } from '@/constants/responseStatus'
import type { Tweet, TweetDoc } from '@/customTypes/tweet'
import { db } from '@/firebase'
import { generateHash } from '@/utils/generateHash'

import { getUser, removeTweetFromLikedTweets, updateUserTweetsList } from './user'

export const setTweetToFireStore = async (tweet: Tweet) => {
    const created = new Date().toISOString()
    const tweetId = await generateHash(created.toString())
    const docRef = doc(db, Collections.TWEETS, tweetId)
    await setDoc(docRef, { ...tweet, created, tweetId, likes: [] })
    return tweetId
}

export const getTweet = async (tweetId: string) => {
    try {
        const q = query(collection(db, Collections.TWEETS), where('tweetId', '==', tweetId))
        const querySnapshot = await getDocs(q)
        return querySnapshot.docs[0].data() as TweetDoc
    } catch (error) {
        console.log(error)
    }
}

export const getTweets = (
    lastTweet: QueryDocumentSnapshot<DocumentData, DocumentData> | null,
    callback: (tweets: TweetDoc[], lastTweet: QueryDocumentSnapshot<DocumentData, DocumentData> | null) => void
) => {
    const collectionRef = query(
        collection(db, Collections.TWEETS),
        orderBy('created', 'desc'),
        ...(lastTweet ? [startAfter(lastTweet)] : []),
        limit(5)
    )

    const unsubscribe = onSnapshot(collectionRef, querySnapshot => {
        const tweets: TweetDoc[] = []
        querySnapshot.forEach(doc => {
            tweets.push(doc.data() as TweetDoc)
        })
        const last = querySnapshot.docs[querySnapshot.docs.length - 1]
        callback(tweets, last)
    })

    return unsubscribe
}

type UpdateTweetsData = {
    tweetId: string
    uid: string
    isLiked: boolean
}

export const updateTweetLikes = async ({ tweetId, uid, isLiked }: UpdateTweetsData) => {
    try {
        const tweetData = await getTweet(tweetId)
        if (tweetData) {
            const docRef = doc(db, Collections.TWEETS, tweetId)
            isLiked ? tweetData.likes.pop() : tweetData.likes.push(uid)
            await updateDoc(docRef, {
                ...tweetData,
            })
            return { status: Status.SUCCESS }
        } else {
            throw new Error()
        }
    } catch (error) {
        return { status: Status.FAIL, message: error }
    }
}

export const deleteTweetDoc = async (tweetId: string) => {
    try {
        const q = query(collection(db, Collections.TWEETS), where('tweetId', '==', tweetId))
        const querySnapshot = await getDocs(q)
        const documentId = querySnapshot.docs[0].id
        const { likes, userId } = querySnapshot.docs[0].data() as TweetDoc
        await updateUserTweetsList({ uid: userId, tweetId })
        likes.forEach(async uid => await removeTweetFromLikedTweets({ uid, tweetId }))
        await deleteDoc(doc(db, Collections.TWEETS, documentId))
        return { status: Status.SUCCESS, message: Messages.DELETE_SUCCESS }
    } catch (error) {
        return { status: Status.FAIL, message: Messages.DELETE_FAIL }
    }
}

export const getUsersTweets = async (uid: string) => {
    try {
        const user = await getUser(uid)
        if (user) {
            const likedTweets = user.likedTweets
            const ownTweets = user.tweets
            const likedPromises = likedTweets.map(tweetId => getTweet(tweetId))
            const ownPromises = ownTweets.map(tweetId => getTweet(tweetId))
            const liked = await Promise.all(likedPromises)
            const own = await Promise.all(ownPromises)
            const tweets = {
                liked: liked.filter(Boolean),
                own: own.filter(Boolean),
            }
            return { status: Status.SUCCESS, tweets }
        } else {
            throw new Error()
        }
    } catch (error) {
        return { status: Status.FAIL }
    }
}
