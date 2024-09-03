import { useSelector } from 'react-redux'

import { Header } from '@/components/header'
import { selectUser } from '@/store/selectors'
import { Spinner } from '@/ui/spinner'
import { UserCard } from '@/ui/userCard'
import { useLoadUsers } from '@/utils/hooks/useLoadUsers'

import { UsersWrapper } from './styled'

const RecomendationsPage = () => {
    const currentUser = useSelector(selectUser)
    const { users, loading, lastUserRef } = useLoadUsers(currentUser?.uid as string)
    return (
        <>
            <Header />
            <UsersWrapper>
                {users.map(({ displayName, uid, photoURL, followers }, i) => (
                    <UserCard
                        key={uid}
                        uid={uid}
                        displayName={displayName}
                        photoURL={photoURL}
                        followers={followers}
                        currentUserUid={currentUser?.uid as string}
                        ref={i === users.length - 1 ? lastUserRef : null}
                    />
                ))}
            </UsersWrapper>
            {loading && <Spinner />}
        </>
    )
}

export default RecomendationsPage
