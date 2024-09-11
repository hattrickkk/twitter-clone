import styled from 'styled-components'

export const UserstweetsSection = styled.section``

export const Tab = styled.button<{ $active: boolean }>`
    width: 100%;
    font-size: ${({ theme }) => theme.fontSize.fs18};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-family: ${({ theme }) => theme.fontFamily.robotoSerif};
    padding: ${({ theme }) => `${theme.space.sp20} 0`};
    background-color: ${({ theme }) => theme.backgroundColor};
    border-bottom: 2px solid ${({ theme }) => theme.usersSectionColor};
    color: ${({ $active, theme }) => ($active ? theme.textColor : theme.textSecondary)};

    &:not(:last-child) {
        border-right: 2px solid ${({ theme }) => theme.usersSectionColor};
    }
`

export const TabContent = styled.div<{ $visibility: boolean }>`
    display: ${({ $visibility }) => ($visibility ? 'block' : 'none')};
`
