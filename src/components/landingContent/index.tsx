import { useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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
import { Messages } from '@/constants/messages'
import { HOME, LOG_IN, SIGN_UP } from '@/constants/paths'
import { Status } from '@/constants/responseStatus'
import { Flex } from '@/styles/flexStyles'
import { Button } from '@/ui/buttons'
import { signInWithGoogle } from '@/utils/auth/auth'
import { setNotification } from '@/utils/setNotification'

export const LandingContent = () => {
    const navigate = useNavigate()
    const handleNavigationToSignUp = useCallback(() => navigate(SIGN_UP), [])
    const handleSignInWithGoogle = useCallback(async () => {
        const response = await signInWithGoogle()
        if (response.status === Status.SUCCESS) {
            setNotification(Messages.LOG_IN_VIA_GOOGLE, Status.SUCCESS)
            navigate(`/${HOME}`)
        } else {
            console.error(response.error as string)
        }
    }, [])

    return (
        <>
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
                                <Button onClick={handleSignInWithGoogle}>
                                    <GoogleImg src={googleIcon} alt='google-icon' />
                                    Sign up with Google
                                </Button>
                                <Button onClick={handleNavigationToSignUp}> Sign up with email</Button>
                            </Flex>

                            <Text>
                                By singing up you agree to the <Link to={'/terms-of-service'}>Terms of Service</Link>{' '}
                                and
                                <Link to={'/privacy-policy'}> Privacy Policy</Link>, including
                                <Link to={'/cookie-use'}> Cookie Use</Link>.
                            </Text>
                            <Text>
                                Already have an account? <Link to={LOG_IN}>Log in</Link>
                            </Text>
                        </Wrapper>
                    </Info>
                </Flex>
            </LandingContainer>
        </>
    )
}
