import { MIN_YEAR } from '@/constants/magicValues'

export const getYears = () => {
    const years = []
    const currentYear = new Date().getFullYear()
    for (let i = MIN_YEAR; i <= currentYear; i++) {
        years.push(i)
    }
    return years.reverse()
}
