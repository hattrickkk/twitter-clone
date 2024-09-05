import { ChangeEvent, forwardRef, memo, useCallback } from 'react'
import { ControllerRenderProps } from 'react-hook-form'

import { StyledInput } from './styled'

type Props = {
    placeholder: string
    type: 'text' | 'password'
    userValue?: string
    name: string
    disable: boolean
    handleInputChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input = memo(
    forwardRef<HTMLInputElement, ControllerRenderProps & Props>(
        ({ value, onChange, placeholder, type, userValue, name, disable, handleInputChange }, ref) => {
            const handleCombinedChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
                handleInputChange && handleInputChange(e)
                onChange(e)
            }, [])

            return (
                <StyledInput
                    $disable={disable}
                    placeholder={placeholder}
                    type={type}
                    onChange={handleCombinedChange}
                    value={userValue ?? value}
                    name={name}
                    ref={ref}
                />
            )
        }
    )
)
