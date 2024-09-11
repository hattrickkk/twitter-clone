import { memo, ReactNode } from 'react'

import { ButtonTypes } from '@/constants/buttonTypes'
import { withButtonType } from '@/utils/hocs/withButtonType'

import { StyledButton } from './styled'

type Props = {
    children: ReactNode
    onClick?: VoidFunction
    maxWidth?: number
    category?: ButtonTypes
    type?: 'button' | 'submit'
    disable?: boolean
    isProcessing?: boolean
}

export const Button = memo(
    ({
        children,
        onClick,
        maxWidth,
        category = ButtonTypes.DEFAULT,
        type = 'button',
        disable = false,
        isProcessing = false,
    }: Props) => {
        return (
            <StyledButton
                $maxWidth={maxWidth}
                $category={category}
                onClick={onClick}
                type={type}
                $disable={disable}
                $isProcessing={isProcessing}
            >
                {children}
            </StyledButton>
        )
    }
)
export const PrimaryButton = memo(withButtonType(Button, ButtonTypes.PRIMARY))

export const SecondaryButton = memo(withButtonType(Button, ButtonTypes.SECONDARY))
