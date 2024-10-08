import { fileTypeFromBuffer } from 'file-type'
import { ChangeEvent, memo, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import defaultAvatar from '@/assets/avatar.svg'
import { Folders } from '@/constants/fireStoreCollections'
import { MAX_TWEET_TEXT_LENGTH } from '@/constants/magicValues'
import { Messages } from '@/constants/messages'
import { Status } from '@/constants/responseStatus'
import { UsersTweetsTypes } from '@/constants/tweets'
import { ImageState } from '@/customTypes/tweet'
import { selectUser } from '@/store/selectors'
import { setNotification } from '@/store/slices/notificationSlice'
import { addTweet } from '@/store/slices/tweetsSlice'
import { Flex } from '@/styles/flexStyles'
import { AddPictureIcon } from '@/ui/addPictureIcon'
import { PrimaryButton } from '@/ui/buttons'
import { uploadPicture } from '@/utils/firebase/pictures'
import { setTweetToFireStore } from '@/utils/firebase/tweet'
import { updateUserTweetsList } from '@/utils/firebase/user'
import { usePictureURL } from '@/utils/hooks/usePictureURL'

import {
    TweetContent,
    Textarea,
    Wrapper,
    TweetContentFooter,
    ButtonWrapper,
    TextAreaWrapper,
    Text,
    AvatarImage,
    AvatarWrapper,
    Picture,
    Pictures,
    PictureWrapper,
    Delete,
} from './styled'

type Props = {
    closePopup?: VoidFunction
    isPopupOpen?: boolean
}

export const WhatsHappening = memo(({ closePopup, isPopupOpen }: Props) => {
    const [value, setValue] = useState('')
    const [images, setImages] = useState<ImageState[]>([])
    const [isSubmitting, setIsSubmiting] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const currentUser = useSelector(selectUser)
    const dispatch = useDispatch()

    const avatar = usePictureURL(currentUser?.photoURL as string)

    useEffect(() => {
        if (!isPopupOpen) {
            setValue('')
            setImages([])
        }
    }, [isPopupOpen])

    const onTextAreaChange = useCallback(
        ({ currentTarget }: ChangeEvent<HTMLTextAreaElement>) => {
            const newValue = currentTarget.value
            if (newValue.length <= MAX_TWEET_TEXT_LENGTH) {
                setValue(newValue)
            }
        },
        [value]
    )

    const handleTwitClick = useCallback(async () => {
        setIsSubmiting(true)
        const tweetPictures = await uploadPicture(
            images.map(img => img.file),
            Folders.TWEETS
        )

        if (currentUser && tweetPictures) {
            const { uid } = currentUser
            const tweet = await setTweetToFireStore({
                text: value,
                images: tweetPictures as string[],
                userId: uid as string,
            })
            const { message, status } = await updateUserTweetsList({ uid: uid as string, tweetId: tweet.tweetId })
            dispatch(setNotification({ message, status }))
            if (status === Status.SUCCESS) {
                setValue('')
                setImages([])
                dispatch(addTweet({ data: tweet, type: UsersTweetsTypes.OWN }))
                closePopup && closePopup()
            }
        }
        setIsSubmiting(false)
    }, [images, value])

    const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const buffer = await file.arrayBuffer()
            const type = await fileTypeFromBuffer(buffer)
            if (type && file.type.startsWith('image/')) {
                const imageUrl = URL.createObjectURL(file)
                setImages(prevImages => [
                    ...prevImages,
                    {
                        path: imageUrl,
                        file,
                    },
                ])
            } else {
                dispatch(setNotification({ status: Status.FAIL, message: Messages.INVALID_FILE_TYPE }))
            }
        }
        e.target.value = ''
    }, [])

    const handleAddFileClick = useCallback(() => {
        if (fileInputRef.current) fileInputRef.current.click()
    }, [])

    const handleImageDeleteClick = useCallback(
        (index: number) => () => {
            setImages(prevImages =>
                prevImages.filter((img, i) => {
                    if (i !== index) return img
                })
            )
        },
        []
    )

    return (
        <Wrapper id='whats-happening-section'>
            <Flex $gap={20}>
                <AvatarWrapper>
                    <AvatarImage src={avatar ?? defaultAvatar} alt='avatar' />
                </AvatarWrapper>
                <TweetContent>
                    <TextAreaWrapper>
                        <Textarea placeholder='What&#39;s happening' onChange={onTextAreaChange} value={value} />
                    </TextAreaWrapper>
                    {images.length > 0 && (
                        <Pictures id='tweet-pictures'>
                            {images.map(({ path }, i) => (
                                <PictureWrapper key={path}>
                                    <Delete onClick={handleImageDeleteClick(i)} />
                                    <Picture src={path} alt='pic' />
                                </PictureWrapper>
                            ))}
                        </Pictures>
                    )}
                    <TweetContentFooter>
                        <Flex $alignitems='center' $gap={15}>
                            <AddPictureIcon
                                disable={images.length > 3}
                                onChange={handleFileChange}
                                onClick={handleAddFileClick}
                                ref={fileInputRef}
                            />
                            <Text $isHighlight={value.length === MAX_TWEET_TEXT_LENGTH}>
                                {value.length}/{MAX_TWEET_TEXT_LENGTH}
                            </Text>
                            <ButtonWrapper>
                                <PrimaryButton
                                    onClick={handleTwitClick}
                                    disable={value.trim().length === 0 && images.length === 0}
                                    isProcessing={isSubmitting}
                                    data-cy='tweet-button'
                                >
                                    Tweet
                                </PrimaryButton>
                            </ButtonWrapper>
                        </Flex>
                    </TweetContentFooter>
                </TweetContent>
            </Flex>
        </Wrapper>
    )
})
