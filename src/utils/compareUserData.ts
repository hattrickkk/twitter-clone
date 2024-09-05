import { isEqual } from 'lodash'

import { UserInfoDoc } from '@/customTypes/user'

export const compareUserData = (initUserData: UserInfoDoc, changedUserData: UserInfoDoc) => {
    return isEqual(initUserData, changedUserData)
}
