import {
    collection,
    doc,
    DocumentData,
    getDocs,
    limit,
    onSnapshot,
    query,
    QueryDocumentSnapshot,
    startAfter,
    updateDoc,
    where,
} from 'firebase/firestore'

import { Collections } from '@/constants/fireStoreCollections'
import { TWEETS_ON_PAGE } from '@/constants/magicValues'
import { Messages } from '@/constants/messages'
import { Status } from '@/constants/responseStatus'
import type { UserInfoDoc } from '@/customTypes/user'
import { db } from '@/firebase'

type UpdateUsersTweetsList = {
    tweetId: string
    uid: string
}

export type UsersUids = {
    currentUserUid: string
    anotherUserUid: string
}

export type UpdateUserInfoParams = {
    description?: string
    userName: string
    displayName: string
    phoneNumber: string
    photoURL?: string
    banner?: string
    uid: string
    birthDate?: string
    displayName_lowercase: string
    userName_lowercase: string
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

export const getUserOnSnapshot = (uid: string, callback: (user: UserInfoDoc) => void) => {
    try {
        const q = query(collection(db, Collections.USERS), where('uid', '==', uid))
        return onSnapshot(q, querySnapshot => callback(querySnapshot.docs[0].data() as UserInfoDoc))
    } catch (error) {
        console.log(error)
    }
}

export const getUsersExceptCurrent = (
    currentUserUid: string,
    lastUser: QueryDocumentSnapshot<DocumentData, DocumentData> | null,
    callback: (users: UserInfoDoc[], lastUser: QueryDocumentSnapshot<DocumentData, DocumentData> | null) => void
) => {
    const collectionRef = query(
        collection(db, Collections.USERS),
        ...(lastUser ? [startAfter(lastUser)] : []),
        limit(TWEETS_ON_PAGE)
    )
    return onSnapshot(collectionRef, querySnapshot => {
        const users: UserInfoDoc[] = []
        querySnapshot.forEach(doc => {
            doc.data().uid !== currentUserUid && users.push(doc.data() as UserInfoDoc)
        })
        const last = querySnapshot.docs[querySnapshot.docs.length - 1]
        callback(users, last)
    })
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
            throw new Error(Messages.TWEET_CREATION_FAIL)
        }
    } catch (error) {
        return { status: Status.FAIL, message: error as Messages }
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
            throw new Error(Messages.DEFAULT_FAIL)
        }
    } catch (error) {
        return { status: Status.FAIL, message: error as Messages }
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
            throw new Error(Messages.DEFAULT_FAIL)
        }
    } catch (error) {
        return { status: Status.FAIL, message: error as Messages }
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

export const hasFollowedByUser = async ({ currentUserUid, anotherUserUid }: UsersUids) => {
    try {
        const userData = await getUser(currentUserUid)
        return userData?.following.indexOf(anotherUserUid) !== -1
    } catch (error) {
        return false
    }
}

export const updateUserFollowers = async ({ currentUserUid, anotherUserUid }: UsersUids) => {
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
                following: currentUserData.following,
            })
            await updateDoc(anotherUserdocRef, {
                followers: anothertUserData.followers,
            })
            return { status: Status.SUCCESS }
        } else {
            throw new Error(Messages.DEFAULT_FAIL)
        }
    } catch (error) {
        return { status: Status.FAIL, message: error as Messages }
    }
}

export const updateUserInfo = async ({ uid, banner, photoURL, ...restData }: UpdateUserInfoParams) => {
    try {
        const userData = await getUser(uid)
        if (userData) {
            const docRef = doc(db, Collections.USERS, uid)
            await updateDoc(docRef, {
                ...userData,
                ...restData,
                banner: banner || userData.banner,
                photoURL: photoURL || userData.photoURL || null,
            })
            return { status: Status.SUCCESS, message: Messages.TWEET_CREATION_SUCCESS }
        } else {
            throw new Error(Messages.TWEET_CREATION_FAIL)
        }
    } catch (error) {
        return { status: Status.FAIL, message: error as Messages }
    }
}

export const isUserNameValid = async (userName: string, uid: string) => {
    try {
        const q = query(collection(db, Collections.USERS), where('userName', '==', userName))
        const querySnapshot = await getDocs(q)
        if (querySnapshot.docs.length) {
            return querySnapshot.docs[0].data().userName === userName && querySnapshot.docs[0].data().uid === uid
        } else return true
    } catch (error) {
        console.log(error)
    }
}

type IsFieldVauleValidParams = {
    value: string
    fieldName: keyof UserInfoDoc
    uid: string
}

export const isFieldVauleValid = async ({ value, fieldName, uid }: IsFieldVauleValidParams) => {
    try {
        const q = query(collection(db, Collections.USERS), where(fieldName, '==', value))
        const querySnapshot = await getDocs(q)
        if (querySnapshot.docs.length) {
            return querySnapshot.docs[0].data()[fieldName] === value && querySnapshot.docs[0].data().uid === uid
        } else return true
    } catch (error) {
        console.log(error)
    }
}
