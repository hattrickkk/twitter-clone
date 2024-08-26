import { Image, ImageWrapper, UserName, Name, Wrapper, Info, ButtonWrapper } from './styled'
import { SecondaryButton } from '../buttons'
import avatar from '@/assets/avatar.svg'
import { Flex } from '@/styles/flexStyles'

type Props = {
    photoURL?: string
    userName: string
    name: string
}

export const UserCard = ({ photoURL = undefined, userName, name }: Props) => {
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
                <ButtonWrapper>
                    <SecondaryButton>Follow</SecondaryButton>
                </ButtonWrapper>
            </Flex>
        </Wrapper>
    )
}
