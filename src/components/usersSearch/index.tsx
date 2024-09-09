import { memo } from 'react'

import { UserInfoDoc } from '@/customTypes/user'
import { searchUsers } from '@/utils/firebase/search'

import { Search } from '../search'
import { SearchedUsers } from '../searchedUsers'

type Props = {
    currentPath: string
}

export const UsersSearch = memo(({ currentPath }: Props) => {
    return (
        <Search
            placeholder={'Users search'}
            currentPath={currentPath}
            searchFunction={searchUsers}
            renderResults={users => (
                <>
                    <SearchedUsers users={users as UserInfoDoc[]} hasFollowButton={false} />
                </>
            )}
        />
    )
})
