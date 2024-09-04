import styled from 'styled-components'

export const UsersWrapper = styled.div`
    & > * {
        padding: ${({ theme }) => theme.space.sp20};

        button {
            background-color: ${({ theme }) => theme.color.buttonDarkGray};
            padding: ${({ theme }) => theme.space.sp10};
        }
    }
`
