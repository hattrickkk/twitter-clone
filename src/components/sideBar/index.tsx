import { memo, useRef } from 'react'
import { Link } from 'react-router-dom'

import { REST_FOOTER_LINKS, SOME_FOOTER_LINKS } from '@/constants/footerLinks'
import { COPYRIGHT } from '@/constants/magicValues'
import { ContextMenu } from '@/ui/contextMenu'
import { useOpenState } from '@/utils/hooks/useOpenState'
import { useOutsideClick } from '@/utils/hooks/useOutsideClick'

import { SideBarContainer, Text } from './styled'
import { FooterLinks, ContextMenuWrapper, Copyright } from './styled'
import { Search } from '../search'
import { UsersSection } from '../usersSection'

export const SideBar = memo(() => {
    const [isContextMenuOpen, closeContextMenu, openContextMenu] = useOpenState()
    const contextMenuRef = useRef(null)
    useOutsideClick(contextMenuRef, closeContextMenu)

    return (
        <SideBarContainer>
            <Search />
            <UsersSection />
            <FooterLinks>
                {SOME_FOOTER_LINKS.map(({ path, title }) => (
                    <Link to={`${path}`} key={title}>
                        {title}
                    </Link>
                ))}
                <Text onClick={openContextMenu}>More...</Text>
                <ContextMenuWrapper ref={contextMenuRef} $isOpen={isContextMenuOpen}>
                    <ContextMenu items={REST_FOOTER_LINKS} hasToolBar closeContextMenu={closeContextMenu} />
                </ContextMenuWrapper>
                <Copyright>{COPYRIGHT}</Copyright>
            </FooterLinks>
        </SideBarContainer>
    )
})
