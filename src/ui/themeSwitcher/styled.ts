import styled from 'styled-components'

export const Label = styled.label`
    position: relative;
    max-width: ${({ theme }) => theme.width.w50};
`

export const Input = styled.input`
    position: absolute;
    width: ${({ theme }) => theme.width.w1};
    height: ${({ theme }) => theme.width.w1};
    visibility: hidden;

    &:checked ~ span {
        background-color: ${({ theme }) => theme.color.darkGray};
        border: 2px solid ${({ theme }) => theme.color.darkGray};
        transform: translateX(${({ theme }) => theme.space.sp20});
    }
`

export const SwitcherBody = styled.div`
    height: ${({ theme }) => theme.width.w25};
    width: ${({ theme }) => theme.width.w45};
    border: 2px solid ${({ theme }) => theme.color.darkGray};
    border-radius: ${({ theme }) => theme.borderRadius.br20};
    transition: ${({ theme }) => theme.transition.standart};
    cursor: pointer;
`

export const SwitcherButton = styled.span`
    border: 2px solid ${({ theme }) => theme.color.darkGray};
    border-radius: ${({ theme }) => theme.borderRadius.br20};
    transition: ${({ theme }) => theme.transition.standart};
    cursor: pointer;
    width: ${({ theme }) => theme.width.w25};
    height: ${({ theme }) => theme.width.w25};
    position: absolute;
    top: 0;
    left: 0;
`
