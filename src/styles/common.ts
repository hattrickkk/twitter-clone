import styled from 'styled-components'

export const Container = styled.div`
    max-width: ${({ theme }) => theme.containerWidth};
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.space.sp15};
`
export const ErrorMessage = styled.p<{ $visibility: boolean }>`
    color: ${({ theme }) => theme.color.red};
    padding-top: ${({ theme }) => theme.space.sp5};
    position: absolute;
    opacity: 0;

    ${({ $visibility }) => $visibility && `opacity: 1;`};
`
export const Form = styled.form``

export const FileInput = styled.input`
    display: none;
`
export const Image = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
`
