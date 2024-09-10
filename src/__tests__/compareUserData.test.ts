import { compareUserData } from '@/utils/compareUserData'

import { user1, user2, user4 } from '../__mocks__/users'

describe('compareUserData', () => {
    it('2 equal data objects', () => {
        expect(compareUserData(user1, user4)).toBe(true)
    })

    it('2 different objects', () => {
        expect(compareUserData(user1, user2)).toBe(false)
    })
})
