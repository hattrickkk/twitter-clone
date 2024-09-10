import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import twitterLogo from '@/assets/twitter-logo.svg'
import { InputWithError } from '@/components/InputWithError'
import { INIT_DROPDOWNS_VALUES } from '@/constants/initValues'
import { InputsNames } from '@/constants/inputsNames'
import { Messages } from '@/constants/messages'
import { MONTHS } from '@/constants/month'
import { HOME, LOG_IN } from '@/constants/paths'
import { Status } from '@/constants/responseStatus'
import type { SignUpFormData } from '@/customTypes/form'
import type { RequiredUser } from '@/customTypes/user'
import { setNotification } from '@/store/slices/notificationSlice'
import { setUser } from '@/store/slices/userSlice'
import { Container, ErrorMessage, Form } from '@/styles/common'
import { PrimaryButton } from '@/ui/buttons'
import { dateHelper } from '@/utils/dateHepler'
import { signUp } from '@/utils/firebase/auth'
import { useValidateInput } from '@/utils/hooks/useValidateInput'
import { signUpSchema } from '@/utils/validationSchemas/validationAuthSchemas'

import { ButtonWrapper, InputsWrapper, Logo, LogoImg, SignUp, Subtitle, Text, Title } from './styled'
import { DropdownsGroup } from '../dropdownsGroup'

export const SignUpContent = () => {
    const [dropdownsValues, setDropdownValues] = useState(INIT_DROPDOWNS_VALUES)
    const [dropdownError, setDropdownError] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        control,
        handleSubmit,
        reset,
        formState: { isValid },
    } = useForm<SignUpFormData>({ resolver: yupResolver(signUpSchema), mode: 'onChange' })

    const [nameField, nameError] = useValidateInput(InputsNames.DISPLAY_NAME, control)
    const [emailField, emailError] = useValidateInput(InputsNames.EMAIL, control)
    const [phoneNumberField, phoneNumberError] = useValidateInput(InputsNames.PHONE_NUMBER, control)
    const [passwordField, passwordError] = useValidateInput(InputsNames.PASSWORD, control)

    const [isSubmitting, setIsSubmiting] = useState(false)

    const registerUser = useCallback(
        async ({ email, displayName, phoneNumber, password }: SignUpFormData) => {
            const { day, month, year } = dropdownsValues
            setIsSubmiting(true)
            const { status, accessToken, error, user } = await signUp({
                email,
                displayName,
                phoneNumber,
                password,
                birthDate: dateHelper.getStringDate({
                    day: +day.value,
                    month: MONTHS.indexOf(month.value as string) + 1,
                    year: +year.value,
                }),
            })
            if (status === Status.SUCCESS) {
                navigate(`/${HOME}`, { replace: true })
                dispatch(setUser({ ...(user as RequiredUser), accessToken: accessToken as string }))
                dispatch(setNotification({ message: Messages.SIGN_UP, status: Status.SUCCESS }))
                setDropdownError('')
                reset()
            } else {
                dispatch(setNotification({ message: error as string, status: Status.FAIL }))
            }
            setIsSubmiting(false)
        },
        [dropdownsValues]
    )

    const onSubmitHandler = useCallback(
        async (formData: SignUpFormData) => {
            const { day, month, year } = dropdownsValues
            if (!day.isSelected || !month.isSelected || !year.isSelected) {
                setDropdownError(Messages.DATE_REQUIRED)
                return
            }

            const selectedDate = dateHelper.getDate({
                year: +year.value,
                month: MONTHS.indexOf(month.value as string),
                day: +day.value,
            })

            if (selectedDate > dateHelper.getCurrentDate()) {
                dispatch(setNotification({ message: Messages.GREATER_DATE, status: Status.FAIL }))
                return
            }
            await registerUser(formData)
        },
        [dropdownsValues, registerUser]
    )

    useEffect(() => {
        const { day, month, year } = dropdownsValues
        if (day.isSelected && month.isSelected && year.isSelected) {
            setDropdownError('')
        }
    }, [dropdownsValues])

    return (
        <Container>
            <SignUp>
                <Logo>
                    <LogoImg src={twitterLogo} alt='twitter-logo' />
                </Logo>
                <Form onSubmit={handleSubmit(onSubmitHandler)}>
                    <Title>Create an account</Title>
                    <InputsWrapper>
                        <InputWithError placeholder='Name' error={nameError} controllerProps={nameField} />
                        <InputWithError
                            placeholder='Phone Number'
                            error={phoneNumberError}
                            controllerProps={phoneNumberField}
                        />
                        <InputWithError placeholder='Email' error={emailError} controllerProps={emailField} />
                        <InputWithError placeholder='Password' error={passwordError} controllerProps={passwordField} />
                    </InputsWrapper>
                    <Link to={LOG_IN}>Use email</Link>
                    <Subtitle>Date of birth</Subtitle>
                    <Text>
                        Facilisi sem pulvinar velit nunc, gravida scelerisque amet nibh sit. Quis bibendum ante
                        phasellus metus, magna lacinia sed augue. Odio enim nascetur leo mauris vel eget. Pretium id
                        ullamcorper blandit viverra dignissim eget tellus. Nibh mi massa in molestie a sit. Elit congue.
                    </Text>
                    <DropdownsGroup setDropdownValues={setDropdownValues} dropdownsValues={dropdownsValues} />
                    <ErrorMessage $visibility={!!dropdownError}>{dropdownError}</ErrorMessage>
                    <ButtonWrapper>
                        <PrimaryButton type='submit' disable={!isValid || !!dropdownError} isProcessing={isSubmitting}>
                            Next
                        </PrimaryButton>
                    </ButtonWrapper>
                </Form>
            </SignUp>
        </Container>
    )
}
