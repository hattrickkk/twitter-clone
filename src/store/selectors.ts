import { RootState } from '.'

export const selectTheme = (state: RootState) => state.theme.theme
export const selectUser = (state: RootState) => state.user.currentUser
