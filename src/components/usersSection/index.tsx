import { memo } from 'react'
import { Link } from 'react-router-dom'

import { FEW_USERS } from '@/mockData/users'
import { UserCard } from '@/ui/userCard'

import { StyledSection, Title } from './styled'

export const UsersSection = memo(() => {
    return (
        <StyledSection>
            <Title>You might like</Title>
            {FEW_USERS.map(({ name, userName }) => (
                <UserCard key={userName} userName={userName} name={name} />
            ))}
            <Link to={''}>Show more</Link>
        </StyledSection>
    )
})
