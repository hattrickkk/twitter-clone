import * as yup from 'yup'

import { InputsNames } from '@/constants/inputsNames'

const passwordSchema = yup.object().shape({
    [InputsNames.PASSWORD]: yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(30, 'Pasword must be at much 30 characters')
        .required('Password is required'),
})

const emailSchema = yup.object().shape({
    [InputsNames.EMAIL]: yup.string().email().required('Email is required'),
})

export const logInsignSchema = yup
    .object()
    .shape({
        [InputsNames.EMAIL_OR_PHONE]: yup
            .string()
            .test('is-email-or-phone-valid', 'This field must match the +375 XX XXX XX XX or email type', value => {
                return value ? /^\+375\d{9}$/.test(value) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) : false
            })
            .required('Phone number or email are required'),
    })
    .concat(passwordSchema)

export const signUpSchema = yup
    .object()
    .shape({
        [InputsNames.DISPLAY_NAME]: yup
            .string()
            .min(2, 'Name must be at least 2 characters')
            .max(30, 'Name must be at much 30 characters')
            .required('Name is required'),
        [InputsNames.PHONE_NUMBER]: yup
            .string()
            .matches(/^\+375\d{9}$/, 'Phone number must match the +375 XX XXX XX XX')
            .required('Phone number is required'),
    })
    .concat(passwordSchema)
    .concat(emailSchema)
