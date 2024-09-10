import styled from 'styled-components'

import { MEDIA } from '@/constants/media'

export const SideBarContainer = styled.aside`
    max-width: ${({ theme }) => theme.width.w230};
    width: 100%;
    margin-top: ${({ theme }) => theme.space.sp30};

    #user-name,
    #display-name {
        max-width: ${({ theme }) => theme.space.sp95};
    }

    @media ${MEDIA.EXTRA_LARGE_DESKTOP} {
        max-width: ${({ theme }) => theme.width.w40};
    }

    @media ${MEDIA.LARGE_PHONE} {
        margin: 0;
    }
`
export const Wrapper = styled.div<{ $active: boolean }>`
    @media ${MEDIA.LARGE_PHONE} {
        top: 0;
        transition: ${({ theme }) => theme.transition.standart};
        left: ${({ $active }) => ($active ? '0' : '-100%')};
        position: fixed;
        z-index: 5;
        width: ${({ theme }) => theme.width.w250};
        height: 100vh;
        background-color: ${({ theme }) => theme.backgroundColor};
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: ${({ theme }) => `${theme.space.sp25} 0 ${theme.space.sp25} ${theme.space.sp30}`};
        box-shadow: ${({ theme }) => theme.boxShadowForContextMenu};
    }

    @media ${MEDIA.PHONE} {
        padding-left: ${({ theme }) => theme.space.sp10};
    }
`

export const Nav = styled.nav`
    margin-bottom: ${({ theme }) => theme.space.sp30};
    position: relative;

    @media ${MEDIA.LARGE_PHONE} {
        margin-top: ${({ theme }) => theme.space.sp65};
        overflow-y: scroll;

        &::-webkit-scrollbar {
            width: 0;
        }
    }
`

export const Logo = styled.div`
    max-width: ${({ theme }) => theme.width.w40};
    margin-bottom: ${({ theme }) => theme.space.sp50};
    margin-left: ${({ theme }) => theme.space.sp10};
    z-index: 10;
    position: relative;

    @media ${MEDIA.LARGE_PHONE} {
        margin: 0;
        cursor: pointer;
    }
`
export const ImageLogo = styled.img`
    width: 100%;
`

export const Menu = styled.ul`
    margin-left: ${({ theme }) => theme.space.sp10};
`

export const ItemWrapper = styled.div`
    cursor: pointer;

    @media ${MEDIA.EXTRA_LARGE_DESKTOP} {
        display: none;
    }
`

export const Item = styled.li`
    color: ${({ theme }) => theme.textColor};
    display: flex;

    svg path {
        fill: ${({ theme }) => theme.textColor};
    }

    a {
        font-weight: ${({ theme }) => theme.fontWeight.semiBold};
        font-size: ${({ theme }) => theme.fontSize.fs18};
        display: flex;

        &.active {
            font-family: ${({ theme }) => theme.fontFamily.robotoSerif};
            font-weight: ${({ theme }) => theme.fontWeight.bold};
            font-size: ${({ theme }) => theme.fontSize.fs20};
        }
    }

    &:not(:last-child) {
        margin-bottom: ${({ theme }) => theme.space.sp30};
    }
`

export const Text = styled.span`
    cursor: pointer;
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    font-size: ${({ theme }) => theme.fontSize.fs18};
    margin-left: ${({ theme }) => theme.space.sp20};

    @media ${MEDIA.EXTRA_LARGE_DESKTOP} {
        display: none;
    }
`

export const LinkText = styled.span`
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    font-size: ${({ theme }) => theme.fontSize.fs18};
    margin-left: ${({ theme }) => theme.space.sp20};

    @media ${MEDIA.EXTRA_LARGE_DESKTOP} {
        display: none;
    }

    @media ${MEDIA.LARGE_PHONE} {
        display: block;
    }
`

export const RestLinks = styled.div`
    display: none;
    @media ${MEDIA.EXTRA_LARGE_DESKTOP} {
        display: block;
    }
`

export const ContextMenuWrapper = styled.div<{ $isOpen: boolean }>`
    position: absolute;
    bottom: 0;
    right: 0;
    visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
    opacity: ${({ $isOpen }) => ($isOpen ? '100%' : '0')};
    width: 100%;

    @media ${MEDIA.EXTRA_LARGE_DESKTOP} {
        display: none;
    }
`

export const ProfileInfo = styled.div`
    margin-top: ${({ theme }) => theme.space.sp50};

    button {
        padding: ${({ theme }) => theme.space.sp10};
        background-color: ${({ theme }) => theme.color.buttonDarkGray};
    }

    & > *:not(:last-child) {
        margin-bottom: ${({ theme }) => theme.space.sp25};
    }

    @media ${MEDIA.EXTRA_LARGE_DESKTOP} {
        display: none;
    }
`

export const CreateTweetButtonWrapper = styled.div`
    & > *:nth-child(2),
    & > *:nth-child(3) {
        padding: 0;
        border-radius: 100%;
        width: ${({ theme }) => theme.width.w32};
        height: ${({ theme }) => theme.width.w32};
        background-color: ${({ theme }) => theme.color.blue};
        margin-left: ${({ theme }) => theme.space.sp5};
        display: none;
        border: none;
        svg path {
            fill: ${({ theme }) => theme.color.white};
        }
    }

    & > *:nth-child(3) {
        margin-top: ${({ theme }) => theme.space.sp15};
        background-color: ${({ theme }) => theme.color.buttonDarkGray};
    }

    @media ${MEDIA.EXTRA_LARGE_DESKTOP} {
        & > *:first-child {
            display: none;
        }

        & > *:nth-child(2),
        & > *:nth-child(3) {
            display: block;
        }
    }
`
