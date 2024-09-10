import { render, screen } from '@testing-library/react'

import { ThemeSwitcher } from '@/ui/themeSwitcher'

import '@testing-library/jest-dom'
import { AllProviders } from './test-utils'

describe('ThemeSwitcher Component', () => {
    test('renders correctly', () => {
        render(<ThemeSwitcher />, { wrapper: AllProviders })

        const switcher = screen.getByTestId('themeLabel')
        expect(switcher).toBeInTheDocument()
        expect(switcher).not.toBeChecked()
    })
})
