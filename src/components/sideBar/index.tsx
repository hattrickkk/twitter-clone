import { memo, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { REST_FOOTER_LINKS, SOME_FOOTER_LINKS } from '@/constants/footerLinks'
import { COPYRIGHT } from '@/constants/magicValues'
import { RECOMENDATIONS, SEARCH_USERS } from '@/constants/paths'
import { ContextMenu } from '@/ui/contextMenu'
import { useOpenState } from '@/utils/hooks/useOpenState'
import { useOutsideClick } from '@/utils/hooks/useOutsideClick'

import { SideBarContainer, Text } from './styled'
import { FooterLinks, ContextMenuWrapper, Copyright } from './styled'
import { TweetsSearch } from '../tweetsSearch'
import { UsersSearch } from '../usersSearch'
import { UsersSection } from '../usersSection'

export const SideBar = memo(() => {
    const [isContextMenuOpen, closeContextMenu, openContextMenu] = useOpenState()
    const contextMenuRef = useRef<HTMLDivElement>(null)
    useOutsideClick(contextMenuRef, closeContextMenu)
    const currentPath = useLocation().pathname

    return (
        <SideBarContainer>
            {currentPath.includes(RECOMENDATIONS) || currentPath.includes(SEARCH_USERS) ? (
                <UsersSearch currentPath={currentPath} />
            ) : (
                <TweetsSearch currentPath={currentPath} />
            )}

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
