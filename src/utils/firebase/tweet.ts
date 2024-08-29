import { collection, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc, where } from 'firebase/firestore'

import { Collections } from '@/constants/fireStoreCollections'
import { Status } from '@/constants/responseStatus'
import type { Tweet, TweetDoc } from '@/customTypes/tweet'
import { db } from '@/firebase'
import { generateHash } from '@/utils/generateHash'

export const setTweetToFireStore = async (tweet: Tweet) => {
    const created = new Date().toISOString()
    const tweetId = await generateHash(created.toString())
    const docRef = doc(db, Collections.TWEETS, tweetId)
    await setDoc(docRef, { ...tweet, created, tweetId, likes: 0 })
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

export const getAllTweets = async () => {
    const tweets: TweetDoc[] = []
    const collectionRef = query(collection(db, Collections.TWEETS), orderBy('created', 'desc'))

    const querySnapshot = await getDocs(collectionRef)

    querySnapshot.forEach(doc => {
        tweets.push(doc.data() as TweetDoc)
    })
    return tweets
}

export const updateTweetLikes = async (tweetId: string, likesCount: number) => {
    try {
        const tweetData = await getTweet(tweetId)
        if (tweetData) {
            const docRef = doc(db, Collections.TWEETS, tweetId)
            await updateDoc(docRef, {
                ...tweetData,
                likes: likesCount,
            })
            return { status: Status.SUCCESS }
        } else {
            throw new Error()
        }
    } catch (error) {
        return { status: Status.FAIL, message: error }
    }
}
