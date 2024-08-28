import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Status } from '@/constants/responseStatus'

type NotificationState = {
    message: string
    status: Status
    created?: number
}

const initialState: NotificationState = {
    message: '',
    status: Status.SUCCESS,
    created: 0,
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialState,
    reducers: {
        setNotification(state: NotificationState, { payload }: PayloadAction<NotificationState>) {
            state.message = payload.message
            state.status = payload.status
            state.created = Date.now()
        },
    },
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer
