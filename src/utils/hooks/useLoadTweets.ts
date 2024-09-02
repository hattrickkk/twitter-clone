import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore'
import { useState, useEffect, useCallback, useRef } from 'react'

import { OBSERVER_OPTIONS } from '@/constants/magicValues'
import { TweetDoc } from '@/customTypes/tweet'

import { concatTweets } from '../concatTweets'
import { getTweets } from '../firebase/tweet'

export const useLoadTweets = () => {
    const [tweets, setTweets] = useState<TweetDoc[]>([])
    const [lastTweet, setLastTweet] = useState<QueryDocumentSnapshot<DocumentData, DocumentData> | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const unsubscribe = loadTweets()
        return () => unsubscribe()
    }, [])

    const loadTweets = useCallback(() => {
        setLoading(true)
        return getTweets(
            lastTweet,
            (tweets: TweetDoc[], last: QueryDocumentSnapshot<DocumentData, DocumentData> | null) => {
                setTweets(prevTweets => {
                    if (!lastTweet) return tweets
                    const uniqTweets = concatTweets(tweets, prevTweets)
                    return uniqTweets
                })
                setLastTweet(last)
                setLoading(false)
            }
        )
    }, [lastTweet])

    const observer = useRef<IntersectionObserver | null>(null)

    const intersectionObserverCallback = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const entry = entries[0]
            if (entry.isIntersecting && lastTweet) loadTweets()
        },
        [lastTweet]
    )

    const lastTweetRef = useCallback(
        (node: HTMLDivElement) => {
            if (loading) return
            if (observer.current) observer.current.disconnect()
            observer.current = new IntersectionObserver(intersectionObserverCallback, OBSERVER_OPTIONS)
            if (node) observer.current.observe(node)
        },
        [loading, lastTweet]
    )

    return { tweets, lastTweetRef, loading }
}
