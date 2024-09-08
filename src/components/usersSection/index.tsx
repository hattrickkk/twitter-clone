import { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { RECOMENDATIONS } from '@/constants/paths'
import { UserInfoDoc } from '@/customTypes/user'
import { selectUser } from '@/store/selectors'
import { UserCard } from '@/ui/userCard'
import { getUsersExceptCurrent } from '@/utils/firebase/user'

import { StyledSection, Title } from './styled'

export const UsersSection = memo(() => {
    const [users, setUsers] = useState<UserInfoDoc[]>([])
    const currentUser = useSelector(selectUser)

    useEffect(() => {
        return getUsersExceptCurrent(currentUser?.uid as string, null, users => setUsers(users.slice(0, 2)))
    }, [])

    return (
        <StyledSection>
            <Title>You might like</Title>
            {users.map(({ displayName, uid, userName, photoURL, followers }) => (
                <UserCard
                    key={uid}
                    uid={uid}
                    displayName={displayName}
                    photoURL={photoURL}
                    followers={followers}
                    currentUserUid={currentUser?.uid as string}
                    userName={userName}
                />
            ))}
            <Link to={`/${RECOMENDATIONS}`}>Show more</Link>
        </StyledSection>
    )
})
