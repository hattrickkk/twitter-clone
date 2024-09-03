import { forwardRef, memo, useCallback, useEffect, useState } from 'react'

import avatar from '@/assets/avatar.svg'
import { Flex } from '@/styles/flexStyles'
import { updateUserFollowers } from '@/utils/firebase/user'
import { useViewProfile } from '@/utils/hooks/useViewProfile'

import { Image, ImageWrapper, UserName, Name, Wrapper, Info, ButtonWrapper } from './styled'
import { SecondaryButton } from '../buttons'

type Props = {
    photoURL: string | null
    uid: string
    displayName: string
    followers?: string[]
    currentUserUid: string
    hasFollowButton?: boolean
}

export const UserCard = memo(
    forwardRef<HTMLDivElement, Props>(
        ({ photoURL, uid, displayName, currentUserUid, followers = [], hasFollowButton = true }, ref) => {
            const [isFollowed, setIsFollowed] = useState(false)
            const [isSubmiting, setIsSubmiting] = useState(false)

            useEffect(() => {
                followers && setIsFollowed(!!followers.find(uid => uid == currentUserUid))
            }, [followers])

            const handleFollowButtonClick = useCallback(() => {
                setIsSubmiting(true)
                updateUserFollowers({ currentUserUid, anotherUserUid: uid }).then(() => setIsSubmiting(false))
            }, [uid, currentUserUid])

            const handleViewProfile = useViewProfile(uid)

            return (
                <Wrapper ref={ref}>
                    <Flex>
                        <ImageWrapper onClick={handleViewProfile}>
                            <Image src={photoURL ?? avatar} alt='avatar' />
                        </ImageWrapper>
                        <Info>
                            <Flex $flexdirection='column' $gap={5} $justifycontent='center'>
                                <Name onClick={handleViewProfile}>{displayName}</Name>
                                <UserName onClick={handleViewProfile}>{`@${uid}`}</UserName>
                            </Flex>
                        </Info>
                        {hasFollowButton && (
                            <ButtonWrapper>
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
