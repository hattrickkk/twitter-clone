import styled from 'styled-components'

import { MEDIA } from '@/constants/media'

export const Wrapper = styled.div`
    & > input {
        margin-top: ${({ theme }) => theme.space.sp25};
    }
`
export const InputWrapper = styled.div`
    position: relative;
`
export const Icon = styled.div`
    width: ${({ theme }) => theme.width.w32};
    position: absolute;
    cursor: pointer;
    right: ${({ theme }) => theme.space.sp20};
    top: ${({ theme }) => theme.space.sp20};

    @media ${MEDIA.TABLET} {
        right: ${({ theme }) => theme.space.sp15};
        top: ${({ theme }) => theme.space.sp15};
    }
`
