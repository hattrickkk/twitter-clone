import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { ButtonWrapper, DropdownsWrapper, InputsWrapper, Logo, LogoImg, SignUp, Subtitle, Text, Title } from './styled'
import twitterLogo from '@/assets/twitter-logo.svg'
import { INIT_DROPDOWNS_VALUES } from '@/constants/initValues'
import { InputsNames } from '@/constants/inputsNames'
import { DropdownTypes } from '@/constants/magicValues'
import { MONTHS } from '@/constants/month'
import { LOG_IN } from '@/constants/paths'
import { Status } from '@/constants/responseStatus'
import { SignUpFormData } from '@/customTypes/auth'
import { Container, ErrorMessage } from '@/styles/common'
import { PrimaryButton } from '@/ui/buttons'
import { Dropdown } from '@/ui/dropdown'
import { Input } from '@/ui/input'
import { signUp } from '@/utils/auth/auth'
import { getDays } from '@/utils/getDays'
import { getYears } from '@/utils/getYears'
import { useValidateInput } from '@/utils/hooks/useValidateInput'
import { signUpSchema } from '@/utils/validationAuthSchemas'

export const SignUpContent = () => {
    const [dropdownsValues, setDropdownValues] = useState(INIT_DROPDOWNS_VALUES)
    const [dropdownError, setDropdownError] = useState('')
    const [responseError, setResponseError] = useState('')

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

    const registerUser = useCallback(
        async ({ email, displayName, phoneNumber, password }: SignUpFormData) => {
            const { day, month, year } = dropdownsValues
            const response = await signUp({
                email,
                displayName,
                phoneNumber,
                password,
                birthDate: `${day.value}/${MONTHS.indexOf(month.value as string) + 1}/${year.value}`,
            })
            if (response.status === Status.SUCCESS) {
                setDropdownError('')
                setResponseError('')
                reset()
            } else {
                setResponseError(response.error as string)
            }
        },
        [dropdownsValues]
    )

    const onSubmitHandler = useCallback(
        async (formData: SignUpFormData) => {
            const { day, month, year } = dropdownsValues
            if (!day.isSelected || !month.isSelected || !year.isSelected) {
                setDropdownError('Month, Day and Year are required')
                return
            }
            const selectedDate = new Date(+year.value, MONTHS.indexOf(month.value as string), +day.value)
            if (selectedDate > new Date()) {
                setDropdownError('Selected date must not be greater than the current date')
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
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <Title>Create an account</Title>
                    <InputsWrapper>
                        <Input {...nameField} placeholder='Name' />
                        {nameError && <ErrorMessage>{nameError.message}</ErrorMessage>}
                        <Input {...phoneNumberField} placeholder='Phone Number' />
                        {phoneNumberError && <ErrorMessage>{phoneNumberError.message}</ErrorMessage>}
                        <Input {...emailField} placeholder='Email' />
                        {emailError && <ErrorMessage>{emailError.message}</ErrorMessage>}
                        <Input {...passwordField} placeholder='Password' />
                        {passwordError && <ErrorMessage>{passwordError.message}</ErrorMessage>}
                    </InputsWrapper>
                    <Link to={LOG_IN}>Use email</Link>
                    <Subtitle>Date of birth</Subtitle>
                    <Text>
                        Facilisi sem pulvinar velit nunc, gravida scelerisque amet nibh sit. Quis bibendum ante
                        phasellus metus, magna lacinia sed augue. Odio enim nascetur leo mauris vel eget. Pretium id
                        ullamcorper blandit viverra dignissim eget tellus. Nibh mi massa in molestie a sit. Elit congue.
                    </Text>
                    <DropdownsWrapper>
                        <Dropdown
                            placeholder={DropdownTypes.MONTH}
                            items={MONTHS}
                            setDropdownValues={setDropdownValues}
                        />
                        <Dropdown placeholder={DropdownTypes.DAY} items={days} setDropdownValues={setDropdownValues} />
                        <Dropdown
                            placeholder={DropdownTypes.YEAR}
                            items={years}
                            setDropdownValues={setDropdownValues}
                        />
                    </DropdownsWrapper>
                    {dropdownError && <ErrorMessage>{dropdownError}</ErrorMessage>}
                    <ButtonWrapper>
                        <PrimaryButton type='submit' disable={!isValid || !!dropdownError}>
                            Next
                        </PrimaryButton>
                        {<ErrorMessage>{responseError}</ErrorMessage>}
                    </ButtonWrapper>
                </form>
            </SignUp>
        </Container>
    )
}
