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
import { getUser, hasFollowedByUser, updateUserFollowers } from '@/utils/firebase/user'

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
import { UserTweets } from '../userTweets'
import { WhatsHappening } from '../whatsHappening'

export const Profile = () => {
    const { uid } = useParams()
    const currentUser = useSelector(selectUser)
    const [loading, setLoading] = useState(false)
    const [userInfo, setUserInfo] = useState<UserInfoDoc>({} as UserInfoDoc)
    const [isFollowed, setIsFollowed] = useState(false)

    useEffect(() => {
        if (currentUser) {
            setLoading(true)
            getUser(uid as string).then(userInfo => {
                setUserInfo(userInfo as UserInfoDoc)
                setLoading(false)
            })
            hasFollowedByUser({ currentUserUid: currentUser.uid as string, anotherUserUid: uid as string }).then(res =>
                setIsFollowed(res)
            )
        }
    }, [uid])

    const isCurrentUser = currentUser && currentUser.uid === uid
    const { displayName, banner, photoURL, description, followers, following } = userInfo

    const handleFollowButtonClick = useCallback(() => {
        uid && currentUser && updateUserFollowers({ currentUserUid: currentUser.uid as string, anotherUserUid: uid })
    }, [uid])

    if (loading) return <Spinner />

    return (
        <ProfileSection>
            <BannerWrapper>
                <BannerImage src={banner ?? defaultBanner} alt='profile-banner' />
            </BannerWrapper>
            <Info>
                <Flex>
                    <StyledProfile>
                        <AvatarWrapper>
                            <AvatarImage src={photoURL ?? defaultAvatar} alt='avatar' />
                        </AvatarWrapper>
                        <ProfileDescriptionWrapper>
                            <DisplayName>{displayName}</DisplayName>
                            <LightText>@{uid}</LightText>
                            <Description>{description || ''}</Description>
                        </ProfileDescriptionWrapper>
                    </StyledProfile>

                    <ButtonWrapper $isCurrentUser={isCurrentUser as boolean}>
                        {isCurrentUser ? (
                            <Button>Edit Profile</Button>
                        ) : (
                            <SecondaryButton onClick={handleFollowButtonClick}>
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
    )
}
