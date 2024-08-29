import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'

import { Collections } from '@/constants/fireStoreCollections'
import { Messages } from '@/constants/messages'
import { Status } from '@/constants/responseStatus'
import type { UserInfoDoc } from '@/customTypes/user'
import { db } from '@/firebase'

export const getUser = async (uid: string) => {
    try {
        const q = query(collection(db, Collections.USERS), where('uid', '==', uid))
        const querySnapshot = await getDocs(q)
        return querySnapshot.docs[0].data() as UserInfoDoc
    } catch (error) {
        console.log(error)
    }
}

export const updateUserTweetsList = async (uid: string, tweetId: string) => {
    try {
        const userData = await getUser(uid)
        if (userData) {
            const docRef = doc(db, Collections.USERS, uid)
            await updateDoc(docRef, {
                ...userData,
                tweets: [...userData.tweets, tweetId],
            })
            return { status: Status.SUCCESS, message: Messages.TWEET_CREATION_SUCCESS }
        } else {
            throw new Error()
        }
    } catch (error) {
        return { status: Status.FAIL, message: Messages.TWEET_CREATION_FAIL }
    }
}

export const updateUserLikedTweetsList = async (uid: string, tweetId: string) => {
    try {
        const userData = await getUser(uid)
        if (userData) {
            const docRef = doc(db, Collections.USERS, uid)
            if (userData.likedTweets.indexOf(tweetId) !== -1) {
                userData.likedTweets = userData.likedTweets.filter(id => id !== tweetId)
            } else {
                userData.likedTweets.push(tweetId)
            }
            await updateDoc(docRef, {
                ...userData,
            })
            return { status: Status.SUCCESS }
        } else {
            throw new Error()
        }
    } catch (error) {
        return { status: Status.FAIL }
    }
}

export const hasLikedByUser = async (uid: string, tweetId: string) => {
    try {
        const userData = await getUser(uid)
        return userData?.likedTweets.indexOf(tweetId) !== -1
    } catch (error) {
        return false
    }
}
