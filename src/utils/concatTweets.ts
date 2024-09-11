import { uniqBy } from 'lodash'

import { TweetDoc } from '@/customTypes/tweet'

export const concatTweets = (prevTweets: TweetDoc[], newTweets: TweetDoc[]) => {
    const combinedTweets = [...prevTweets, ...newTweets]
    const uniqueTweets: TweetDoc[] = uniqBy(combinedTweets, 'tweetId')
    return uniqueTweets.sort((a, b) => (a.created > b.created ? -1 : 1))
}
