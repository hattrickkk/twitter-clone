import { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Status } from '@/constants/responseStatus'
import { UsersTweetsTypes } from '@/constants/tweets'
import { TweetDoc } from '@/customTypes/tweet'
import { selectLikedTweets, selectOwnTweets, selectUser } from '@/store/selectors'
import { setTweets } from '@/store/slices/tweetsSlice'
import { Flex } from '@/styles/flexStyles'
import { Spinner } from '@/ui/spinner'
import { getUsersTweets } from '@/utils/firebase/tweet'

import { Tab, TabContent, UserstweetsSection } from './styled'
import { Tweet } from '../tweet'

type Props = {
    userId: string
}
export const UserTweets = memo(({ userId }: Props) => {
    const [tab, setTab] = useState(UsersTweetsTypes.OWN)
    const [loading, setLoading] = useState(false)
    const currentUser = useSelector(selectUser)
    const likedTweets = useSelector(selectLikedTweets)
    const ownTweets = useSelector(selectOwnTweets)
    const dispatch = useDispatch()

    const handleTabClik = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setTab(e.currentTarget.dataset.type as UsersTweetsTypes)
    }, [])

    useEffect(() => {
        setLoading(true)
        getUsersTweets(userId, UsersTweetsTypes.OWN).then(({ status, tweets }) => {
            if (status === Status.SUCCESS) {
                dispatch(setTweets({ data: (tweets as TweetDoc[]).reverse(), type: UsersTweetsTypes.OWN }))
                setLoading(false)
            }
        })

        if (currentUser && userId === currentUser.uid) {
            getUsersTweets(currentUser.uid as string, UsersTweetsTypes.LIKED).then(({ status, tweets }) => {
                if (status === Status.SUCCESS) {
                    dispatch(
                        setTweets({
                            data: (tweets as TweetDoc[]).reverse(),
                            type: UsersTweetsTypes.LIKED,
                        })
                    )
                }
                setLoading(false)
            })
        }
        if (currentUser && userId !== currentUser.uid) setTab(UsersTweetsTypes.OWN)
    }, [userId])

    if (loading) return <Spinner />

    return (
        <UserstweetsSection>
            <Flex>
                <Tab data-type={UsersTweetsTypes.OWN} onClick={handleTabClik} $active={tab === UsersTweetsTypes.OWN}>
                    Tweets
                </Tab>
                {currentUser && userId === currentUser.uid && (
                    <Tab
                        data-type={UsersTweetsTypes.LIKED}
                        onClick={handleTabClik}
                        $active={tab === UsersTweetsTypes.LIKED}
                    >
                        Liked Tweets
                    </Tab>
                )}
            </Flex>

            <TabContent $visibility={tab === UsersTweetsTypes.OWN}>
                {ownTweets.map((tweet, i) => (
                    <Tweet key={tweet.tweetId} tweet={tweet} />
                ))}
            </TabContent>

            {currentUser && userId === currentUser.uid && (
                <TabContent $visibility={tab === UsersTweetsTypes.LIKED}>
                    {likedTweets.map((tweet, i) => (
                        <Tweet key={tweet.tweetId} tweet={tweet} />
                    ))}
                </TabContent>
            )}
        </UserstweetsSection>
    )
})
