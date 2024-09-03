import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'

import { Collections } from '@/constants/fireStoreCollections'
import { Messages } from '@/constants/messages'
import { Status } from '@/constants/responseStatus'
import type { UserInfoDoc } from '@/customTypes/user'
import { db } from '@/firebase'

type UpdateUsersTweetsList = {
    tweetId: string
    uid: string
}

type HasFollowedByUserType = {
    currentUserUid: string
    anotherUserUid: string
}

export const getUser = async (uid: string) => {
    try {
        const q = query(collection(db, Collections.USERS), where('uid', '==', uid))
        const querySnapshot = await getDocs(q)
        return querySnapshot.docs[0].data() as UserInfoDoc
    } catch (error) {
        console.log(error)
    }
}

export const updateUserTweetsList = async ({ tweetId, uid }: UpdateUsersTweetsList) => {
    try {
        const userData = await getUser(uid)
        if (userData) {
            const docRef = doc(db, Collections.USERS, uid)
            if (userData.tweets.indexOf(tweetId) !== -1) {
                userData.tweets = userData.tweets.filter(id => id !== tweetId)
            } else {
                userData.tweets.push(tweetId)
            }
            await updateDoc(docRef, {
                ...userData,
            })
            return { status: Status.SUCCESS, message: Messages.TWEET_CREATION_SUCCESS }
        } else {
            throw new Error()
        }
    } catch (error) {
        return { status: Status.FAIL, message: Messages.TWEET_CREATION_FAIL }
    }
}

export const updateUserLikedTweetsList = async ({ tweetId, uid }: UpdateUsersTweetsList) => {
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

export const removeTweetFromLikedTweets = async ({ tweetId, uid }: UpdateUsersTweetsList) => {
    try {
        const userData = await getUser(uid)
        if (userData) {
            const docRef = doc(db, Collections.USERS, uid)
            const likes = (userData.likedTweets = userData.likedTweets.filter(id => id !== tweetId))
            await updateDoc(docRef, {
                ...userData,
                likedTweets: likes,
            })
            return { status: Status.SUCCESS }
        } else {
            throw new Error()
        }
    } catch (error) {
        return { status: Status.FAIL }
    }
}

export const hasLikedByUser = async ({ tweetId, uid }: UpdateUsersTweetsList) => {
    try {
        const userData = await getUser(uid)
        return userData?.likedTweets.indexOf(tweetId) !== -1
    } catch (error) {
        return false
    }
}

export const hasFollowedByUser = async ({ currentUserUid, anotherUserUid }: HasFollowedByUserType) => {
    try {
        const userData = await getUser(currentUserUid)
        return userData?.following.indexOf(anotherUserUid) !== -1
    } catch (error) {
        return false
    }
}

export const updateUserFollowers = async ({ currentUserUid, anotherUserUid }: HasFollowedByUserType) => {
    try {
        const currentUserData = await getUser(currentUserUid)
        const anothertUserData = await getUser(anotherUserUid)
        if (currentUserData && anothertUserData) {
            const currentUserdocRef = doc(db, Collections.USERS, currentUserUid)
            const anotherUserdocRef = doc(db, Collections.USERS, anotherUserUid)

            if (anothertUserData.followers.indexOf(currentUserUid) !== -1) {
                anothertUserData.followers = anothertUserData.followers.filter(id => id !== currentUserUid)
                currentUserData.following = currentUserData.following.filter(id => id !== anotherUserUid)
            } else {
                anothertUserData.followers.push(currentUserUid)
                currentUserData.following.push(anotherUserUid)
            }

            await updateDoc(currentUserdocRef, {
                ...currentUserData,
            })
            await updateDoc(anotherUserdocRef, {
                ...anothertUserData,
            })
            return { status: Status.SUCCESS }
        } else {
            throw new Error()
        }
    } catch (error) {
        return { status: Status.FAIL }
    }
}
