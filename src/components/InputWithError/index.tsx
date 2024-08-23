import { ControllerRenderProps, FieldError, FieldValues, Path } from 'react-hook-form'

import { ErrorMessage } from '@/styles/common'
import { Input } from '@/ui/input'

type Props<T extends FieldValues> = {
    controllerProps: ControllerRenderProps<T, Path<T>>
    placeholder: string
    error: FieldError | undefined
}

export const InputWithError = <T extends FieldValues>({ controllerProps, error, placeholder }: Props<T>) => {
    return (
        <>
            <Input {...controllerProps} placeholder={placeholder} />
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
        </>
    )
}
