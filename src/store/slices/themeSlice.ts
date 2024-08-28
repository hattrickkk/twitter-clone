import { createSlice } from '@reduxjs/toolkit'

import { ThemeMode } from '@/constants/theme'

type ThemeState = {
    theme: ThemeMode
}

const initialState: ThemeState = {
    theme: ThemeMode.dark,
}

const themeSlice = createSlice({
    name: 'theme',
    initialState: initialState,
    reducers: {
        setLightTheme(state: ThemeState) {
            state.theme = ThemeMode.light
        },
        setDarkTheme(state: ThemeState) {
            state.theme = ThemeMode.dark
        },
    },
})

export const { setLightTheme, setDarkTheme } = themeSlice.actions
export default themeSlice.reducer
