import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RequiredUser } from '@/customTypes/user'

export type StateUser = RequiredUser & { accessToken: string }

type UserState = {
    currentUser: StateUser | null
}

const initialState: UserState = { currentUser: null }

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state: UserState, { payload }: PayloadAction<StateUser | null>) {
            state.currentUser = payload
        },
    },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
