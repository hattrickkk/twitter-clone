import { useState } from 'react'
import { ThemeProvider } from 'styled-components'

import AppRoutes from '../appRoutes'
import { darkTheme, lightTheme } from '@/constants/theme'
import { GlobalStyles } from '@/styles/global'
import { NullStyles } from '@/styles/nullStyles'

export const App = () => {
    const [isDarkMode, setIsDarkMode] = useState(true)
    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <NullStyles />
            <GlobalStyles />
            <AppRoutes />
        </ThemeProvider>
    )
}
