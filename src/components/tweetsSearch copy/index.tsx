import { memo } from 'react'
import { useLocation } from 'react-router-dom'

import { TweetDoc } from '@/customTypes/tweet'
import { searchTweets } from '@/utils/firebase/search'

import { Search } from '../search'
import { SmallTweet } from '../smallTweet'

export const TweetsSearch = memo(() => {
    const currentPath = useLocation().pathname
    return (
        <Search
            placeholder={'Tweets search'}
            currentPath={currentPath}
            searchFunction={searchTweets}
            renderResults={tweets => (
                <>
                    {(tweets as TweetDoc[]).map(({ tweetId, userId, text }) => (
                        <SmallTweet userId={userId} text={text} tweetId={tweetId} key={tweetId} />
                    ))}
                </>
            )}
        />
    )
})
