import styled from 'styled-components'

export const Wrapper = styled.div`
    width: 100%;
`

export const ImageWrapper = styled.div`
    border-radius: 100%;
    overflow: hidden;
    flex: 0 0 ${({ theme }) => theme.width.w50};
`

export const Image = styled.img`
    width: 100%;
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
`

export const UserName = styled.p`
    font-size: ${({ theme }) => theme.fontSize.fs18};
    opacity: ${({ theme }) => theme.opacity};
    width: ${({ theme }) => theme.width.w150};
    text-overflow: ellipsis;
    overflow: hidden;
`

export const ButtonWrapper = styled.div`
    align-self: center;
    width: ${({ theme }) => theme.width.w150};
`
