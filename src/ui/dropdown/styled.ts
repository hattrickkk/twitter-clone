import styled from 'styled-components'

import { MEDIA } from '@/constants/media'

export const StyledDropdown = styled.div`
    position: relative;
`

export const Field = styled.div<{ $isOpen: boolean }>`
    background-color: ${({ theme }) => theme.inputColor};\
    text-align: left;
    padding: ${({ theme }) => `${theme.space.sp25} ${theme.space.sp70} ${theme.space.sp25} ${theme.space.sp25}`};
    color: ${({ theme }) => theme.color.blackText};
    font-size: ${({ theme }) => theme.fontSize.fs18};
    border: ${({ theme }) => `${theme.borderSize.bs1} solid ${theme.color.gray}`};
    border-radius: ${({ theme }) => theme.borderRadius.br6};
    width: 100%;
    cursor: pointer;
    position: relative;

    &::before,
    &::after {
        content: '';
        width: ${({ theme }) => theme.width.w15};
        height: ${({ theme }) => theme.width.w3};
        border-radius: ${({ theme }) => theme.borderRadius.br2};
        position: absolute;
        right: ${({ theme }) => theme.space.sp30};
        top: 50%;
        background-color: ${({ theme }) => theme.dropdownIconColor};
        transition: ${({ theme }) => theme.transition.standart};
    }

    &::before {
        transform: translateX(-8.5px) rotate(45deg);
    }

    &::after {
        transform: rotate(-45deg);
    }

    ${({ $isOpen }) =>
        $isOpen &&
        `&::before {
            transform: translateX(-8.5px) rotate(-45deg);
        }

        &::after {
            transform: rotate(45deg);
        }
    `}

    @media ${MEDIA.TABLET} {
        padding: ${({ theme }) => `${theme.space.sp15} ${theme.space.sp70} ${theme.space.sp15} ${theme.space.sp15}`};

        &::before,
        &::after {
            content: '';
            right: ${({ theme }) => theme.space.sp20};
        }
    }
`

export const ContentWrapper = styled.div<{ $isOpen: boolean }>`
    position: absolute;
    bottom: ${({ theme }) => theme.space.sp95};
    width: 100%;
    max-height: 0;
    overflow: hidden;
    transition: ${({ theme }) => theme.transition.standart};

    ${({ $isOpen, theme }) =>
        $isOpen &&
        `max-height: ${theme.width.w200};
    `}

    @media ${MEDIA.TABLET} {
        bottom: ${({ theme }) => theme.space.sp75};
    }

    @media ${MEDIA.PHONE} {
        bottom: ${({ theme }) => theme.space.sp70};
    }
`

export const Content = styled.ul`
    padding: ${({ theme }) => theme.space.sp10};
    background-color: ${({ theme }) => theme.inputColor};
    border: ${({ theme }) => `${theme.borderSize.bs1} solid ${theme.color.gray}`};
    border-radius: ${({ theme }) => theme.borderRadius.br6};

    max-height: ${({ theme }) => theme.width.w200};
    overflow-y: scroll;

    &::-webkit-scrollbar {
        width: ${({ theme }) => theme.width.w10};
    }

    &::-webkit-scrollbar-track {
        border-radius: ${({ theme }) => theme.borderRadius.br10};
    }

    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.color.gray};
        border-radius: ${({ theme }) => theme.borderRadius.br10};
    }
`

export const Item = styled.li`
    padding: ${({ theme }) => theme.space.sp10};
    background-color: ${({ theme }) => theme.inputColor};
    color: ${({ theme }) => theme.color.blackText};
    border-radius: ${({ theme }) => theme.borderRadius.br6};
    cursor: pointer;
    transition: ${({ theme }) => theme.transition.standart};

    &:hover {
        background-color: ${({ theme }) => theme.dropdownItemColor};
    }
`
