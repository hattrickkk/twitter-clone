import styled from 'styled-components'

import { MEDIA } from '@/constants/media'

export const LogIn = styled.main`
    max-width: ${({ theme }) => theme.width.w450};
    padding: ${({ theme }) => `${theme.space.sp100} 0`};
    margin: 0 auto;

    a {
        display: block;
        margin-top: ${({ theme }) => theme.space.sp40};
        text-align: right;
        color: ${({ theme }) => theme.color.blue};
        font-size: ${({ theme }) => theme.fontSize.fs18};
    }

    @media ${MEDIA.TABLET} {
        padding: ${({ theme }) => `${theme.space.sp70} 0`};
    }
`

export const Logo = styled.div`
    margin-bottom: ${({ theme }) => theme.space.sp40};
`
export const LogoImg = styled.img`
    display: block;
    margin: 0 auto;
`
export const Title = styled.h2`
    margin-bottom: ${({ theme }) => theme.space.sp35};
    font-size: ${({ theme }) => theme.fontSize.fs42};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-family: ${({ theme }) => theme.fontFamily.robotoSerif};
    margin-bottom: ${({ theme }) => theme.space.sp35};

    @media ${MEDIA.PHONE} {
        text-align: center;
        font-size: ${({ theme }) => theme.fontSize.fs34};
    }
`
export const InputsWrapper = styled.div`
    & > * {
        margin-bottom: ${({ theme }) => theme.space.sp30};
    }
`
