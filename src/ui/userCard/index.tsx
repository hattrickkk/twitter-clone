import { memo } from 'react'

import avatar from '@/assets/avatar.svg'
import { Flex } from '@/styles/flexStyles'

import { Image, ImageWrapper, UserName, Name, Wrapper, Info, ButtonWrapper } from './styled'
import { SecondaryButton } from '../buttons'

type Props = {
    photoURL?: string
    userName: string
    name: string
    hasFollowButton?: boolean
}

export const UserCard = memo(({ photoURL = undefined, userName, name, hasFollowButton = true }: Props) => {
    return (
        <Wrapper>
            <Flex>
                <ImageWrapper>
                    <Image src={photoURL ?? avatar} alt='avatar' />
                </ImageWrapper>
                <Info>
                    <Flex $flexdirection='column' $gap={5} $justifycontent='center'>
                        <Name>{name}</Name>
                        <UserName>{`@${userName}`}</UserName>
                    </Flex>
                </Info>
                {hasFollowButton && (
                    <ButtonWrapper>
                        <SecondaryButton>Follow</SecondaryButton>
                    </ButtonWrapper>
                )}
            </Flex>
        </Wrapper>
    )
})
