import { memo, useCallback } from 'react'

import { UserInfoDoc } from '@/customTypes/user'
import { searchUsers } from '@/utils/firebase/search'

import { Search } from '../search'
import { SearchedUsers } from '../searchedUsers'

type Props = {
    currentPath: string
}

export const UsersSearch = memo(({ currentPath }: Props) => {
    const renderUsers = useCallback(
        (users: unknown) => <SearchedUsers users={users as UserInfoDoc[]} hasFollowButton={false} />,
        []
    )

    return (
        <Search
            placeholder={'Users search'}
            currentPath={currentPath}
            searchFunction={searchUsers}
            renderResults={renderUsers}
        />
    )
})
