import { MONTHS } from '@/constants/month'
import { dateHelper } from '@/utils/dateHepler'
import { getDays } from '@/utils/getDays'

describe('getDays', () => {
    it('should return correct number of days for February in a leap year', () => {
        jest.spyOn(dateHelper, 'getCountOfDaysInMonth').mockReturnValueOnce(29)
        const result = getDays(MONTHS[1], 2020)
        expect(result).toHaveLength(29)
        expect(result).toEqual(Array.from({ length: 29 }, (_, i) => i + 1))
    })

    it('should return correct number of days for February in a non-leap year', () => {
        jest.spyOn(dateHelper, 'getCountOfDaysInMonth').mockReturnValueOnce(28)
        const result = getDays(MONTHS[1], 2021)
        expect(result).toHaveLength(28)
        expect(result).toEqual(Array.from({ length: 28 }, (_, i) => i + 1))
    })

    it('should return correct number of days for a month with 31 days', () => {
        jest.spyOn(dateHelper, 'getCountOfDaysInMonth').mockReturnValueOnce(31)
        const result = getDays(MONTHS[0], 2021)
        expect(result).toHaveLength(31)
        expect(result).toEqual(Array.from({ length: 31 }, (_, i) => i + 1))
    })

    it('should return empty array for zero days count', () => {
        jest.spyOn(dateHelper, 'getCountOfDaysInMonth').mockReturnValueOnce(0)
        const result = getDays(MONTHS[0], 2021)
        expect(result).toHaveLength(0)
        expect(result).toEqual([])
    })
})
