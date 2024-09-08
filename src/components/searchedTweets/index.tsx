import { memo } from 'react'

import { TweetDoc } from '@/customTypes/tweet'

import { SmallTweet } from '../smallTweet'
import { Tweet } from '../tweet'

type Props = {
    tweets: TweetDoc[]
}

export const SearchedTweets = memo(({ tweets }: Props) => {
    return (
        <>
            {tweets.map(tweet => (
                <Tweet tweet={tweet} key={tweet.tweetId} />
            ))}
        </>
    )
})
