import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

export const StyledNotification = styled.div`
    background-color: ${({ theme }) => theme.color.disableBlue};
    padding: ${({ theme }) => theme.space.sp15};
    border-radius: ${({ theme }) => theme.borderRadius.br6};
    max-width: ${({ theme }) => theme.width.w400};
    position: fixed;
    z-index: 150;
    top: ${({ theme }) => theme.space.sp20};
    right: 50%;
    transform: translateX(50%);
    opacity: 0;
    visibility: hidden;

    &.visible {
        opacity: 1;
        visibility: visible;
        animation: ${fadeIn} 1.5s ease;
    }

    &.hidden {
        opacity: 0;
        animation: ${fadeOut} 1s ease;
    }
`

export const Message = styled.p`
    color: ${({ theme }) => theme.textColor};
`

export const Icon = styled.p<{ $isFailed: boolean }>`
    color: ${({ theme, $isFailed }) => ($isFailed ? theme.color.red : theme.color.green)};
`
