import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import defaultAvatar from '@/assets/avatar.svg'
import { Messages } from '@/constants/messages'
import { PROFILE } from '@/constants/paths'
import { Status } from '@/constants/responseStatus'
import type { TweetDoc } from '@/customTypes/tweet'
import { selectUser } from '@/store/selectors'
import { setNotification } from '@/store/slices/notificationSlice'
import { Flex } from '@/styles/flexStyles'
import { Like } from '@/ui/like'
import { MoreIcon } from '@/ui/moreIcon'
import { updateTweetLikes } from '@/utils/firebase/tweet'
import { hasLikedByUser, updateUserLikedTweetsList } from '@/utils/firebase/user'
import { getTweetTime } from '@/utils/getTweetTime'
import { useOpenState } from '@/utils/hooks/useOpenState'
import { useOutsideClick } from '@/utils/hooks/useOutsideClick'
import { useTweetInfo } from '@/utils/hooks/useTweetInfo'

import {
    AvatarImage,
    AvatarWrapper,
    Button,
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
    SubTitle,
    Text,
    TweetContent,
    Wrapper,
} from './styled'

type Props = {
    tweet: TweetDoc
}

export const Tweet = memo(({ tweet: { images, userId, text, likes, tweetId, created } }: Props) => {
    const { userInfo, tweetPictures } = useTweetInfo(userId, images)
    const currentUser = useSelector(selectUser)
    const dispatch = useDispatch()
    const currentPath = useLocation().pathname

    const [isOpen, close, open] = useOpenState()
    const [isLiked, setIsLiked] = useState(false)
    const [likesCount, setLikesCount] = useState(likes)
    const tweetTime = getTweetTime(created)

    const handleLikeClick = useCallback(async () => {
        setIsLiked(prev => !prev)
        setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
        if (currentUser) await updateUserLikedTweetsList(currentUser.uid as string, tweetId)
        await updateTweetLikes(tweetId, isLiked ? likesCount - 1 : likesCount + 1)
    }, [likesCount, isLiked])

    const handleCopyLink = useCallback(() => {
        const tweetURL = `${window.location.origin}/tweet/${tweetId}`
        navigator.clipboard
            .writeText(tweetURL)
            .then(() => {
                dispatch(setNotification({ status: Status.SUCCESS, message: Messages.COPY_LINK_SUCCESS }))
            })
            .catch(() => {
                dispatch(setNotification({ status: Status.FAIL, message: Messages.COPY_LINK_FAIL }))
            })

        close()
    }, [])

    const contextMenuRef = useRef(null)
    useOutsideClick(contextMenuRef, close)
    const handleViewMoreClick = () => open()

    useEffect(() => {
        if (currentUser) hasLikedByUser(currentUser.uid as string, tweetId).then(res => setIsLiked(res))
    }, [])

    return (
        <Wrapper>
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
                            <Button onClick={handleCopyLink}>Copy Link</Button>
                            {currentPath.includes(PROFILE) && <Button>Delete Tweet</Button>}
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
