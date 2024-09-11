import styled from 'styled-components'

export const TweetWrapper = styled.div`
    pointer-events: none;
    border-bottom: 2px solid ${({ theme }) => theme.usersSectionColor};
`

export const Title = styled.h1`
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.fs20};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    margin-top: ${({ theme }) => theme.space.sp80};

    a {
        font-size: ${({ theme }) => theme.fontSize.fs20};
        font-weight: ${({ theme }) => theme.fontWeight.bold};
        color: ${({ theme }) => theme.color.blue};
    }
`
