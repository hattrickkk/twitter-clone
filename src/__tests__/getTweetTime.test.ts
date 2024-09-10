import { getTweetTime } from '@/utils/getTweetTime'

import * as time from '../__mocks__/time'

describe('getTweetTime', () => {
    it('time should equal "now"', () => {
        expect(getTweetTime(time.nowDate)).toBe('now')
    })

    it('should return minutes when the difference is less than 1 hour', () => {
        expect(getTweetTime(time.sec60)).toBe('1m')
        expect(getTweetTime(time.min3)).toBe('3m')
    })

    it('should return hours when the difference is less than 1 day', () => {
        expect(getTweetTime(time.h1)).toBe('1h')
        expect(getTweetTime(time.h3)).toBe('3h')
    })

    it('should return day and month for dates earlier in the current year', () => {
        expect(getTweetTime(time.oldDateinCurrentYear)).toBe('8 aug')
    })

    it('should return day, month, and year for dates in a previous year', () => {
        expect(getTweetTime(time.oldDateinPrevYear)).toBe('8 sep 2023')
    })
})
