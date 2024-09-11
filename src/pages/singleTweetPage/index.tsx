import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { Header } from '@/components/header'
import { Layout } from '@/components/layout'
import { Tweet } from '@/components/tweet'
import { TweetDoc } from '@/customTypes/tweet'
import { selectUser } from '@/store/selectors'
import { Container } from '@/styles/common'
import { Spinner } from '@/ui/spinner'
import { getTweet } from '@/utils/firebase/tweet'

import { Title, TweetWrapper } from './styled'

const SingleTweetPage = () => {
    const { tweetId } = useParams()
    const [tweet, setTweet] = useState({} as TweetDoc)

    const currentUser = useSelector(selectUser)

    useEffect(() => {
        getTweet(tweetId as string).then(res => setTweet(res as TweetDoc))
    }, [tweetId])

    if (isEmpty(tweet)) return <Spinner />

    return (
        <Container>
            {currentUser ? (
                <Layout>
                    <>
                        <Header />
                        <Tweet tweet={tweet} />
                    </>
                </Layout>
            ) : (
                <>
                    <TweetWrapper>
                        <Tweet tweet={tweet} />
                    </TweetWrapper>
                    <Title>
                        Like content? <Link to={'/'}>Sign up!</Link>{' '}
                    </Title>
                </>
            )}
        </Container>
    )
}

export default SingleTweetPage
