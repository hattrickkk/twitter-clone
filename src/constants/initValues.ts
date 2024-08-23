import { MONTHS } from './month'
import type { DropdownsValues } from '@/customTypes/auth'
import { dateHelper } from '@/utils/hooks/dateHepler'

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
        value: dateHelper.getCurrentYear(),
    },
}
