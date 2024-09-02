import styled from 'styled-components'

export const StyledLike = styled.div<{ $isSubmiting: boolean }>`
    cursor: pointer;
    border-radius: 100%;
    padding: ${({ theme }) => theme.space.sp5};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: ${({ theme }) => theme.transition.standart};

    svg path {
        transition: ${({ theme }) => theme.transition.standart};
    }

    &:hover {
        background-color: ${({ theme }) => theme.borderGray};

        svg path {
            fill: ${({ theme }) => theme.color.red};
        }
    }

    ${({ $isSubmiting }) => $isSubmiting && `pointer-events: none;`};
`
