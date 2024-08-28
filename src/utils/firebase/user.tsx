import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'

import { Collections } from '@/constants/fireStoreCollections'
import { Messages } from '@/constants/messages'
import { Status } from '@/constants/responseStatus'
import { db } from '@/firebase'

export const updateUserTweetsList = async (uid: string, tweetId: string) => {
    try {
        const userData = await getUser(uid)
        if (userData) {
            const docRef = doc(db, Collections.USERS, uid)
            await updateDoc(docRef, {
                ...userData,
                tweets: 'tweets' in userData ? [...userData.tweets, tweetId] : [tweetId],
            })
            return { status: Status.SUCCESS, message: Messages.TWEET_CREATION_SUCCESS }
        } else {
            throw new Error()
        }
    } catch (error) {
        return { status: Status.FAIL, message: Messages.TWEET_CREATION_FAIL }
    }
}

export const getUser = async (uid: string) => {
    try {
        const q = query(collection(db, Collections.USERS), where('uid', '==', uid))
        const querySnapshot = await getDocs(q)
        return querySnapshot.docs[0].data()
    } catch (error) {
        console.log(error)
    }
}
