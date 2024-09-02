import styled from 'styled-components'

export const StyledSection = styled.section`
    background-color: ${({ theme }) => theme.usersSectionColor};
    padding: ${({ theme }) => theme.space.sp15};
    border-radius: ${({ theme }) => theme.borderRadius.br10};
    width: 100%;

    & > *:not(:last-child) {
        margin-bottom: ${({ theme }) => theme.space.sp25};
    }

    a {
        font-size: 18px;
        color: ${({ theme }) => theme.color.blue};
        transition: ${({ theme }) => theme.transition.standart};

        &:hover {
            color: ${({ theme }) => theme.color.darkBlue};
        }
    }
`

export const Title = styled.h5`
    font-family: ${({ theme }) => theme.fontFamily.robotoSerif};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSize.fs24};
`
