import { memo } from 'react'

import { TweetDoc } from '@/customTypes/tweet'
import { searchTweets } from '@/utils/firebase/search'

import { Search } from '../search'
import { SmallTweet } from '../smallTweet'

type Props = {
    currentPath: string
}

export const TweetsSearch = memo(({ currentPath }: Props) => {
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
