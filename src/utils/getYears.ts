import { dateHelper } from './dateHepler'
import { MIN_YEAR } from '@/constants/magicValues'

export const getYears = () => {
    const years = []
    const currentYear = dateHelper.getCurrentYear()
    for (let i = MIN_YEAR; i <= currentYear; i++) {
        years.push(i)
    }
    return years.reverse()
}
