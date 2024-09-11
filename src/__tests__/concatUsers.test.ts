import { concatUsers } from '@/utils/concatUsers'

import { user1, user2, user3 } from '../__mocks__/users'

describe('compareUserData', () => {
    it('should concat 2 arrays and remove duplicates', () => {
        const prevUsers = [user1]
        const newUsers = [user2, user3]
        const result = concatUsers(prevUsers, newUsers)
        expect(result).toHaveLength(2)
        expect(result).toContainEqual(user1)
        expect(result).toContainEqual(user2)
        expect(result).not.toContainEqual(user3)
    })

    it('should concat empty arrays', () => {
        const result = concatUsers([], [])
        expect(result).toEqual([])
    })

    it('should concat single array', () => {
        const result = concatUsers([user1])
        expect(result).toHaveLength(1)
        expect(result).toContainEqual(user1)
    })

    it('should concat arrays withoyt duplicates', () => {
        const prevUsers = [user1]
        const newUsers = [user2]
        const result = concatUsers(prevUsers, newUsers)
        expect(result).toHaveLength(2)
        expect(result).toContainEqual(user1)
        expect(result).toContainEqual(user2)
    })
})
