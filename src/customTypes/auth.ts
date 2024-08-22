import { InputsNames } from '@/constants/inputsNames'
import { DropdownTypes } from '@/constants/magicValues'

export type SignUpFormData = {
    displayName: string
    email: string
    password: string
    phoneNumber: string
}

export type LogInFormData = {
    password: string
    emailOrPhone: string
}

export type DropdownsValues = Record<Lowercase<DropdownTypes>, { isSelected: boolean; value: string | number }>
