import { memo } from 'react'
import { useSelector } from 'react-redux'

import { UserInfoDoc } from '@/customTypes/user'
import { selectUser } from '@/store/selectors'
import { UserCard } from '@/ui/userCard'

import { Wrapper } from './styled'

type Props = {
    users: UserInfoDoc[]
    hasFollowButton?: boolean
}

export const SearchedUsers = memo(({ users, hasFollowButton }: Props) => {
    const currentUser = useSelector(selectUser)
    return (
        <Wrapper>
            {users.map(({ photoURL, uid, displayName, userName, followers }) => (
                <UserCard
                    key={uid}
                    photoURL={photoURL}
                    uid={uid}
                    displayName={displayName}
                    userName={userName}
                    followers={followers}
                    currentUserUid={currentUser?.uid as string}
                    hasFollowButton={hasFollowButton}
                />
            ))}
        </Wrapper>
    )
})
