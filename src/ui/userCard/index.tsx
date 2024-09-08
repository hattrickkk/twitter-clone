import { forwardRef, memo, useCallback, useEffect, useState } from 'react'

import avatar from '@/assets/avatar.svg'
import { Flex } from '@/styles/flexStyles'
import { updateUserFollowers } from '@/utils/firebase/user'
import { usePictureURL } from '@/utils/hooks/usePictureURL'
import { useViewProfile } from '@/utils/hooks/useViewProfile'

import { Image, ImageWrapper, UserName, Name, Wrapper, Info, ButtonWrapper } from './styled'
import { SecondaryButton } from '../buttons'

type Props = {
    photoURL: string | null
    uid: string
    userName: string
    displayName: string
    followers?: string[]
    currentUserUid: string
    hasFollowButton?: boolean
}

export const UserCard = memo(
    forwardRef<HTMLDivElement, Props>(
        ({ photoURL, uid, displayName, userName, currentUserUid, followers = [], hasFollowButton = true }, ref) => {
            const [isFollowed, setIsFollowed] = useState(false)
            const [isSubmiting, setIsSubmiting] = useState(false)
            const avatarImage = usePictureURL(photoURL)

            useEffect(() => {
                followers && setIsFollowed(!!followers.find(uid => uid == currentUserUid))
            }, [followers])

            const handleFollowButtonClick = useCallback(() => {
                setIsSubmiting(true)
                updateUserFollowers({ currentUserUid, anotherUserUid: uid })
                    .then(() => setIsSubmiting(false))
                    .catch(err => console.error(err))
            }, [uid, currentUserUid])

            const handleViewProfile = useViewProfile(uid)

            return (
                <Wrapper ref={ref}>
                    <Flex>
                        <ImageWrapper onClick={handleViewProfile}>
                            <Image src={avatarImage ?? avatar} alt='avatar' />
                        </ImageWrapper>
                        <Info>
                            <Flex $flexdirection='column' $gap={5} $justifycontent='center'>
                                <Name onClick={handleViewProfile} id='display-name'>
                                    {displayName}
                                </Name>
                                <UserName onClick={handleViewProfile} id='user-name'>{`@${userName}`}</UserName>
                            </Flex>
                        </Info>
                        {hasFollowButton && (
                            <ButtonWrapper id='follow-button-wrapper'>
                                <SecondaryButton onClick={handleFollowButtonClick} isProcessing={isSubmiting}>
                                    {isFollowed ? 'Unfollow' : 'Follow'}
                                </SecondaryButton>
                            </ButtonWrapper>
                        )}
                    </Flex>
                </Wrapper>
            )
        }
    )
)
