import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RequiredUser } from '@/customTypes/user'

type StateUser = RequiredUser & { accessToken: string }

type UserState = {
    currentUser: StateUser | null
}

const initialState: UserState = { currentUser: null }

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state: UserState, action: PayloadAction<StateUser>) {
            state.currentUser = { ...action.payload }
        },
        logOut(state: UserState) {
            state.currentUser = null
        },
    },
})

export const { setUser, logOut } = userSlice.actions
export default userSlice.reducer
