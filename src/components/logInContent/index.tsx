import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import twitterLogo from '@/assets/twitter-logo.svg'
import { InputWithError } from '@/components/InputWithError'
import { InputsNames } from '@/constants/inputsNames'
import { Messages } from '@/constants/messages'
import { HOME, SIGN_UP } from '@/constants/paths'
import { Status } from '@/constants/responseStatus'
import type { LogInFormData } from '@/customTypes/form'
import type { RequiredUser } from '@/customTypes/user'
import { setNotification } from '@/store/slices/notificationSlice'
import { setUser } from '@/store/slices/userSlice'
import { Container, Form } from '@/styles/common'
import { PrimaryButton } from '@/ui/buttons'
import { logIn } from '@/utils/firebase/auth'
import { useValidateInput } from '@/utils/hooks/useValidateInput'
import { logInsignSchema } from '@/utils/validationSchemas/validationAuthSchemas'

import { InputsWrapper, LogIn, Logo, LogoImg, Title } from './styled'

export const LogInContent = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

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

    const [isSubmitting, setIsSubmiting] = useState(false)

    const onSubmitHandler = useCallback(async ({ emailOrPhone, password }: LogInFormData) => {
        setIsSubmiting(true)
        const { status, user, error, accessToken } = await logIn(emailOrPhone, password)
        if (status === Status.SUCCESS) {
            dispatch(setNotification({ message: Messages.LOG_IN, status: Status.SUCCESS }))
            dispatch(setUser({ ...(user as RequiredUser), accessToken: accessToken as string }))
            navigate(`/${HOME}`, { replace: true })
            reset()
        } else {
            dispatch(setNotification({ message: error as string, status: Status.FAIL }))
        }
        setIsSubmiting(false)
    }, [])

    return (
        <Container>
            <LogIn>
                <Logo>
                    <LogoImg src={twitterLogo} alt='twitter-logo' />
                </Logo>
                <Form onSubmit={handleSubmit(onSubmitHandler)}>
                    <Title>Log in to Twitter</Title>
                    <InputsWrapper>
                        <InputWithError
                            placeholder='Phone number, email address'
                            error={emailOrPhoneFieldError}
                            controllerProps={emailOrPhoneField}
                        />
                        <InputWithError placeholder='Password' error={passwordError} controllerProps={passwordField} />
                    </InputsWrapper>

                    <PrimaryButton type='submit' disable={!isValid} isProcessing={isSubmitting}>
                        Log In
                    </PrimaryButton>

                    <Link to={SIGN_UP}>Sign up to Twitter</Link>
                </Form>
            </LogIn>
        </Container>
    )
}
