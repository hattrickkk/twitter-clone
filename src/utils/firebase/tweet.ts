import { doc, setDoc } from 'firebase/firestore'

import { Collections } from '@/constants/fireStoreCollections'
import { db } from '@/firebase'
import { generateHash } from '@/utils/generateHash'

type Tweet = {
    userId: string
    text: string
    images: string[]
}

export const setTweetToFireStore = async (tweet: Tweet) => {
    const created = new Date()
    const tweetId = await generateHash(created.toString())
    const docRef = doc(db, Collections.TWEETS, tweetId)
    await setDoc(docRef, { ...tweet, created, tweetId, likes: 0 })
    return tweetId
}
