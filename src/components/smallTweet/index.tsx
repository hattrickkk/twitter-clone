import { memo, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { UserInfoDoc } from '@/customTypes/user'
import { getUser } from '@/utils/firebase/user'

import { Wrapper, Name, Text } from './styled'

type Props = {
    userId: string
    text: string
    tweetId: string
}

export const SmallTweet = memo(({ userId, text, tweetId }: Props) => {
    const [userInfo, setUserInfo] = useState<UserInfoDoc>({} as UserInfoDoc)
    const navigate = useNavigate()

    useEffect(() => {
        getUser(userId)
            .then(res => setUserInfo(res as UserInfoDoc))
            .catch(err => console.error(err))
    }, [])

    const handleTweetClick = useCallback(() => navigate(`/tweet/${tweetId}`), [tweetId])

    return (
        <Wrapper onClick={handleTweetClick}>
            <Name>{userInfo?.displayName}</Name>
            <Text>{text}</Text>
        </Wrapper>
    )
})
