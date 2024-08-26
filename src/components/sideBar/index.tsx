import { memo, useRef } from 'react'
import { Link } from 'react-router-dom'

import { FooterLinks, ContextMenuWrapper, Copyright } from './styled'
import { SideBarContainer, Text } from './styled'
import { UsersSection } from '../usersSection'
import { REST_FOOTER_LINKS, SOME_FOOTER_LINKS } from '@/constants/footerLinks'
import { COPYRIGHT } from '@/constants/magicValues'
import { ContextMenu } from '@/ui/contextMenu'
import { useOpenState } from '@/utils/hooks/useOpenState'
import { useOutsideClick } from '@/utils/hooks/useOutsideClick'

export const SideBar = memo(() => {
    const [isOpen, close, open] = useOpenState()
    const contextMenuRef = useRef(null)
    useOutsideClick(contextMenuRef, close)
    const handleViewMoreClick = () => open()

    return (
        <SideBarContainer>
            <UsersSection />
            <FooterLinks>
                {SOME_FOOTER_LINKS.map(({ path, title }) => (
                    <Link to={path as string} key={title}>
                        {title}
                    </Link>
                ))}
                <Text onClick={handleViewMoreClick}>More...</Text>
                <ContextMenuWrapper ref={contextMenuRef} $isOpen={isOpen}>
                    <ContextMenu items={REST_FOOTER_LINKS} hasToolBar />
                </ContextMenuWrapper>
                <Copyright>{COPYRIGHT}</Copyright>
            </FooterLinks>
        </SideBarContainer>
    )
})
