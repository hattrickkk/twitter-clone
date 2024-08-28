import styled from 'styled-components'

export const StyledHeader = styled.header`
    padding: ${({ theme }) => `${theme.space.sp25} ${theme.space.sp35}`};
    border-bottom: 2px solid ${({ theme }) => theme.usersSectionColor};
    svg path {
        fill: ${({ theme }) => theme.textColor};
    }
`
export const Title = styled.h4`
    font-family: ${({ theme }) => theme.fontFamily.robotoSerif};
    font-size: ${({ theme }) => theme.fontSize.fs24};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
`
