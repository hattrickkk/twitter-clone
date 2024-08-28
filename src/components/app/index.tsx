import { useSelector } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import { AppRoutes } from '@/components/appRoutes'
import { darkTheme, lightTheme, ThemeMode } from '@/constants/theme'
import { selectTheme } from '@/store/selectors'
import { GlobalStyles } from '@/styles/global'
import { NullStyles } from '@/styles/nullStyles'
import { Notification } from '@/ui/notification'

export const App = () => {
    const theme = useSelector(selectTheme)

    return (
        <ThemeProvider theme={theme === ThemeMode.dark ? darkTheme : lightTheme}>
            <NullStyles />
            <GlobalStyles />
            <AppRoutes />
            <Notification />
        </ThemeProvider>
    )
}
