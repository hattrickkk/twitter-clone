import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import { darkTheme, ThemeMode } from '@/constants/theme'
import { store } from '@/store'
import { ThemeSwitcher } from '@/ui/themeSwitcher'

import '@testing-library/jest-dom'

describe('ThemeSwitcher Component', () => {
    test('renders correctly', () => {
        render(
            <Provider store={store}>
                <ThemeProvider theme={darkTheme}>
                    <ThemeSwitcher />
                </ThemeProvider>
            </Provider>
        )

        const switcher = screen.getByTestId('themeLabel')
        expect(switcher).toBeInTheDocument()
        expect(switcher).not.toBeChecked()
    })
})
