import { uniqBy } from 'lodash'

import { UserInfoDoc } from '@/customTypes/user'

export const concatUsers = (prevUsers: UserInfoDoc[], newUsers: UserInfoDoc[]) => {
    const combinedUsers = [...prevUsers, ...newUsers]
    const uniqueUsers: UserInfoDoc[] = uniqBy(combinedUsers, 'uid')
    return uniqueUsers
}
