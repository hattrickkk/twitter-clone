import styled, { keyframes } from 'styled-components'

const spinnerAnimation = keyframes`
    0% {
        transform: scale(1) rotate(0);
    }
    50%{
        transform: scale(1.3) rotate(180deg);
    }
    100%{
        transform: scale(1) rotate(360deg);
    }
`

export const StyledSpinnerWrapper = styled.div`
    padding: ${({ theme }) => theme.space.sp65};
`
export const StyledSpinner = styled.div`
    height: ${({ theme }) => theme.width.w130};
    width: ${({ theme }) => theme.width.w130};
    border: 2px solid ${({ theme }) => theme.color.blue};
    border-radius: 50%;
    border-left-color: transparent;
    animation: ${spinnerAnimation} 0.8s linear infinite;
`
