import { Header } from '@/components/header'
import { Tweet } from '@/components/tweet'
import { WhatsHappening } from '@/components/whatsHappening'
import { Spinner } from '@/ui/spinner'
import { useLoadTweets } from '@/utils/hooks/useLoadTweets'

const Home = () => {
    const { tweets, loading, lastTweetRef } = useLoadTweets()
    return (
        <div>
            <Header />
            <WhatsHappening />
            <>
                {tweets.map((tweet, i) => (
                    <Tweet key={tweet.tweetId} tweet={tweet} ref={i === tweets.length - 1 ? lastTweetRef : null} />
                ))}
            </>
            {loading && <Spinner />}
        </div>
    )
}

export default Home
