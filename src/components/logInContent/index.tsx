import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { ButtonWrapper, InputsWrapper, LogIn, Logo, LogoImg, Title } from './styled'
import twitterLogo from '@/assets/twitter-logo.svg'
import { InputsNames } from '@/constants/inputsNames'
import { SIGN_UP } from '@/constants/paths'
import { Status } from '@/constants/responseStatus'
import type { LogInFormData } from '@/customTypes/auth'
import { Container, ErrorMessage } from '@/styles/common'
import { PrimaryButton } from '@/ui/buttons'
import { Input } from '@/ui/input'
import { logIn } from '@/utils/auth/auth'
import { useValidateInput } from '@/utils/hooks/useValidateInput'
import { logInsignSchema } from '@/utils/validationAuthSchemas'

export const LogInContent = () => {
    const [responseError, setResponseError] = useState('')

    const {
        control,
        handleSubmit,
        reset,
        formState: { isValid },
    } = useForm<LogInFormData>({
        resolver: yupResolver(logInsignSchema),
        mode: 'onChange',
    })

    const [emailOrPhoneField, emailOrPhoneFieldError] = useValidateInput(InputsNames.EMAIL_OR_PHONE, control)
    const [passwordField, passwordError] = useValidateInput(InputsNames.PASSWORD, control)

    const onSubmitHandler = useCallback(async ({ emailOrPhone, password }: LogInFormData) => {
        const response = await logIn(emailOrPhone, password)
        if (response.status === Status.SUCCESS) {
            setResponseError('')
            reset()
        } else {
            setResponseError(response.error as string)
        }
    }, [])

    return (
        <Container>
            <LogIn>
                <Logo>
                    <LogoImg src={twitterLogo} alt='twitter-logo' />
                </Logo>
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <Title>Log in to Twitter</Title>
                    <InputsWrapper>
                        <Input {...emailOrPhoneField} placeholder='Phone number, email address' />
                        {emailOrPhoneFieldError && <ErrorMessage>{emailOrPhoneFieldError.message}</ErrorMessage>}
                        <Input {...passwordField} placeholder='Password' />
                        {passwordError && <ErrorMessage>{passwordError.message}</ErrorMessage>}
                    </InputsWrapper>
                    <ButtonWrapper>
                        <PrimaryButton type='submit' disable={!isValid}>
                            Log In
                        </PrimaryButton>
                        {<ErrorMessage>{responseError}</ErrorMessage>}
                    </ButtonWrapper>

                    <Link to={SIGN_UP}>Sign up to Twitter</Link>
                </form>
            </LogIn>
        </Container>
    )
}
