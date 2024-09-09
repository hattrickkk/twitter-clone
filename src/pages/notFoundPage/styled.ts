import styled from 'styled-components'

import { MEDIA } from '@/constants/media'

export const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const ButtonWrapper = styled.div`
    max-width: ${({ theme }) => theme.width.w300};
`

export const Text = styled.p`
    font-size: ${({ theme }) => theme.fontSize.fs34};
    color: ${({ theme }) => theme.color.darkGray};
    margin-bottom: ${({ theme }) => theme.space.sp40};
    @media ${MEDIA.PHONE} {
        font-size: ${({ theme }) => theme.fontSize.fs24};
    }
`

export const Text404 = styled.p`
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSize.fs200};
    @media ${MEDIA.PHONE} {
        font-size: ${({ theme }) => theme.fontSize.fs84};
        margin-bottom: ${({ theme }) => theme.space.sp10};
    }
`
