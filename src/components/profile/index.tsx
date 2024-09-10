import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import defaultAvatar from '@/assets/avatar.svg'
import defaultBanner from '@/assets/profile/banner.png'
import { UserInfoDoc } from '@/customTypes/user'
import { selectUser } from '@/store/selectors'
import { Flex } from '@/styles/flexStyles'
import { Button, SecondaryButton } from '@/ui/buttons'
import { Spinner } from '@/ui/spinner'
import { getUserOnSnapshot, updateUserFollowers } from '@/utils/firebase/user'
import { useOpenState } from '@/utils/hooks/useOpenState'
import { usePictureURL } from '@/utils/hooks/usePictureURL'

import {
    AvatarImage,
    AvatarWrapper,
    BannerImage,
    BannerWrapper,
    ButtonWrapper,
    Description,
    DisplayName,
    FooterItem,
    Info,
    LightText,
    ProfileFooter,
    Text,
    StyledProfile,
    ProfileDescriptionWrapper,
    ProfileSection,
} from './styled'
import { EditProfileForm } from '../editProfileForm'
import { Header } from '../header'
import { Popup } from '../popup'
import { UserTweets } from '../userTweets'
import { WhatsHappening } from '../whatsHappening'

export const Profile = () => {
    const { uid } = useParams()
    const currentUser = useSelector(selectUser)
    const [loading, setLoading] = useState(false)
    const [userInfo, setUserInfo] = useState<UserInfoDoc>({} as UserInfoDoc)
    const [isFollowed, setIsFollowed] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [isPopupOpen, closePopup, openPopup] = useOpenState()

    useEffect(() => {
        setLoading(true)
        if (currentUser && uid) {
            return getUserOnSnapshot(uid as string, user => {
                setUserInfo(user)
                setLoading(false)
            })
        }
    }, [uid, currentUser])

    useEffect(() => {
        userInfo.followers && currentUser && setIsFollowed(!!userInfo.followers.find(uid => uid === currentUser.uid))
    }, [userInfo])

    const handleFollowButtonClick = useCallback(async () => {
        setIsSubmiting(true)
        try {
            await updateUserFollowers({
                currentUserUid: currentUser?.uid as string,
                anotherUserUid: uid as string,
            })
        } catch (error) {
            console.error(error)
        }
        setIsSubmiting(false)
    }, [uid])

    const isCurrentUser = currentUser && currentUser.uid === uid
    const { displayName, userName, banner, photoURL, description, followers, following, tweets } = userInfo
    const avatarImage = usePictureURL(photoURL)
    const bannerImage = usePictureURL(banner)

    if (loading) return <Spinner />

    return (
        <>
            <Popup isPopupOpen={isPopupOpen} closePopup={closePopup}>
                <EditProfileForm isPopupOpen={isPopupOpen} closePopup={closePopup} />
            </Popup>
            <ProfileSection>
                <Header>
                    <Flex $flexdirection='column'>
                        <DisplayName>{displayName}</DisplayName>
                        <LightText>{tweets?.length} Tweets</LightText>
                    </Flex>
                </Header>
                <BannerWrapper>
                    <BannerImage src={bannerImage ?? defaultBanner} alt='profile-banner' />
                </BannerWrapper>
                <Info>
                    <Flex $flexwrap='wrap'>
                        <StyledProfile>
                            <AvatarWrapper>
                                <AvatarImage src={avatarImage ?? defaultAvatar} alt='avatar' />
                            </AvatarWrapper>
                            <ProfileDescriptionWrapper>
                                <DisplayName>{displayName}</DisplayName>
                                <LightText>@{userName}</LightText>
                                <Description>{description || ''}</Description>
                            </ProfileDescriptionWrapper>
                        </StyledProfile>

                        <ButtonWrapper $isCurrentUser={isCurrentUser as boolean}>
                            {isCurrentUser ? (
                                <Button onClick={openPopup}>Edit Profile</Button>
                            ) : (
                                <SecondaryButton onClick={handleFollowButtonClick} isProcessing={isSubmiting}>
                                    {isFollowed ? 'Unfollow' : 'Follow'}
                                </SecondaryButton>
                            )}
                        </ButtonWrapper>
                    </Flex>
                    <ProfileFooter>
                        <FooterItem>
                            <Text>{following?.length}</Text>
                            <LightText>Following</LightText>
                        </FooterItem>
                        <FooterItem>
                            <Text>{followers?.length}</Text>
                            <LightText>Followers</LightText>
                        </FooterItem>
                    </ProfileFooter>
                </Info>
                {isCurrentUser && <WhatsHappening />}
                <UserTweets userId={uid as string} />
            </ProfileSection>
        </>
    )
}
