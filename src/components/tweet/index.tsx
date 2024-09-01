import { forwardRef, memo, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import defaultAvatar from '@/assets/avatar.svg'
import { Messages } from '@/constants/messages'
import { Status } from '@/constants/responseStatus'
import type { TweetDoc } from '@/customTypes/tweet'
import { selectUser } from '@/store/selectors'
import { setNotification } from '@/store/slices/notificationSlice'
import { updateTweets } from '@/store/slices/tweetsSlice'
import { Flex } from '@/styles/flexStyles'
import { Like } from '@/ui/like'
import { MoreIcon } from '@/ui/moreIcon'
import { deleteTweetDoc, updateTweetLikes } from '@/utils/firebase/tweet'
import { hasLikedByUser, updateUserLikedTweetsList } from '@/utils/firebase/user'
import { getTweetTime } from '@/utils/getTweetTime'
import { useOpenState } from '@/utils/hooks/useOpenState'
import { useOutsideClick } from '@/utils/hooks/useOutsideClick'
import { useTweetInfo } from '@/utils/hooks/useTweetInfo'

import {
    AvatarImage,
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
} from './styled'

type Props = {
    tweet: TweetDoc
}

export const Tweet = memo(
    forwardRef<HTMLDivElement, Props>(({ tweet: { images, userId, text, likes, tweetId, created } }, ref) => {
        const { userInfo, tweetPictures } = useTweetInfo(userId, images)
        const currentUser = useSelector(selectUser)
        const dispatch = useDispatch()

        const [isOpen, close, open] = useOpenState()
        const [isLiked, setIsLiked] = useState(false)
        const [isSubmitting, setIsSubmiting] = useState(false)
        const [likesCount, setLikesCount] = useState(likes.length)
        const tweetTime = getTweetTime(created)

        const handleLikeClick = useCallback(async () => {
            setIsLiked(prev => !prev)
            setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
            if (currentUser) {
                await updateUserLikedTweetsList(currentUser.uid as string, tweetId)
                await updateTweetLikes(tweetId, currentUser?.uid as string, isLiked)
            }
        }, [likesCount, isLiked, likes])

        const handleCopyLink = useCallback(async () => {
            try {
                const tweetURL = `${window.location.origin}/tweet/${tweetId}`
                await navigator.clipboard.writeText(tweetURL)
                dispatch(setNotification({ status: Status.SUCCESS, message: Messages.COPY_LINK_SUCCESS }))
            } catch (error) {
                dispatch(setNotification({ status: Status.FAIL, message: Messages.COPY_LINK_FAIL }))
            } finally {
                close()
            }
        }, [])

        const handleDeleteTweetClick = useCallback(async () => {
            setIsSubmiting(true)
            const response = await deleteTweetDoc(tweetId)
            if (response.status === Status.SUCCESS) {
                dispatch(setNotification({ status: Status.SUCCESS, message: Messages.DELETE_SUCCESS }))
                dispatch(updateTweets())
            } else {
                dispatch(setNotification({ status: Status.FAIL, message: Messages.DELETE_FAIL }))
            }
            close()
            setIsSubmiting(false)
        }, [])

        const contextMenuRef = useRef(null)
        useOutsideClick(contextMenuRef, close)
        const handleViewMoreClick = () => open()

        useEffect(() => {
            if (currentUser) hasLikedByUser(currentUser.uid as string, tweetId).then(res => setIsLiked(res))
        }, [])

        return (
            <Wrapper ref={ref}>
                <AvatarWrapper>
                    <AvatarImage src={userInfo.photoURL ?? defaultAvatar} alt='avatar' />
                </AvatarWrapper>
                <TweetContent>
                    <Header>
                        <Flex $justifycontent='flex-start' $alignitems='center'>
                            <MainTitle>{userInfo.displayName}</MainTitle>
                            <SubTitle>@{userInfo.userName}</SubTitle>
                            <SubTitle>{tweetTime}</SubTitle>
                        </Flex>
                        <IconWrapper onClick={handleViewMoreClick}>
                            <MoreIcon />
                        </IconWrapper>

                        <ContextMenuWrapper ref={contextMenuRef} $isOpen={isOpen}>
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
                            {tweetPictures.map(url => (
                                <PictureWrapper key={url}>
                                    <Picture src={url} alt={'tweet-photo'} $PicturesCount={tweetPictures.length} />
                                </PictureWrapper>
                            ))}
                        </Pictures>
                    )}
                    <Footer>
                        <Flex $justifycontent='flex-start' $alignitems='center' $gap={10}>
                            <Like isLiked={isLiked} onClick={handleLikeClick} />
                            <LikesCount>{likesCount}</LikesCount>
                        </Flex>
                    </Footer>
                </TweetContent>
            </Wrapper>
        )
    })
)
