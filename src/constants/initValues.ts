import { MONTHS } from './month'
import type { DropdownsValues } from '@/customTypes/auth'
import type { UserInfo } from '@/customTypes/user'
import { dateHelper } from '@/utils/dateHepler'

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

export const INIT_USER_INFO: UserInfo = {
    displayName: '',
    userName: '',
    photoURL: null,
}
