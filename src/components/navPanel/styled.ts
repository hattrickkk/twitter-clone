import styled from 'styled-components'

export const SideBarContainer = styled.aside`
    max-width: ${({ theme }) => theme.width.w230};
    width: 100%;
    margin-top: ${({ theme }) => theme.space.sp30};
`

export const Nav = styled.nav`
    margin-bottom: ${({ theme }) => theme.space.sp30};
    position: relative;
`

export const Logo = styled.div`
    max-width: ${({ theme }) => theme.width.w40};
    margin-bottom: ${({ theme }) => theme.space.sp50};
    margin-left: ${({ theme }) => theme.space.sp10};
`
export const ImageLogo = styled.img`
    width: 100%;
`

export const Menu = styled.ul`
    margin-left: ${({ theme }) => theme.space.sp10};
`

export const Item = styled.li`
    color: ${({ theme }) => theme.textColor};
    display: flex;

    svg path {
        fill: ${({ theme }) => theme.textColor};
    }

    a {
        margin-left: ${({ theme }) => theme.space.sp20};
        font-weight: ${({ theme }) => theme.fontWeight.semiBold};
        font-size: ${({ theme }) => theme.fontSize.fs18};

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
`

export const ContextMenuWrapper = styled.div<{ $isOpen: boolean }>`
    position: absolute;
    bottom: 0;
    right: 0;
    visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
    opacity: ${({ $isOpen }) => ($isOpen ? '100%' : '0')};
    width: 100%;
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
`
