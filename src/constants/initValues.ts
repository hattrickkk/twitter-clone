import { MONTHS } from './month'
import { DropdownsValues } from '@/customTypes/auth'

export const INIT_DROPDOWNS_VALUES: DropdownsValues = {
    day: {
        isSelected: false,
        value: 1,
    },
    month: {
        isSelected: false,
        value: MONTHS[0],
    },
    year: {
        isSelected: false,
        value: new Date().getFullYear(),
    },
}
