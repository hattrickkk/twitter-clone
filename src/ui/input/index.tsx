import { forwardRef, memo } from 'react'
import { ControllerRenderProps } from 'react-hook-form'

import { StyledInput } from './styled'

type Props = {
    placeholder: string
}

export const Input = memo(
    forwardRef<HTMLInputElement, ControllerRenderProps & Props>(({ value, onChange, ...props }, ref) => {
        return <StyledInput placeholder={props.placeholder} onChange={onChange} value={value} ref={ref} />
    })
)
