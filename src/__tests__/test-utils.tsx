import { FC, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import { darkTheme } from '@/constants/theme'
import { store } from '@/store'

type Props = {
    children: ReactNode
}
export const AllProviders: FC<Props> = ({ children }) => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
        </Provider>
    )
}
