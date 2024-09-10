import { ChangeEvent, useCallback, useState } from 'react'
import { ControllerRenderProps, FieldError, FieldValues, Path } from 'react-hook-form'

import { ErrorMessage } from '@/styles/common'
import { CloseEyeIcon } from '@/ui/closeEyeIcon'
import { Input } from '@/ui/input'
import { OpenEyeIcon } from '@/ui/openEyeIcon'

import { Icon, InputWrapper } from './styled'

type Props<T extends FieldValues> = {
    controllerProps: ControllerRenderProps<T, Path<T>>
    handleInputChange?: (e: ChangeEvent<HTMLInputElement>) => void
    placeholder: string
    value?: string
    error?: FieldError
    name?: string
    disable?: boolean
}

export const InputWithError = <T extends FieldValues>({
    controllerProps,
    error,
    placeholder,
    value,
    name = '',
    disable = false,
    handleInputChange,
}: Props<T>) => {
    const [hidePassword, setHidePassword] = useState(true)
    const handleHidePasswordClick = useCallback(() => setHidePassword(prev => !prev), [])

    let inputType: 'text' | 'password' = 'text'
    if (placeholder === 'Password') {
        inputType = hidePassword ? 'password' : 'text'
    }

    return (
        <InputWrapper>
            {placeholder === 'Password' && (
                <Icon onClick={handleHidePasswordClick} data-cy='eye'>
                    {hidePassword ? <OpenEyeIcon /> : <CloseEyeIcon />}
                </Icon>
            )}
            <Input
                {...controllerProps}
                type={inputType}
                name={name}
                disable={disable}
                placeholder={placeholder}
                userValue={value}
                handleInputChange={handleInputChange}
            />
            <ErrorMessage $visibility={!!error}>{error?.message}</ErrorMessage>
        </InputWrapper>
    )
}
