import { Link } from 'react-router-dom'

import {
    Info,
    Logo,
    SubTitle,
    Title,
    Text,
    ImageWrapper,
    Img,
    GoogleImg,
    Wrapper,
    LandingContainer,
    LogoImg,
} from './styled'
import twitterBack from '@/assets/auth/back-twitter.png'
import googleIcon from '@/assets/auth/google-icon.svg'
import twitterLogo from '@/assets/twitter-logo.svg'
import { LOG_IN } from '@/constants/paths'
import { Flex } from '@/styles/flexStyles'
import { Button } from '@/ui/buttons'

export const LandingContent = () => {
    return (
        <LandingContainer>
            <Flex $gap={20}>
                <ImageWrapper>
                    <Img src={twitterBack} alt='twitter-back' />
                </ImageWrapper>
                <Info>
                    <Logo>
                        <LogoImg src={twitterLogo} alt='twitter-logo' />
                    </Logo>
                    <Title>Happening now</Title>
                    <SubTitle>Join Twitter today</SubTitle>
                    <Wrapper>
                        <Flex $flexdirection='column' $gap={20}>
                            <Button> Sign up with email</Button>
                            <Button>
                                <GoogleImg src={googleIcon} alt='google-icon' />
                                Sign up with email
                            </Button>
                        </Flex>

                        <Text>
                            By singing up you agree to the <Link to={''}>Terms of Service</Link> and{' '}
                            <Link to={''}>Privacy Policy</Link>, including <Link to={''}>Cookie Use</Link>.
                        </Text>
                        <Text>
                            Already have an account? <Link to={LOG_IN}>Log in</Link>
                        </Text>
                    </Wrapper>
                </Info>
            </Flex>
        </LandingContainer>
    )
}
