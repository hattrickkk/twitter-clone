import * as yup from 'yup'

import { InputsNames } from '@/constants/inputsNames'

export const EditProfileSchema = yup.object().shape({
    [InputsNames.DESCRIPTION]: yup.string().max(30, 'Description must be at much 30 characters'),
    [InputsNames.USER_NAME]: yup
        .string()
        .min(5, 'User name must be at least 5 characters')
        .max(30, 'User name must be at much 30 characters')
        .required('User name is required'),
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
