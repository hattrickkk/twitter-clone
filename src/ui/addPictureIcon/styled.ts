import styled from 'styled-components'

export const Wrapper = styled.div<{ $disable: boolean }>`
    border-radius: 100%;
    width: ${({ theme }) => theme.width.w40};
    height: ${({ theme }) => theme.width.w40};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: ${({ theme }) => theme.transition.standart};
    cursor: pointer;

    &:hover {
        background-color: ${({ theme }) => theme.borderGray};
    }

    ${({ $disable, theme }) =>
        $disable &&
        `pointer-events: none;
        svg path{
            fill: ${theme.color.blueGray};
        }
    `}
`

export const FileInput = styled.input`
    display: none;
`
