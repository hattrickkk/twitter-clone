import styled from 'styled-components'

import { ButtonTypes } from '@/constants/buttonTypes'
import { MEDIA } from '@/constants/media'

type Props = { $maxWidth?: number | undefined; $category: ButtonTypes; $disable?: boolean; $isProcessing: boolean }

export const StyledButton = styled.button<Props>`
    padding: ${({ theme }) => `${theme.space.sp10} ${theme.space.sp40}`};
    font-size: ${({ theme }) => theme.fontSize.fs20};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    background-color: ${({ theme }) => theme.backgroundColor};
    ${({ theme }) => `border: ${theme.borderSize.bs1} solid ${theme.borderGray};`}
    border-radius: ${({ theme }) => theme.borderRadius.br42};
    transition: ${({ theme }) => theme.transition.standart};
    margin: 0 auto;
    line-height: ${({ theme }) => theme.lineHeight.lh32};
    width: 100%;
    ${({ $maxWidth }) => $maxWidth && `max-width: ${$maxWidth}px;`}

    &:hover {
        ${({ theme }) => `border: ${theme.borderSize.bs1} solid ${theme.hoverGray};`}
    }

    ${({ $category, theme, $disable, $isProcessing }) =>
        $category === ButtonTypes.PRIMARY &&
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

            ${
                $disable &&
                `pointer-events: none;
                background-color: ${theme.color.disableBlue};`
            }


            ${
                $isProcessing &&
                `cursor: wait;
                &:hover {
                    cursor: wait;
                }`
            }
        }
    `}

    ${({ $category, theme }) =>
        $category === ButtonTypes.SECONDARY &&
        `
            background-color: ${theme.secondaryButtonColor};
            font-family:  ${theme.fontFamily.robotoSerif};
            color:${theme.color.white};
            font-size:${theme.fontSize.fs18};
            font-weight:${theme.fontWeight.bold};
            padding: 0 ${theme.space.sp10};
            border: none;

            &:hover {
                background-color: ${theme.hoverSecondaryButtonColor};
                border: none;
            }
    `}

    @media ${MEDIA.PHONE} {
        font-size: ${({ theme }) => theme.fontSize.fs16};
    }
`
