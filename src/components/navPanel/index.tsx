import { memo, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

import twitterLogo from '@/assets/twitter-logo.svg'
import { NAV_LINKS, REST_NAV_LINKS } from '@/constants/navLinks'
import { PROFILE } from '@/constants/paths'
import { selectUser } from '@/store/selectors'
import { setUser } from '@/store/slices/userSlice'
import { PrimaryButton, SecondaryButton } from '@/ui/buttons'
import { ContextMenu } from '@/ui/contextMenu'
import { UserCard } from '@/ui/userCard'
import { useOpenState } from '@/utils/hooks/useOpenState'
import { useOutsideClick } from '@/utils/hooks/useOutsideClick'

import { Menu, Nav, Item, Text, ImageLogo, Logo, SideBarContainer, ContextMenuWrapper, ProfileInfo } from './styled'

export const NavPanel = memo(() => {
    const currentPath = useLocation().pathname
    const [isContextMenuOpen, closeContextMenu, openContextMenu] = useOpenState()

    const currentUser = useSelector(selectUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogOutClick = useCallback(() => {
        dispatch(setUser(null))
        navigate('/', { replace: true })
    }, [])

    const contextMenuRef = useRef(null)
    useOutsideClick(contextMenuRef, closeContextMenu)

    return (
        <SideBarContainer>
            <Logo>
                <ImageLogo src={twitterLogo} alt='twitter-logo' />
            </Logo>
            <Nav>
                <Menu>
                    {NAV_LINKS.map(({ title, path, Icon, ActiveIcon }) => (
                        <Item key={title}>
                            {currentPath === `/${path}` && ActiveIcon ? <ActiveIcon /> : <Icon />}
                            {title !== 'More' ? (
                                <NavLink to={path?.includes(PROFILE) ? `/${path}/${currentUser?.uid}` : `/${path}`}>
                                    {title}
                                </NavLink>
                            ) : (
                                <Text onClick={openContextMenu}>{title}</Text>
                            )}
                        </Item>
                    ))}
                </Menu>
                <ContextMenuWrapper ref={contextMenuRef} $isOpen={isContextMenuOpen}>
                    <ContextMenu items={REST_NAV_LINKS} />
                </ContextMenuWrapper>
            </Nav>
            <PrimaryButton>Tweet</PrimaryButton>

            <ProfileInfo>
                {currentUser && (
                    <UserCard
                        userName={currentUser.uid as string}
                        name={currentUser.displayName as string}
                        photoURL={currentUser.photoURL as string}
                        hasFollowButton={false}
                    />
                )}
                {currentPath.includes(PROFILE) && <SecondaryButton onClick={handleLogOutClick}>LogOut</SecondaryButton>}
            </ProfileInfo>
        </SideBarContainer>
    )
})
