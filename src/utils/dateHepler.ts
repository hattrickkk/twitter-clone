type DateType = {
    month: number
    year: number
    day?: number
}

class DateHelper {
    getCurrentDate() {
        return new Date()
    }

    getMilliseconds() {
        return Date.now()
    }

    getCurrentYear() {
        return new Date().getFullYear()
    }

    getDate({ month, year, day }: DateType) {
        return new Date(year, month, day)
    }

    getCountOfDaysInMonth({ month, year }: DateType) {
        return new Date(year, month + 1, 0).getDate()
    }

    getDateByString(date: string) {
        return new Date(date)
    }
}

export const dateHelper = new DateHelper()
