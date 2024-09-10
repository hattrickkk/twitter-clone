import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'

import { darkTheme } from '@/constants/theme'
import { Button } from '@/ui/buttons'

import '@testing-library/jest-dom'

describe('Button', () => {
    test('button component renders correctly', () => {
        render(
            <ThemeProvider theme={darkTheme}>
                <Button>Value</Button>
            </ThemeProvider>
        )

        expect(screen.getByText('Value')).toBeInTheDocument()
    })
})
