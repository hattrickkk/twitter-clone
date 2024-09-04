import { RootState } from '.'

export const selectTheme = (state: RootState) => state.theme.theme
export const selectUser = (state: RootState) => state.user.currentUser
export const selectNotification = (state: RootState) => state.notification
export const selectOwnTweets = (state: RootState) => state.tweets.tweets
export const selectLikedTweets = (state: RootState) => state.tweets.likedTweets
