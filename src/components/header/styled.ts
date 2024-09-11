import styled from 'styled-components'

import { MEDIA } from '@/constants/media'

export const StyledHeader = styled.header`
    padding: ${({ theme }) => `${theme.space.sp25} ${theme.space.sp35}`};
    border-bottom: 2px solid ${({ theme }) => theme.usersSectionColor};

    svg path {
        fill: ${({ theme }) => theme.textColor};
    }

    a {
        flex: 1 1 auto;
    }

    @media ${MEDIA.PHONE} {
        padding: ${({ theme }) => theme.space.sp15} 0;
    }
`
export const Title = styled.h4`
    font-family: ${({ theme }) => theme.fontFamily.robotoSerif};
    font-size: ${({ theme }) => theme.fontSize.fs24};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    margin-left: ${({ theme }) => theme.space.sp20};
`

export const NavWrapper = styled.div`
    display: none;

    @media ${MEDIA.LARGE_PHONE} {
        display: flex;
    }
`
