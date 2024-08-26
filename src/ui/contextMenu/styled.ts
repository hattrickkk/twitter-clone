import styled from 'styled-components'

export const Menu = styled.ul<{ $hasToolbar: boolean }>`
    overflow: hidden;
    border-radius: ${({ theme }) => theme.borderRadius.br10};
    width: 100%;
    background-color: ${({ theme }) => theme.backgroundColor};
    box-shadow: ${({ theme }) => theme.boxShadowForContextMenu};

    ${({ theme, $hasToolbar }) =>
        $hasToolbar &&
        `overflow-y: scroll;
        max-height: ${theme.width.w185};

        &::-webkit-scrollbar {
            width: ${theme.width.w10};
        }

        &::-webkit-scrollbar-track {
            border-radius: ${theme.borderRadius.br10};
        }

        &::-webkit-scrollbar-thumb {
            background: ${theme.scrollBarThemeColor};
            border-radius: ${theme.borderRadius.br10};
        }
    `};
`

export const Item = styled.li`
    transition: ${({ theme }) => theme.transition.standart};

    a {
        color: ${({ theme }) => theme.color.textColor};
        font-size: ${({ theme }) => theme.fontSize.fs18};
        padding: ${({ theme }) => theme.space.sp10};
        display: flex;
        align-items: center;
        width: 100%;
    }

    svg {
        max-width: 15px;

        path {
            fill: ${({ theme }) => theme.textColor};
        }
    }

    &:hover {
        background-color: ${({ theme }) => theme.scrollBarThemeColor};
    }
`

export const Text = styled.span`
    padding-left: ${({ theme }) => theme.space.sp10};
`
