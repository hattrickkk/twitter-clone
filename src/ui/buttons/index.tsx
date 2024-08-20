import { ReactNode } from 'react'

import { StyledButton } from './styled'
import { ButtonTypes } from '@/constants/buttonTypes'
import { withButtonType } from '@/utils/withButtonType'

type Props = {
    children: ReactNode
    maxWidth?: number
    type?: ButtonTypes
}

export const Button = ({ children, maxWidth, type = ButtonTypes.DEFAULT }: Props) => {
    return (
        <StyledButton maxWidth={maxWidth} type={type}>
            {children}
        </StyledButton>
    )
}

export const PrimaryButton = withButtonType(Button, ButtonTypes.PRIMARY)

export const SecondaryButton = withButtonType(Button, ButtonTypes.SECONDARY)
