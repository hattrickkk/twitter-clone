import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'

import { Icon, StyledNotification, Message } from './styled'
import { Status } from '@/constants/responseStatus'
import { selectNotification } from '@/store/selectors'
import { Flex } from '@/styles/flexStyles'

export const Notification = () => {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false)
    const notification = useSelector(selectNotification)

    useEffect(() => {
        if (notification.message) {
            setIsNotificationOpen(true)
            setTimeout(() => {
                setIsNotificationOpen(false)
            }, 3000)
        }
    }, [notification])

    return createPortal(
        <StyledNotification className={`${isNotificationOpen ? 'visible' : 'hidden'}`}>
            <Flex $gap={10}>
                <Icon $isFailed={notification.status === Status.FAIL}>
                    {notification.status === Status.FAIL ? '✘' : '✔'}
                </Icon>
                <Message>{notification.message} </Message>
            </Flex>
        </StyledNotification>,

        document.body
    )
}
