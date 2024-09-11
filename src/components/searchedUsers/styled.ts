import styled from 'styled-components'

export const Wrapper = styled.section`
    padding: ${({ theme }) => theme.space.sp15};
    & > div:not(:last-child) {
        margin-bottom: ${({ theme }) => theme.space.sp30};
    }
`
