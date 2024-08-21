import { ReactNode } from 'react'

import { StyledButton } from './styled'
import { ButtonTypes } from '@/constants/buttonTypes'
import { withButtonType } from '@/utils/withButtonType'

type Props = {
    children: ReactNode
    onClick?: VoidFunction
    maxWidth?: number
    type?: ButtonTypes
}

export const Button = ({ children, onClick, maxWidth, type = ButtonTypes.DEFAULT }: Props) => {
    return (
        <StyledButton maxWidth={maxWidth} type={type} onClick={onClick}>
            {children}
        </StyledButton>
    )
}

export const PrimaryButton = withButtonType(Button, ButtonTypes.PRIMARY)

export const SecondaryButton = withButtonType(Button, ButtonTypes.SECONDARY)
