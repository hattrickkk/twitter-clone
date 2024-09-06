import styled from 'styled-components'

export const Wrapper = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.space.sp20};
    padding: ${({ theme }) => `${theme.space.sp20} ${theme.space.sp25} ${theme.space.sp20}`};

    &:not(:last-child) {
        border-bottom: 2px solid ${({ theme }) => theme.usersSectionColor};
    }
`

export const AvatarWrapper = styled.div`
    border-radius: 100%;
    overflow: hidden;
    flex: 0 0 ${({ theme }) => theme.width.w50};
    height: ${({ theme }) => theme.width.w50};
    align-self: flex-start;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        transition: ${({ theme }) => theme.transition.standart};
        background-color: ${({ theme }) => theme.color.blackWithOpacity};
        opacity: 0;
    }

    &:hover {
        cursor: pointer;
        &::before {
            opacity: 1;
        }
    }
`

export const AvatarImage = styled.img`
    width: 100%;
    height: 100%;
`
export const TweetContent = styled.div`
    flex: 1 1 auto;
`
export const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    margin-bottom: ${({ theme }) => theme.space.sp10};
`

export const MainTitle = styled.span`
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSize.fs22};
    font-family: ${({ theme }) => theme.fontFamily.robotoSerif};
    margin-right: ${({ theme }) => theme.space.sp15};
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`
export const SubTitle = styled.span`
    font-size: ${({ theme }) => theme.fontSize.fs18};
    opacity: ${({ theme }) => theme.opacity};
    transition: ${({ theme }) => theme.transition.standart};

    &:nth-child(2):hover {
        cursor: pointer;
    }

    &:last-child {
        &::before {
            content: ' · ';
        }
        padding-left: ${({ theme }) => theme.space.sp10};
    }
`

export const IconWrapper = styled.button`
    padding: ${({ theme }) => theme.space.sp10};
    width: ${({ theme }) => theme.width.w32};
    height: ${({ theme }) => theme.width.w32};
    transition: ${({ theme }) => theme.transition.standart};
    display: flex;
    align-items: center;
    border-radius: 100%;
    background-color: transparent;
    position: relative;
    cursor: pointer;

    svg path {
        transition: ${({ theme }) => theme.transition.standart};
        fill: ${({ theme }) => theme.textColor};
    }

    &:hover {
        background-color: ${({ theme }) => theme.borderGray};

        svg path {
            fill: ${({ theme }) => theme.color.blue};
        }
    }
`

export const Text = styled.p`
    font-size: ${({ theme }) => theme.fontSize.fs18};
    max-width: ${({ theme }) => theme.width.w627};
    overflow: hidden;
`

export const Pictures = styled.div<{ $PicturesCount: number }>`
    border-radius: ${({ theme }) => theme.borderRadius.br20};
    overflow: hidden;
    display: flex;
    gap: ${({ theme }) => theme.width.w6};
    flex-wrap: wrap;
    max-width: 100%;
    max-height: ${({ $PicturesCount, theme }) => ($PicturesCount === 1 ? 'auto' : theme.width.w410)};
    margin-top: ${({ theme }) => theme.space.sp15};
`
export const PictureWrapper = styled.div`
    flex: 1 1 45%;
    overflow: hidden;
    position: relative;
`
export const Picture = styled.img<{ $PicturesCount: number }>`
    height: ${({ theme, $PicturesCount }) => ($PicturesCount === 1 ? 'auto' : theme.width.w200)};
    width: 100%;
    object-fit: cover;
    object-position: center;
`

export const Footer = styled.footer`
    padding-top: ${({ theme }) => theme.space.sp20};
`

export const LikesCount = styled.span`
    color: ${({ theme }) => theme.color.blueGray};
`
export const ContextMenuWrapper = styled.div<{ $isOpen: boolean }>`
    position: absolute;
    top: 0;
    right: 0;
    width: ${({ theme }) => theme.width.w130};
    visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
    opacity: ${({ $isOpen }) => ($isOpen ? '100%' : '0')};
    z-index: 10;
`

export const Menu = styled.div`
    overflow: hidden;
    border-radius: ${({ theme }) => theme.borderRadius.br10};
    width: 100%;
    background-color: ${({ theme }) => theme.backgroundColor};
    box-shadow: ${({ theme }) => theme.boxShadowForContextMenu};
`

export const StyledButton = styled.button<{ $isSubmiting?: boolean }>`
    padding: ${({ theme }) => theme.space.sp10};
    transition: ${({ theme }) => theme.transition.standart};
    background-color: ${({ theme }) => theme.backgroundColor};
    width: 100%;
    display: block;
    text-align: left;

    &:hover {
        background-color: ${({ theme }) => theme.scrollBarThemeColor};
    }

    ${({ $isSubmiting }) =>
        $isSubmiting &&
        `cursor: wait;
        &:hover {
            cursor: wait;
        }`};
`
