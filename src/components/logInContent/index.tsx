import { Link } from 'react-router-dom'

import { InputsWrapper, LogIn, Logo, LogoImg, Title } from './styled'
import twitterLogo from '@/assets/twitter-logo.svg'
import { SIGN_UP } from '@/constants/paths'
import { Container } from '@/styles/common'
import { PrimaryButton } from '@/ui/buttons'
import { Input } from '@/ui/input'

export const LogInContent = () => {
    return (
        <Container>
            <LogIn>
                <Logo>
                    <LogoImg src={twitterLogo} alt='twitter-logo' />
                </Logo>
                <Title>Log in to Twitter</Title>
                <InputsWrapper>
                    <Input placeholder='Phone number, email address' />
                    <Input placeholder='Password' />
                </InputsWrapper>

                <PrimaryButton>Log In</PrimaryButton>
                <Link to={SIGN_UP}>Sign up to Twitter</Link>
            </LogIn>
        </Container>
    )
}
