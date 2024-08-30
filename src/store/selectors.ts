import { RootState } from '.'

export const selectTheme = (state: RootState) => state.theme.theme
export const selectUser = (state: RootState) => state.user.currentUser
export const selectNotification = (state: RootState) => state.notification
export const selectTweets = (state: RootState) => state.tweets
