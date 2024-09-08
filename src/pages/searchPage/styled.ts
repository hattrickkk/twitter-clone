import styled from 'styled-components'

import { MEDIA } from '@/constants/media'

export const Wrapper = styled.div`
    #user-name,
    #display-name {
        width: 100%;
    }
`
export const SearchWrapper = styled.div`
    display: none;
    padding: ${({ theme }) => theme.space.sp25};

    @media ${MEDIA.EXTRA_LARGE_DESKTOP} {
        display: block;
    }
`
