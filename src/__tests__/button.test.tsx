import { render, screen } from '@testing-library/react'

import { Button } from '@/ui/buttons'

import '@testing-library/jest-dom'
import { AllProviders } from './test-utils'

describe('Button', () => {
    test('button component renders correctly', () => {
        render(<Button>Value</Button>, { wrapper: AllProviders })
        expect(screen.getByText('Value')).toBeInTheDocument()
    })
})
