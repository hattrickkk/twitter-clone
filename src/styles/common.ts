import styled from 'styled-components'

export const Container = styled.div`
    max-width: ${({ theme }) => theme.containerWidth};
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.space.sp15};
`
export const ErrorMessage = styled.p`
    color: ${({ theme }) => theme.color.red};
    padding-top: ${({ theme }) => theme.space.sp10};
`
export const Form = styled.form``

export const FileInput = styled.input`
    display: none;
`
