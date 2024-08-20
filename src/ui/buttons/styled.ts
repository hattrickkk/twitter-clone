import styled from 'styled-components'

import { ButtonTypes } from '@/constants/buttonTypes'

export const StyledButton = styled.button<{ maxWidth?: number | undefined; type: ButtonTypes }>`
    padding: ${({ theme }) => `${theme.space.sp10} ${theme.space.sp40}`};
    font-size: ${({ theme }) => theme.space.fs20};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    background-color: ${({ theme }) => theme.backgroundColor};
    ${({ theme }) => `border: ${theme.borderSize.bs1} solid ${theme.borderGray};`}
    border-radius: ${({ theme }) => theme.borderRadius.br42};
    transition: ${({ theme }) => theme.transition.standart};
    margin: 0 auto;
    line-height: ${({ theme }) => theme.lineHeight.lh32};
    width: 100%;
    ${({ maxWidth }) => maxWidth && `max-width: ${maxWidth}px;`}

    &:hover {
        ${({ theme }) => `border: ${theme.borderSize.bs1} solid ${theme.hoverGray};`}
    }

    ${({ type, theme }) =>
        type === ButtonTypes.PRIMARY &&
        `
            background-color: ${theme.color.blue};
            font-family:  ${theme.fontFamily.robotoSerif};
            color:${theme.color.white};
            font-size:${theme.fontSize.fs18};
            font-weight:${theme.fontWeight.bold};
            padding: ${theme.space.sp8} ${theme.space.sp40};
            border: none;

            &:hover {
                background-color: ${theme.color.darkBlue};
                border: none;
            }
    `}

    ${({ type, theme }) =>
        type === ButtonTypes.SECONDARY &&
        `
            background-color: ${theme.secondaryButtonColor};
            font-family:  ${theme.fontFamily.robotoSerif};
            color:${theme.color.white};
            font-size:${theme.fontSize.fs18};
            font-weight:${theme.fontWeight.bold};
            padding: ${theme.space.sp5} ${theme.space.sp10};
            border: none;

            &:hover {
                background-color: ${theme.hoverSecondaryButtonColor};
                border: none;
            }
    `}
`
