import { forwardRef, memo, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import defaultAvatar from '@/assets/avatar.svg'
import { Messages } from '@/constants/messages'
import { Status } from '@/constants/responseStatus'
import { UsersTweetsTypes } from '@/constants/tweets'
import type { TweetDoc } from '@/customTypes/tweet'
import { selectLikedTweets, selectUser } from '@/store/selectors'
import { setNotification } from '@/store/slices/notificationSlice'
import { deleteTweet, handleTweetLiking } from '@/store/slices/tweetsSlice'
import { Image } from '@/styles/common'
import { Flex } from '@/styles/flexStyles'
import { Like } from '@/ui/like'
import { MoreIcon } from '@/ui/moreIcon'
import { deleteTweetDoc, getTweet, updateTweetLikes } from '@/utils/firebase/tweet'
import { hasLikedByUser, updateUserLikedTweetsList } from '@/utils/firebase/user'
import { getTweetTime } from '@/utils/getTweetTime'
import { useOpenState } from '@/utils/hooks/useOpenState'
import { useOutsideClick } from '@/utils/hooks/useOutsideClick'
import { usePictureURL } from '@/utils/hooks/usePictureURL'
import { useTweetInfo } from '@/utils/hooks/useTweetInfo'
import { useViewProfile } from '@/utils/hooks/useViewProfile'

import {
    AvatarWrapper,
    ContextMenuWrapper,
    Footer,
    Header,
    IconWrapper,
    LikesCount,
    MainTitle,
    Menu,
    Picture,
    Pictures,
    PictureWrapper,
    StyledButton,
    SubTitle,
    Text,
    TweetContent,
    Wrapper,
    Time,
} from './styled'

type Props = {
    tweet: TweetDoc
}

export const Tweet = memo(
    forwardRef<HTMLDivElement, Props>(({ tweet: { images, userId, text, likes, tweetId, created } }, ref) => {
        const { userInfo, tweetPictures } = useTweetInfo(userId, images)
        const currentUser = useSelector(selectUser)
        const likedTweets = useSelector(selectLikedTweets)
        const dispatch = useDispatch()

        const [isContextMenuOpen, closeContextMenu, openContextMenu] = useOpenState()
        const [isLiked, setIsLiked] = useState(false)
        const [isSubmitting, setIsSubmiting] = useState(false)
        const [likesCount, setLikesCount] = useState(likes.length)
        const tweetTime = getTweetTime(created)
        const avatarImage = usePictureURL(userInfo.photoURL)

        const handleViewProfile = useViewProfile(userId)

        const handleLikeClick = useCallback(async () => {
            setIsSubmiting(true)
            try {
                await updateUserLikedTweetsList({ uid: currentUser?.uid as string, tweetId })
                await updateTweetLikes({ tweetId, uid: currentUser?.uid as string, isLiked })
                setIsLiked(prev => !prev)
                setLikesCount(prevCount => (isLiked ? prevCount - 1 : prevCount + 1))
                const newLikes = isLiked
                    ? likes.filter(userId => userId !== currentUser?.uid)
                    : [...likes, currentUser?.uid as string]
                dispatch(
                    handleTweetLiking({
                        tweet: {
                            tweetId,
                            userId,
                            likes: newLikes,
                            text,
                            images,
                            created,
                        },
                        isLiked,
                    })
                )
            } catch (error) {
                console.log(error)
            } finally {
                setIsSubmiting(false)
            }
        }, [isLiked, likes])

        const handleCopyLink = useCallback(async () => {
            try {
                const tweetURL = `${window.location.origin}/tweet/${tweetId}`
                await navigator.clipboard.writeText(tweetURL)
                dispatch(setNotification({ status: Status.SUCCESS, message: Messages.COPY_LINK_SUCCESS }))
            } catch (error) {
                dispatch(setNotification({ status: Status.FAIL, message: Messages.COPY_LINK_FAIL }))
            } finally {
                closeContextMenu()
            }
        }, [])

        const handleDeleteTweetClick = useCallback(async () => {
            setIsSubmiting(true)
            const response = await deleteTweetDoc(tweetId)
            if (response.status === Status.SUCCESS) {
                dispatch(setNotification({ status: Status.SUCCESS, message: Messages.DELETE_SUCCESS }))
            } else {
                dispatch(setNotification({ status: Status.FAIL, message: Messages.DELETE_FAIL }))
            }
            dispatch(deleteTweet({ data: tweetId, type: UsersTweetsTypes.OWN }))
            dispatch(deleteTweet({ data: tweetId, type: UsersTweetsTypes.LIKED }))
            closeContextMenu()
            setIsSubmiting(false)
        }, [])

        const contextMenuRef = useRef<HTMLDivElement>(null)
        useOutsideClick(contextMenuRef, closeContextMenu)

        useEffect(() => {
            if (currentUser) hasLikedByUser({ uid: currentUser.uid as string, tweetId }).then(res => setIsLiked(res))
            getTweet(tweetId)
                .then(res => setLikesCount((res as TweetDoc).likes.length))
                .catch(err => console.error(err))
        }, [likedTweets])

        return (
            <Wrapper ref={ref}>
                <AvatarWrapper onClick={handleViewProfile}>
                    <Image src={avatarImage ?? defaultAvatar} alt='avatar' />
                </AvatarWrapper>
                <TweetContent>
                    <Header>
                        <Flex $justifycontent='flex-start' $alignitems='center'>
                            <MainTitle onClick={handleViewProfile}>{userInfo.displayName}</MainTitle>
                            <SubTitle onClick={handleViewProfile}>@{userInfo.userName}</SubTitle>
                            <Time>{tweetTime}</Time>
                        </Flex>
                        <IconWrapper onClick={openContextMenu}>
                            <MoreIcon />
                        </IconWrapper>

                        <ContextMenuWrapper ref={contextMenuRef} $isOpen={isContextMenuOpen}>
                            <Menu>
                                <StyledButton onClick={handleCopyLink}>Copy Link</StyledButton>
                                {currentUser?.uid === userId && (
                                    <StyledButton onClick={handleDeleteTweetClick} $isSubmiting={isSubmitting}>
                                        Delete Tweet
                                    </StyledButton>
                                )}
                            </Menu>
                        </ContextMenuWrapper>
                    </Header>
                    <Text>{text}</Text>
                    {tweetPictures.length > 0 && (
                        <Pictures $PicturesCount={images.length}>
                            {tweetPictures.map((url, i) => (
                                <PictureWrapper key={url + i}>
                                    <Picture src={url} alt={'tweet-photo'} $PicturesCount={tweetPictures.length} />
                                </PictureWrapper>
                            ))}
                        </Pictures>
                    )}
                    <Footer>
                        <Flex $justifycontent='flex-start' $alignitems='center' $gap={10}>
                            <Like isLiked={isLiked} onClick={handleLikeClick} isSubmiting={isSubmitting} />
                            <LikesCount>{likesCount}</LikesCount>
                        </Flex>
                    </Footer>
                </TweetContent>
            </Wrapper>
        )
    })
)
