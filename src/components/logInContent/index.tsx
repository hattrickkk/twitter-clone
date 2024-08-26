import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { InputsWrapper, LogIn, Logo, LogoImg, Title } from './styled'
import twitterLogo from '@/assets/twitter-logo.svg'
import { InputWithError } from '@/components/InputWithError'
import { InputsNames } from '@/constants/inputsNames'
import { Messages } from '@/constants/messages'
import { HOME, SIGN_UP } from '@/constants/paths'
import { Status } from '@/constants/responseStatus'
import type { LogInFormData } from '@/customTypes/auth'
import { Container, Form } from '@/styles/common'
import { PrimaryButton } from '@/ui/buttons'
import { Notification } from '@/ui/notification'
import { logIn } from '@/utils/auth/auth'
import { useValidateInput } from '@/utils/hooks/useValidateInput'
import { setNotification } from '@/utils/setNotification'
import { logInsignSchema } from '@/utils/validationAuthSchemas'

export const LogInContent = () => {
    const navigate = useNavigate()

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

    const [isNotificationOpen, setIsNotificationOpen] = useState(false)
    const [notificationMessage, setnNotificationMessage] = useState('')
    const [notificationStatus, setnNotificationStatus] = useState(Status.SUCCESS)

    const onSubmitHandler = useCallback(async ({ emailOrPhone, password }: LogInFormData) => {
        setIsSubmiting(true)
        const response = await logIn(emailOrPhone, password)
        if (response.status === Status.SUCCESS) {
            setNotification(Messages.LOG_IN, Status.SUCCESS)
            navigate(`/${HOME}`, { replace: true })
            reset()
        } else {
            setnNotificationMessage(response.error as string)
            setnNotificationStatus(Status.FAIL)
            setIsNotificationOpen(true)
            setTimeout(() => {
                setIsNotificationOpen(false)
            }, 3000)
        }
        setIsSubmiting(false)
    }, [])

    return (
        <>
            <Notification message={notificationMessage} status={notificationStatus} visibility={isNotificationOpen} />
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
                            <InputWithError
                                placeholder='Password'
                                error={passwordError}
                                controllerProps={passwordField}
                            />
                        </InputsWrapper>

                        <PrimaryButton type='submit' disable={!isValid} isProcessing={isSubmitting}>
                            Log In
                        </PrimaryButton>

                        <Link to={SIGN_UP}>Sign up to Twitter</Link>
                    </Form>
                </LogIn>
            </Container>
        </>
    )
}
