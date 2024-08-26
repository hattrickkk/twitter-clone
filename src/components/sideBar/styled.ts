import styled from 'styled-components'

export const SideBarContainer = styled.aside`
    max-width: ${({ theme }) => theme.width.w370};
    width: 100%;
    margin-top: ${({ theme }) => theme.space.sp30};
`

export const FooterLinks = styled.footer`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.space.sp15};
    margin-top: ${({ theme }) => theme.space.sp65};
    justify-content: space-between;

    & > a {
        font-size: ${({ theme }) => theme.fontSize.fs16};
        display: inline-block;
        color: ${({ theme }) => theme.color.blueGray};

        &:hover {
            text-decoration: underline;
        }
    }
`
export const Text = styled.span`
    font-size: ${({ theme }) => theme.fontSize.fs16};
    color: ${({ theme }) => theme.color.blueGray};
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`

export const ContextMenuWrapper = styled.div<{ $isOpen: boolean }>`
    position: absolute;
    top: ${({ theme }) => theme.space.sp65};
    left: ${({ theme }) => theme.space.sp95};
    visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
    opacity: ${({ $isOpen }) => ($isOpen ? '100%' : '0')};
`

export const Copyright = styled.span`
    font-size: ${({ theme }) => theme.fontSize.fs16};
    color: ${({ theme }) => theme.copyrightColor};
    text-shadow: ${({ theme }) => theme.textShadow};
`

export const SearchInput = styled.input`
    font-size: ${({ theme }) => theme.fontSize.fs16};
    color: ${({ theme }) => theme.copyrightColor};
    text-shadow: ${({ theme }) => theme.textShadow};
`
