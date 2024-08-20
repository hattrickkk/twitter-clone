import { MONTHS } from '@/constants/month'

export const getDays = (month: string, year: number) => {
    const days = []
    const daysCount = new Date(year, MONTHS.indexOf(month) + 1, 0).getDate()
    for (let i = 1; i <= daysCount; i++) {
        days.push(i)
    }
    return days
}
