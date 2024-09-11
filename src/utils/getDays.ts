import { MONTHS } from '@/constants/month'

import { dateHelper } from './dateHepler'

export const getDays = (month: string, year: number) => {
    const days = []
    const daysCount = dateHelper.getCountOfDaysInMonth({ year, month: MONTHS.indexOf(month) })
    for (let i = 1; i <= daysCount; i++) {
        days.push(i)
    }
    return days
}
