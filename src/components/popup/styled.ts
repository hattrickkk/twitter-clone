import styled from 'styled-components'

import { MEDIA } from '@/constants/media'

export const StyledPopup = styled.div<{ $active: boolean; $isExpand: boolean }>`
    overflow: hidden;
    position: fixed;
    pointer-events: none;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: ${({ theme }) => theme.transition.standart};

    ${({ $active, theme }) =>
        $active &&
        `pointer-events: all;
        background-color: ${theme.color.blackWithOpacity};`}

    ${({ $isExpand }) => $isExpand && `transform: scale(1.5);`}

    @media ${MEDIA.LARGE_PHONE} {
        transform: scale(1);
    }
`

export const Wrapper = styled.div<{ $active: boolean }>`
    position: absolute;
    top: -100%;
    transition: ${({ theme }) => theme.transition.smooth};

    ${({ $active }) =>
        $active &&
        ` top: 50%;
        transform: translateY(-50%);`};
`

export const ContentWrapper = styled.div<{ $isExpand: boolean }>`
    padding: ${({ theme }) => theme.space.sp25};
    padding-top: ${({ theme }) => theme.space.sp50};
    border-radius: ${({ theme }) => theme.borderRadius.br10};
    background-color: ${({ theme }) => theme.backgroundColor};
    max-width: ${({ theme, $isExpand }) => ($isExpand ? theme.width.w400 : theme.width.w670)};

    #whats-happening-section {
        border-bottom: none;
        padding: 0;
    }

    #tweet-pictures {
        & > * {
            max-width: ${({ theme }) => theme.width.w300};
            max-height: ${({ theme }) => theme.width.w100};
        }
    }

    @media ${MEDIA.PHONE} {
        padding: ${({ theme }) => theme.space.sp10};
        padding-top: ${({ theme }) => theme.space.sp50};
    }
`

export const CloseButton = styled.button<{ $isExpand: boolean }>`
    cursor: pointer;
    position: absolute;
    display: block;
    border-radius: 100%;
    background-color: transparent;
    transition: ${({ theme }) => theme.transition.standart};
    width: ${({ theme }) => theme.width.w25};
    height: ${({ theme }) => theme.width.w25};
    margin-right: ${({ theme }) => theme.space.sp5};
    top: ${({ theme, $isExpand }) => (!$isExpand ? theme.space.sp30 : theme.space.sp15)};
    right: ${({ theme, $isExpand }) => (!$isExpand ? theme.space.sp30 : theme.space.sp15)};
    ${({ $isExpand }) => !$isExpand && `transform: scale(1.5);`}

    &::before,
    &::after {
        content: '';
        background-color: ${({ theme }) => theme.textColor};
        width: ${({ theme }) => theme.width.w15};
        height: ${({ theme }) => theme.width.w1};
        position: absolute;
        top: 50%;
        border-radius: ${({ theme }) => theme.width.w1d5};
        transition: ${({ theme }) => theme.transition.standart};
    }

    &:hover {
        background-color: ${({ theme }) => theme.textSecondary};
    }

    &::after {
        transform: translateX(-7px) rotate(45deg);
    }

    &::before {
        transform: translateX(-7px) rotate(-45deg);
    
`
