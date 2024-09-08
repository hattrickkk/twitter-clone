import styled from 'styled-components'

export const StyledSection = styled.section<{ $visibility: boolean }>`
    background-color: ${({ theme }) => theme.usersSectionColor};
    padding: ${({ theme }) => theme.space.sp15};
    border-radius: ${({ theme }) => theme.borderRadius.br10};
    box-shadow: ${({ theme }) => theme.boxShadowForContextMenu};
    width: 100%;
    position: absolute;
    z-index: 10;
    top: ${({ theme }) => theme.space.sp80};
    display: ${({ $visibility }) => ($visibility ? 'block' : 'none')};

    a {
        display: block;
        font-size: ${({ theme }) => theme.fontSize.fs18};
        padding-top: ${({ theme }) => theme.space.sp10};
        color: ${({ theme }) => theme.color.blue};
        transition: ${({ theme }) => theme.transition.standart};

        &:hover {
            color: ${({ theme }) => theme.color.darkBlue};
        }
    }
`

export const Title = styled.h5`
    margin-bottom: ${({ theme }) => theme.space.sp15};
    font-family: ${({ theme }) => theme.fontFamily.robotoSerif};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSize.fs24};
`
