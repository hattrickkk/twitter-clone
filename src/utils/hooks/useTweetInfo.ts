import { useState, useEffect } from 'react'

import { INIT_USER_INFO } from '@/constants/initValues'
import type { UserInfo } from '@/customTypes/user'

import { getPictureURL } from '../firebase/pictures'
import { getUser } from '../firebase/user'

export const useTweetInfo = (userId: string, images: string[]) => {
    const [userInfo, setUserInfo] = useState<UserInfo>(INIT_USER_INFO)
    const [tweetPictures, setTweetPictures] = useState<string[]>([])

    useEffect(() => {
        getUser(userId).then(res => {
            if (res) {
                const { displayName, uid, photoURL } = res
                setUserInfo({
                    displayName,
                    userName: uid,
                    photoURL,
                })
            }
        })
    }, [])

    useEffect(() => {
        const promises = images.map(async path => await getPictureURL(path))
        Promise.all(promises).then(res => setTweetPictures(res as string[]))
    }, [])

    return { userInfo, tweetPictures }
}
