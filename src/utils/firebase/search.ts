import { collection, where, getDocs, query, limit } from 'firebase/firestore'

import { Collections } from '@/constants/fireStoreCollections'
import { TweetDoc } from '@/customTypes/tweet'
import { UserInfoDoc } from '@/customTypes/user'
import { db } from '@/firebase'

import { concatUsers } from '../concatUsers'

export const searchTweets = async (queryString: string) => {
    const searchResult: TweetDoc[] = []
    try {
        if (queryString === '') return []
        const q = query(
            collection(db, Collections.TWEETS),
            where('text_lowercase', '>=', queryString.toLowerCase()),
            where('text_lowercase', '<=', queryString.toLowerCase() + '\uf8ff')
        )
        const querySnapshot = await getDocs(q)
        querySnapshot.docs.forEach(tweet => searchResult.push(tweet.data() as TweetDoc))
        return searchResult
    } catch (error) {
        console.error(error)
    }
}

export const searchUsers = async (queryString: string) => {
    const searchResult: UserInfoDoc[] = []
    try {
        if (queryString === '') return []
        const queryByDisplayName = query(
            collection(db, Collections.USERS),
            where('displayName_lowercase', '>=', queryString.toLowerCase()),
            where('displayName_lowercase', '<=', queryString.toLowerCase() + '\uf8ff')
        )
        const queryByUserName = query(
            collection(db, Collections.USERS),
            where('userName_lowercase', '>=', queryString.toLowerCase()),
            where('userName_lowercase', '<=', queryString.toLowerCase() + '\uf8ff')
        )

        const [displayNameSnapshot, userNameSnapshot] = await Promise.all([
            getDocs(queryByDisplayName),
            getDocs(queryByUserName),
        ])

        displayNameSnapshot.docs.forEach(tweet => searchResult.push(tweet.data() as UserInfoDoc))
        userNameSnapshot.docs.forEach(tweet => searchResult.push(tweet.data() as UserInfoDoc))
        const uniqueUsers = concatUsers(searchResult)
        return uniqueUsers
    } catch (error) {
        console.error(error)
    }
}
