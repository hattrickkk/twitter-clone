import { useEffect, useState } from 'react'

import { Header } from '@/components/header'
import { Tweet } from '@/components/tweet'
import { WhatsHappening } from '@/components/whatsHappening'
import type { TweetDoc } from '@/customTypes/tweet'
import { getAllTweets } from '@/utils/firebase/tweet'

const Home = () => {
    const [tweets, setTweets] = useState<TweetDoc[]>([])
    useEffect(() => {
        getAllTweets().then(res => setTweets(res))
    }, [])

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
