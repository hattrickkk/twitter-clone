import { memo, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

import twitterLogo from '@/assets/twitter-logo.svg'
import { NAV_LINKS, REST_NAV_LINKS } from '@/constants/navLinks'
import { PROFILE } from '@/constants/paths'
import { selectUser } from '@/store/selectors'
import { setUser } from '@/store/slices/userSlice'
import { Flex } from '@/styles/flexStyles'
import { LockBody } from '@/styles/global'
import { Button, PrimaryButton, SecondaryButton } from '@/ui/buttons'
import { ContextMenu } from '@/ui/contextMenu'
import { CreateTweetIcon } from '@/ui/createTweetIcon'
import { LogOutIcon } from '@/ui/logOutIcon'
import { UserCard } from '@/ui/userCard'
import { useOpenState } from '@/utils/hooks/useOpenState'
import { useOutsideClick } from '@/utils/hooks/useOutsideClick'

import {
    Menu,
    Nav,
    Item,
    Text,
    ImageLogo,
    Logo,
    SideBarContainer,
    ContextMenuWrapper,
    ProfileInfo,
    LinkText,
    ItemWrapper,
    CreateTweetButtonWrapper,
    Wrapper,
    RestLinks,
} from './styled'
import { Popup } from '../popup'
import { WhatsHappening } from '../whatsHappening'

export const NavPanel = memo(() => {
    const currentPath = useLocation().pathname
    const [isContextMenuOpen, closeContextMenu, openContextMenu] = useOpenState()
    const [isPopupOpen, closePopup, openPopup] = useOpenState()
    const [isMenuOpen, closeMenu, openMenu] = useOpenState()

    const currentUser = useSelector(selectUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogOutClick = useCallback(() => {
        dispatch(setUser(null))
        navigate('/', { replace: true })
    }, [])

    const handleToogleMenu = useCallback(() => {
        isMenuOpen ? closeMenu() : openMenu()
    }, [isMenuOpen])

    const contextMenuRef = useRef(null)
    useOutsideClick(contextMenuRef, closeContextMenu)

    const headerMenuRef = useRef(null)
    useOutsideClick(headerMenuRef, closeMenu, 'twitter-logo')

    return (
        <>
            <LockBody $isOverflowHidden={isMenuOpen} />
            <Popup closePopup={closePopup} isPopupOpen={isPopupOpen} isExpand>
                <WhatsHappening closePopup={closePopup} isPopupOpen={isPopupOpen} />
            </Popup>
            <SideBarContainer>
                <Logo onClick={handleToogleMenu}>
                    <ImageLogo src={twitterLogo} alt='twitter-logo' id='twitter-logo' />
                </Logo>
                <Wrapper $active={isMenuOpen} ref={headerMenuRef}>
                    <Nav>
                        <Menu>
                            {NAV_LINKS.map(({ title, path, Icon, ActiveIcon }) => (
                                <Item key={title}>
                                    {title !== 'More' ? (
                                        <NavLink
                                            to={path?.includes(PROFILE) ? `/${path}/${currentUser?.uid}` : `/${path}`}
                                        >
                                            {currentPath.includes(`/${path}`) && ActiveIcon ? <ActiveIcon /> : <Icon />}
                                            <LinkText>{title}</LinkText>
                                        </NavLink>
                                    ) : (
                                        <ItemWrapper onClick={openContextMenu}>
                                            <Icon />
                                            <Text>{title}</Text>
                                        </ItemWrapper>
                                    )}
                                </Item>
                            ))}
                            <RestLinks>
                                {REST_NAV_LINKS.map(({ title, path, Icon }) => (
                                    <Item key={title}>
                                        <NavLink to={`/${path}`}>
                                            <Icon />
                                            <LinkText>{title}</LinkText>
                                        </NavLink>
                                    </Item>
                                ))}
                            </RestLinks>
                        </Menu>
                        <ContextMenuWrapper ref={contextMenuRef} $isOpen={isContextMenuOpen}>
                            <ContextMenu items={REST_NAV_LINKS} closeContextMenu={closeContextMenu} />
                        </ContextMenuWrapper>
                    </Nav>

                    <CreateTweetButtonWrapper>
                        <PrimaryButton onClick={openPopup}>Tweet</PrimaryButton>
                        <Button onClick={openPopup}>
                            <Flex $alignitems='center' $justifycontent='center'>
                                <CreateTweetIcon />
                            </Flex>
                        </Button>
                        <Button onClick={handleLogOutClick}>
                            <Flex $alignitems='center' $justifycontent='center'>
                                <LogOutIcon />
                            </Flex>
                        </Button>
                    </CreateTweetButtonWrapper>

                    <ProfileInfo>
                        {currentUser && (
                            <UserCard
                                uid={currentUser.uid as string}
                                currentUserUid={currentUser.uid as string}
                                displayName={currentUser.displayName as string}
                                photoURL={currentUser.photoURL as string}
                                hasFollowButton={false}
                                userName={currentUser.userName as string}
                            />
                        )}
                        <SecondaryButton onClick={handleLogOutClick}>LogOut</SecondaryButton>
                    </ProfileInfo>
                </Wrapper>
            </SideBarContainer>
        </>
    )
})
