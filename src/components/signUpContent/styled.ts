import styled from 'styled-components'

import { MEDIA } from '@/constants/media'

export const SignUp = styled.main`
    max-width: ${({ theme }) => theme.width.w670};
    padding: ${({ theme }) => `${theme.space.sp100} 0`};
    margin: 0 auto;
    a {
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
    margin-bottom: ${({ theme }) => theme.space.sp40};
    font-size: ${({ theme }) => theme.fontSize.fs30};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-family: ${({ theme }) => theme.fontFamily.robotoSerif};
`

export const InputsWrapper = styled.div`
    & > * {
        margin-bottom: ${({ theme }) => theme.space.sp25};
    }
`
export const Subtitle = styled.h3`
    font-size: ${({ theme }) => theme.fontSize.fs18};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    margin: ${({ theme }) => `${theme.space.sp20} 0 ${theme.space.sp30}`};
    font-family: ${({ theme }) => theme.fontFamily.robotoSerif};
`

export const Text = styled.p`
    font-size: ${({ theme }) => theme.fontSize.fs16};
    line-height: ${({ theme }) => theme.lineHeight.lh24};
    opacity: ${({ theme }) => theme.opacity};
    margin-bottom: ${({ theme }) => theme.space.sp30};
`

export const DropdownsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: ${({ theme }) => theme.space.sp20};
    margin-bottom: ${({ theme }) => theme.space.sp40};

    & > *:nth-child(1) {
        flex: 4 4 auto;
    }
    & > *:nth-child(2),
    & > *:nth-child(3) {
        flex: 1 1 ${({ theme }) => theme.width.w130};
    }

    @media ${MEDIA.PHONE} {
        flex-direction: column;

        & > *:nth-child(2),
        & > *:nth-child(3) {
            flex: 1 1 auto;
        }
    }
`
