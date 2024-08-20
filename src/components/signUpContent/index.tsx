import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { DropdownsWrapper, InputsWrapper, Logo, LogoImg, SignUp, Subtitle, Text, Title } from './styled'
import twitterLogo from '@/assets/twitter-logo.svg'
import { DropdownTypes } from '@/constants/magicValues'
import { MONTHS } from '@/constants/month'
import { Container } from '@/styles/common'
import { PrimaryButton } from '@/ui/buttons'
import { Dropdown } from '@/ui/dropdown'
import { Input } from '@/ui/input'
import { getDays } from '@/utils/getDays'
import { getYears } from '@/utils/getYears'

export const SignUpContent = () => {
    const [selectedMonth, setSelectedMonth] = useState(() => MONTHS[0])
    const [selectedYear, setSelectedYear] = useState(() => new Date().getFullYear())

    const days: number[] = useMemo(() => getDays(selectedMonth, selectedYear), [selectedMonth, selectedYear])
    const years: number[] = useMemo(() => getYears(), [])

    return (
        <Container>
            <SignUp>
                <Logo>
                    <LogoImg src={twitterLogo} alt='twitter-logo' />
                </Logo>
                <Title>Create an account</Title>
                <InputsWrapper>
                    <Input placeholder='Name' />
                    <Input placeholder='Phone Number' />
                    <Input placeholder='Email' />
                </InputsWrapper>
                <Link to={''}>Use email</Link>
                <Subtitle>Date of birth</Subtitle>
                <Text>
                    Facilisi sem pulvinar velit nunc, gravida scelerisque amet nibh sit. Quis bibendum ante phasellus
                    metus, magna lacinia sed augue. Odio enim nascetur leo mauris vel eget. Pretium id ullamcorper
                    blandit viverra dignissim eget tellus. Nibh mi massa in molestie a sit. Elit congue.
                </Text>
                <DropdownsWrapper>
                    <Dropdown placeholder={DropdownTypes.MONTH} items={MONTHS} setSelectedMonth={setSelectedMonth} />
                    <Dropdown placeholder={DropdownTypes.DAY} items={days} />
                    <Dropdown placeholder={DropdownTypes.YEAR} items={years} setSelectedYear={setSelectedYear} />
                </DropdownsWrapper>

                <PrimaryButton>Next</PrimaryButton>
            </SignUp>
        </Container>
    )
}
