import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Header } from '@/components/header'
import { Tweet } from '@/components/tweet'
import { WhatsHappening } from '@/components/whatsHappening'
import type { TweetDoc } from '@/customTypes/tweet'
import { selectTweets } from '@/store/selectors'
import { getAllTweets } from '@/utils/firebase/tweet'

const Home = () => {
    const [tweets, setTweets] = useState<TweetDoc[]>([])
    const tweetsUpdating = useSelector(selectTweets).updates

    useEffect(() => {
        getAllTweets().then(tweets => {
            setTweets(tweets)
        })
    }, [tweetsUpdating])

    return (
        <div>
            <Header />
            <WhatsHappening />
            <>
                {tweets.map(tweet => (
                    <Tweet key={tweet.tweetId} tweet={tweet} />
                ))}
            </>
        </div>
    )
}

export default Home
