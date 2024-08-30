import { createSlice } from '@reduxjs/toolkit'

type TweetsUpdateState = {
    updates: boolean
}

const initialState: TweetsUpdateState = { updates: false }

const tweetsSlice = createSlice({
    name: 'updateTweets',
    initialState,
    reducers: {
        updateTweets(state: TweetsUpdateState) {
            state.updates = !state.updates
        },
    },
})

export const { updateTweets } = tweetsSlice.actions
export default tweetsSlice.reducer
