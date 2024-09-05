export type Tweet = {
    userId: string
    text: string
    images: string[]
}
export type TweetDoc = Tweet & {
    created: string
    likes: string[]
    tweetId: string
}

export type ImageState = {
    path: string
    file: File
}
