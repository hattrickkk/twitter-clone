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

const enum InputTypes {
    TEXT = 'text',
    PASSWORD = 'password',
}

const visibilityMap: Record<InputTypes, InputTypes> = {
    [InputTypes.PASSWORD]: InputTypes.TEXT,
    [InputTypes.TEXT]: InputTypes.PASSWORD,
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
    const [type, setType] = useState<keyof typeof visibilityMap>(InputTypes.PASSWORD)
    const handleHidePasswordClick = useCallback(() => setType(prevType => visibilityMap[prevType]), [])

    return (
        <InputWrapper>
            {placeholder === 'Password' && (
                <Icon onClick={handleHidePasswordClick} data-cy='eye'>
                    {type === InputTypes.PASSWORD ? <OpenEyeIcon /> : <CloseEyeIcon />}
                </Icon>
            )}
            <Input
                {...controllerProps}
                type={placeholder === 'Password' ? type : InputTypes.TEXT}
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
