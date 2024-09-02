import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import defaultAvatar from '@/assets/avatar.svg'
import defaultBanner from '@/assets/profile/banner.png'
import { UserInfoDoc } from '@/customTypes/user'
import { selectUser } from '@/store/selectors'
import { Flex } from '@/styles/flexStyles'
import { Button } from '@/ui/buttons'
import { Spinner } from '@/ui/spinner'
import { getUser } from '@/utils/firebase/user'

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
    const currentUser = useSelector(selectUser)
    const [loading, setLoading] = useState(false)
    const [userInfo, setUserInfo] = useState<UserInfoDoc>({} as UserInfoDoc)

    useEffect(() => {
        if (currentUser) {
            setLoading(true)
            getUser(currentUser.uid as string).then(userInfo => {
                setUserInfo(userInfo as UserInfoDoc)
                setLoading(false)
            })
        }
    }, [])

    const { displayName, banner, photoURL, description, uid } = userInfo

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

                    <ButtonWrapper>
                        <Button>Edit Profile</Button>
                    </ButtonWrapper>
                </Flex>
                <ProfileFooter>
                    <FooterItem>
                        <Text>76</Text>
                        <LightText>Following</LightText>
                    </FooterItem>
                    <FooterItem>
                        <Text>76</Text>
                        <LightText>Followers</LightText>
                    </FooterItem>
                </ProfileFooter>
            </Info>
            <WhatsHappening />
            <UserTweets />
        </ProfileSection>
    )
}
