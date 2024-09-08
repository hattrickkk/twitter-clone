import styled from 'styled-components'

export const Wrapper = styled.div`
    width: 100%;
    padding: ${({ theme }) => theme.space.sp15};
    border-radius: ${({ theme }) => theme.borderRadius.br10};
    cursor: pointer;
    transition: ${({ theme }) => theme.transition.standart};

    &:hover {
        background-color: ${({ theme }) => theme.textSecondary};
    }
`

export const Name = styled.p`
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    font-size: ${({ theme }) => theme.fontSize.fs16};
    margin-bottom: ${({ theme }) => theme.space.sp5};
`

export const Text = styled.p`
    font-size: ${({ theme }) => theme.fontSize.fs16};
    opacity: ${({ theme }) => theme.opacity};
    overflow: hidden;
    max-height: ${({ theme }) => theme.width.w20};
`
