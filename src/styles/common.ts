import styled from 'styled-components'

export const Container = styled.div`
    max-width: ${({ theme }) => theme.containerWidth};
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.space.sp15};
`
