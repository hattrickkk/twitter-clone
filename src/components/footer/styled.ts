import styled from 'styled-components'

import { MEDIA } from '@/constants/media'

export const StyledFooter = styled.footer`
    padding: ${({ theme }) => theme.space.sp18};

    a {
        &:hover {
            color: ${({ theme }) => theme.color.blue};
        }

        transition: ${({ theme }) => theme.transition.standart};
        cursor: pointer;
        font-size: ${({ theme }) => theme.fontSize.fs11};
        margin-right: ${({ theme }) => theme.space.sp10};
        padding: ${({ theme }) => theme.space.sp10} 0;
    }

    @media ${MEDIA.NORMAL_DESKTOP} {
        a {
            font-size: ${({ theme }) => theme.fontSize.fs13};
        }
    }
`
export const Text = styled.span`
    font-size: ${({ theme }) => theme.fontSize.fs11};
    padding: ${({ theme }) => theme.space.sp10} 0;
    @media ${MEDIA.NORMAL_DESKTOP} {
        font-size: ${({ theme }) => theme.fontSize.fs13};
    }
`
