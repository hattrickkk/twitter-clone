import styled from 'styled-components'

import { MEDIA } from '@/constants/media'

export const Main = styled.main`
    flex: 1 1 auto;
    border-right: 2px solid ${({ theme }) => theme.usersSectionColor};
    border-left: 2px solid ${({ theme }) => theme.usersSectionColor};
    margin: 0 ${({ theme }) => theme.space.sp25};
    min-height: 100vh;

    @media ${MEDIA.EXTRA_LARGE_DESKTOP} {
        margin-right: 0;
        border-right: none;
    }

    @media ${MEDIA.LARGE_PHONE} {
        margin-left: 0;
        border-left: none;
    }
`
export const Wrapper = styled.div`
    width: 100%;
    min-height: 100vh;
`
export const NavWrapper = styled.div`
    @media ${MEDIA.LARGE_PHONE} {
        display: none;
    }
`
