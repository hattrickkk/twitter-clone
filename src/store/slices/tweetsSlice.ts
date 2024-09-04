import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { UsersTweetsTypes } from '@/constants/tweets'
import { TweetDoc } from '@/customTypes/tweet'

type Payload<T> = {
    type: UsersTweetsTypes
    data: T
}

type LikePayload = {
    isLiked: boolean
    tweet: TweetDoc
}

type TweetsState = {
    [UsersTweetsTypes.OWN]: TweetDoc[]
    [UsersTweetsTypes.LIKED]: TweetDoc[]
}

const initialState: TweetsState = { [UsersTweetsTypes.OWN]: [], [UsersTweetsTypes.LIKED]: [] }

const addTweetToState = (state: TweetsState, { type, data }: Payload<TweetDoc>) => {
    state[type] = [data, ...state[type]]
}

const removeTweetFromState = (state: TweetsState, { type, data }: Payload<string>) => {
    state[type] = state[type].filter(tweet => tweet.tweetId !== data)
}

const updateLikesInOwnTweet = (state: TweetsState, payload: TweetDoc) => {
    state[UsersTweetsTypes.OWN] = state[UsersTweetsTypes.OWN].filter(tweet => {
        return tweet.tweetId !== payload.tweetId ? tweet : payload
    })
}

const tweetsSlice = createSlice({
    name: 'tweets',
    initialState,
    reducers: {
        setTweets(state: TweetsState, { payload: { type, data } }: PayloadAction<Payload<TweetDoc[]>>) {
            state[type] = data
        },
        addTweet(state: TweetsState, { payload }: PayloadAction<Payload<TweetDoc>>) {
            addTweetToState(state, payload)
        },
        deleteTweet(state: TweetsState, { payload }: PayloadAction<Payload<string>>) {
            removeTweetFromState(state, payload)
        },
        handleTweetLiking(state: TweetsState, { payload: { tweet, isLiked } }: PayloadAction<LikePayload>) {
            isLiked
                ? removeTweetFromState(state, { data: tweet.tweetId, type: UsersTweetsTypes.LIKED })
                : addTweetToState(state, { data: tweet, type: UsersTweetsTypes.LIKED })
            updateLikesInOwnTweet(state, tweet)
        },
    },
})

export const { setTweets, addTweet, handleTweetLiking, deleteTweet } = tweetsSlice.actions
export default tweetsSlice.reducer
