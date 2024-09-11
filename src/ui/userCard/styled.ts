import styled from 'styled-components'

import { MEDIA } from '@/constants/media'

export const Wrapper = styled.div`
    width: 100%;
`

export const ImageWrapper = styled.div`
    border-radius: 100%;
    overflow: hidden;
    flex: 0 0 ${({ theme }) => theme.width.w50};
    position: relative;

    &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        transition: ${({ theme }) => theme.transition.standart};
        background-color: ${({ theme }) => theme.color.blackWithOpacity};
        opacity: 0;
    }

    &:hover {
        cursor: pointer;
        &::before {
            opacity: 1;
        }
    }
`

export const Info = styled.div`
    margin: 0 ${({ theme }) => theme.space.sp15};
    flex: 1 1 auto;
`

export const Name = styled.p`
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    font-size: ${({ theme }) => theme.fontSize.fs18};
    width: ${({ theme }) => theme.width.w150};
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
    max-height: ${({ theme }) => theme.width.w23};

    &:hover {
        text-decoration: underline;
    }
`

export const UserName = styled.p`
    font-size: ${({ theme }) => theme.fontSize.fs18};
    opacity: ${({ theme }) => theme.opacity};
    width: ${({ theme }) => theme.width.w150};
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
`

export const ButtonWrapper = styled.div`
    align-self: center;
    width: ${({ theme }) => theme.width.w150};

    @media ${MEDIA.LARGE_PHONE} {
        display: none;
    }
`
