import { memo, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { Menu, Nav, Item, Text, ImageLogo, Logo, SideBarContainer, ContextMenuWrapper } from './styled'
import twitterLogo from '@/assets/twitter-logo.svg'
import { NAV_LINKS, REST_NAV_LINKS } from '@/constants/navLinks'
import { PrimaryButton } from '@/ui/buttons'
import { ContextMenu } from '@/ui/contextMenu'
import { useOpenState } from '@/utils/hooks/useOpenState'
import { useOutsideClick } from '@/utils/hooks/useOutsideClick'

export const NavPanel = memo(() => {
    const CurrentPath = useLocation().pathname
    const [isOpen, close, open] = useOpenState()
    const contextMenuRef = useRef(null)
    useOutsideClick(contextMenuRef, close)

    const handleViewMoreClick = () => open()

    return (
        <SideBarContainer>
            <Logo>
                <ImageLogo src={twitterLogo} alt='twitter-logo' />
            </Logo>
            <Nav>
                <Menu>
                    {NAV_LINKS.map(({ title, path, Icon, ActiveIcon }) => (
                        <Item key={title}>
                            {CurrentPath === `/${path}` && ActiveIcon ? <ActiveIcon /> : <Icon />}
                            {title !== 'More' ? (
                                <NavLink to={`/${path}`}>{title}</NavLink>
                            ) : (
                                <Text onClick={handleViewMoreClick}>{title}</Text>
                            )}
                        </Item>
                    ))}
                </Menu>
                <ContextMenuWrapper ref={contextMenuRef} $isOpen={isOpen}>
                    <ContextMenu items={REST_NAV_LINKS} />
                </ContextMenuWrapper>
            </Nav>
            <PrimaryButton>Tweet</PrimaryButton>
        </SideBarContainer>
    )
})
