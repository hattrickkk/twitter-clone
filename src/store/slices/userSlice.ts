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
        setUser(state: UserState, { payload }: PayloadAction<StateUser | null>) {
            state.currentUser = payload ? { ...payload } : payload
        },
    },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
