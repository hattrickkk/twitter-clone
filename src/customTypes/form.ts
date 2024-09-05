import { DropdownTypes } from '@/constants/dropdownTypes'

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

export type EditProfileFormData = {
    description?: string
    userName: string
    displayName: string
    phoneNumber: string
}

export type DropdownsValues = Record<Lowercase<DropdownTypes>, { isSelected: boolean; value: string | number }>
