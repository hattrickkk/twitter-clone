import styled from 'styled-components'

export const Wrapper = styled.div`
    & > input {
        margin-top: ${({ theme }) => theme.space.sp25};
    }
`
