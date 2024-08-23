type DateType = {
    month: number
    year: number
    day?: number
}

class DateHelper {
    getCurrentDate() {
        return new Date()
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
}

export const dateHelper = new DateHelper()
