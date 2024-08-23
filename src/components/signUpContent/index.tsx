import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { ButtonWrapper, DropdownsWrapper, InputsWrapper, Logo, LogoImg, SignUp, Subtitle, Text, Title } from './styled'
import { InputWithError } from '../InputWithError'
import twitterLogo from '@/assets/twitter-logo.svg'
import { DropdownTypes } from '@/constants/dropdownTypes'
import { INIT_DROPDOWNS_VALUES } from '@/constants/initValues'
import { InputsNames } from '@/constants/inputsNames'
import { Messages } from '@/constants/messages'
import { MONTHS } from '@/constants/month'
import { HOME, LOG_IN } from '@/constants/paths'
import { Status } from '@/constants/responseStatus'
import type { SignUpFormData } from '@/customTypes/auth'
import { Container, ErrorMessage, Form } from '@/styles/common'
import { PrimaryButton } from '@/ui/buttons'
import { Dropdown } from '@/ui/dropdown'
import { Notification } from '@/ui/notification'
import { signUp } from '@/utils/auth/auth'
import { dateHelper } from '@/utils/dateHepler'
import { getDays } from '@/utils/getDays'
import { getYears } from '@/utils/getYears'
import { useValidateInput } from '@/utils/hooks/useValidateInput'
import { setNotification } from '@/utils/setNotification'
import { signUpSchema } from '@/utils/validationAuthSchemas'

export const SignUpContent = () => {
    const [dropdownsValues, setDropdownValues] = useState(INIT_DROPDOWNS_VALUES)
    const [dropdownError, setDropdownError] = useState('')

    const navigate = useNavigate()

    const years: number[] = useMemo(() => getYears(), [])
    const days: number[] = useMemo(
        () => getDays(dropdownsValues.month.value as string, dropdownsValues.year.value as number),
        [dropdownsValues]
    )

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

    const [isNotificationOpen, setIsNotificationOpen] = useState(false)
    const [notificationMessage, setnNotificationMessage] = useState('')
    const [notificationStatus, setnNotificationStatus] = useState(Status.SUCCESS)

    const registerUser = useCallback(
        async ({ email, displayName, phoneNumber, password }: SignUpFormData) => {
            const { day, month, year } = dropdownsValues
            setIsSubmiting(true)
            const response = await signUp({
                email,
                displayName,
                phoneNumber,
                password,
                birthDate: `${day.value}/${MONTHS.indexOf(month.value as string) + 1}/${year.value}`,
            })
            if (response.status === Status.SUCCESS) {
                navigate(HOME, { replace: true })
                setNotification(Messages.SIGN_UP, Status.SUCCESS)
                setDropdownError('')
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
                setDropdownError(Messages.GREATER_DATE)
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
        <>
            <Notification message={notificationMessage} status={notificationStatus} visibility={isNotificationOpen} />
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
                            <InputWithError
                                placeholder='Password'
                                error={passwordError}
                                controllerProps={passwordField}
                            />
                        </InputsWrapper>
                        <Link to={LOG_IN}>Use email</Link>
                        <Subtitle>Date of birth</Subtitle>
                        <Text>
                            Facilisi sem pulvinar velit nunc, gravida scelerisque amet nibh sit. Quis bibendum ante
                            phasellus metus, magna lacinia sed augue. Odio enim nascetur leo mauris vel eget. Pretium id
                            ullamcorper blandit viverra dignissim eget tellus. Nibh mi massa in molestie a sit. Elit
                            congue.
                        </Text>
                        <DropdownsWrapper>
                            <Dropdown
                                placeholder={DropdownTypes.MONTH}
                                items={MONTHS}
                                setDropdownValues={setDropdownValues}
                            />
                            <Dropdown
                                placeholder={DropdownTypes.DAY}
                                items={days}
                                setDropdownValues={setDropdownValues}
                            />
                            <Dropdown
                                placeholder={DropdownTypes.YEAR}
                                items={years}
                                setDropdownValues={setDropdownValues}
                            />
                        </DropdownsWrapper>
                        {dropdownError && <ErrorMessage>{dropdownError}</ErrorMessage>}
                        <ButtonWrapper>
                            <PrimaryButton
                                type='submit'
                                disable={!isValid || !!dropdownError}
                                isProcessing={isSubmitting}
                            >
                                Next
                            </PrimaryButton>
                        </ButtonWrapper>
                    </Form>
                </SignUp>
            </Container>
        </>
    )
}
