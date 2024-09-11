import { MIN_YEAR } from '@/constants/magicValues'

import { dateHelper } from './dateHepler'

export const getYears = () => {
    const years = []
    const currentYear = dateHelper.getCurrentYear()
    for (let i = MIN_YEAR; i <= currentYear; i++) {
        years.push(i)
    }
    return years.reverse()
}
