import styled from 'styled-components'

export const Wrapper = styled.div`
    & > input {
        margin-top: ${({ theme }) => theme.space.sp25};
    }
`
export const InputWrapper = styled.div`
    position: relative;
`
export const Icon = styled.div`
    width: ${({ theme }) => theme.width.w32};
    position: absolute;
    cursor: pointer;
    right: ${({ theme }) => theme.space.sp10};
    top: ${({ theme }) => theme.space.sp10};
`
