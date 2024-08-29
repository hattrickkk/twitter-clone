export type Tweet = {
    userId: string
    text: string
    images: string[]
}
export type TweetDoc = Tweet & {
    created: string
    likes: number
    retweets?: number
    tweetId: string
}
