import styled from 'styled-components'

export const InputWrapper = styled.div`
    position: relative;
    margin-bottom: ${({ theme }) => theme.space.sp30};

    svg {
        position: absolute;
        top: ${({ theme }) => theme.space.sp15};
        right: ${({ theme }) => theme.space.sp20};
    }
`

export const SearchInput = styled.input`
    padding: ${({ theme }) => theme.space.sp15};
    border-radius: ${({ theme }) => theme.borderRadius.br30};
    background-color: ${({ theme }) => theme.usersSectionColor};
    color: ${({ theme }) => theme.textColor};
    width: 100%;
`
