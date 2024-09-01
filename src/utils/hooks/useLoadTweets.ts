import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore'
import { useState, useEffect, useCallback, useRef } from 'react'
import { useSelector } from 'react-redux'

import { OBSERVER_OPTIONS } from '@/constants/magicValues'
import { TweetDoc } from '@/customTypes/tweet'
import { selectTweets } from '@/store/selectors'

import { getTweets } from '../firebase/tweet'

export const useLoadTweets = () => {
    const [tweets, setTweets] = useState<TweetDoc[]>([])
    const [lastTweet, setLastTweet] = useState<QueryDocumentSnapshot<DocumentData, DocumentData> | null>(null)
    const [loading, setLoading] = useState(false)
    const tweetsUpdating = useSelector(selectTweets).updates

    useEffect(() => {
        setLoading(true)
        getTweets(null).then(({ tweets, last }) => {
            setTweets(tweets)
            setLastTweet(last)
            setLoading(false)
        })
    }, [tweetsUpdating])

    const loadTweets = useCallback(() => {
        setLoading(true)
        getTweets(lastTweet).then(({ tweets: newTweets, last }) => {
            setTweets(prevTweets => [...prevTweets, ...newTweets])
            setLastTweet(last)
            setLoading(false)
        })
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
        [loading, lastTweet, tweetsUpdating]
    )

    return { tweets, lastTweetRef, loading }
}
