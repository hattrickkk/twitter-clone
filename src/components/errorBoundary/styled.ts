import styled from 'styled-components'

import { MEDIA } from '@/constants/media'

export const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    a {
        background-color: ${({ theme }) => theme.color.blue};
        font-family: ${({ theme }) => theme.fontFamily.robotoSerif};
        color: ${({ theme }) => theme.color.white};
        font-size: ${({ theme }) => theme.fontSize.fs24};
        font-weight: ${({ theme }) => theme.fontWeight.bold};
        padding: ${({ theme }) => `${theme.space.sp30} ${theme.space.sp50}`};
        border-radius: ${({ theme }) => theme.borderRadius.br42};
        max-width: ${({ theme }) => theme.width.w370};

        &:hover {
            background-color: ${({ theme }) => theme.color.darkBlue};
            border: none;
        }
    }

    @media ${MEDIA.PHONE} {
        a {
            font-size: ${({ theme }) => theme.fontSize.fs20};
            padding: ${({ theme }) => `${theme.space.sp20} ${theme.space.sp30}`};
        }
    }
`

export const Text = styled.p`
    font-size: ${({ theme }) => theme.fontSize.fs34};
    color: ${({ theme }) => theme.color.darkGray};
    margin-bottom: ${({ theme }) => theme.space.sp40};

    @media ${MEDIA.PHONE} {
        font-size: ${({ theme }) => theme.fontSize.fs24};
    }
`
