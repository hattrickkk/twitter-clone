import styled from 'styled-components'

export const Main = styled.main`
    flex: 1 1 auto;
    border-right: 2px solid ${({ theme }) => theme.usersSectionColor};
    border-left: 2px solid ${({ theme }) => theme.usersSectionColor};
    margin: 0 ${({ theme }) => theme.space.sp25};
    min-height: 100vh;
`
export const Wrapper = styled.div`
    width: 100%;
    min-height: 100vh;
`
