import styled from 'styled-components'

import { MEDIA } from '@/constants/media'

export const LandingContainer = styled.main`
    max-width: ${({ theme }) => theme.containerWidth};
    margin: 0 auto;
    flex: 1 1 auto;
`

export const ImageWrapper = styled.div`
    flex: 1 1 auto;

    @media ${MEDIA.TABLET} {
        display: none;
    }
`

export const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
`

export const GoogleImg = styled.img`
    width: ${({ theme }) => theme.width.w32};
    margin-right: ${({ theme }) => theme.space.sp5};
`

export const Info = styled.div`
    flex: 0 1 ${({ theme }) => theme.width.w1000};
    padding: ${({ theme }) => theme.space.sp20};
    align-self: center;

    @media ${MEDIA.TABLET} {
        margin: ${({ theme }) => `${theme.space.sp100} 0 ${theme.space.sp20}`};
    }

    @media ${MEDIA.PHONE} {
        margin-top: ${({ theme }) => theme.space.sp45}};
    }
`

export const Logo = styled.div`
    margin-bottom: ${({ theme }) => theme.space.sp55};

    @media ${MEDIA.LARGE_DESKTOP} {
        margin-bottom: ${({ theme }) => theme.space.sp40};
    }
`

export const LogoImg = styled.img`
    @media ${MEDIA.TABLET} {
        display: block;
        margin: 0 auto;
    }
`

export const Wrapper = styled.div`
    max-width: ${({ theme }) => theme.width.w400};
    @media ${MEDIA.TABLET} {
        max-width: none;
    }
`

export const Title = styled.h1`
    font-weight: ${({ theme }) => theme.fontWeight.heavy};
    font-size: ${({ theme }) => theme.fontSize.fs84};
    margin-bottom: ${({ theme }) => theme.space.sp45};

    @media ${MEDIA.LARGE_DESKTOP} {
        font-size: ${({ theme }) => theme.fontSize.fs56};
        margin-bottom: ${({ theme }) => theme.space.sp20};
    }

    @media ${MEDIA.TABLET} {
        text-align: center;
    }
`

export const SubTitle = styled.h2`
    font-weight: ${({ theme }) => theme.fontWeight.heavy};
    font-size: ${({ theme }) => theme.fontSize.fs42};
    margin-bottom: ${({ theme }) => theme.space.sp30};

    @media ${MEDIA.LARGE_DESKTOP} {
        font-size: ${({ theme }) => theme.fontSize.fs34};
        margin-bottom: ${({ theme }) => theme.space.sp20};
    }

    @media ${MEDIA.TABLET} {
        margin-bottom: ${({ theme }) => theme.space.sp30};
        text-align: center;
    }
`
export const Text = styled.p`
    &:last-child,
    &:last-child a {
        font-size: ${({ theme }) => theme.fontSize.fs16};
    }

    &:not(:last-child) {
        margin: ${({ theme }) => `${theme.space.sp30} 0 ${theme.space.sp30}`};
    }

    a {
        color: ${({ theme }) => theme.color.blue};
    }

    line-height: ${({ theme }) => theme.lineHeight.lh20};

    @media ${MEDIA.TABLET} {
        text-align: center;
    }
`
