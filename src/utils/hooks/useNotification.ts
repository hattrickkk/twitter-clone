import { useState, useEffect } from 'react'

import { NOTIFICATION_KEY } from '@/constants/magicValues'
import { Status } from '@/constants/responseStatus'

type ReturnType = {
    isNotificationOpen: boolean
    notificationMessage: string
    notificationStatus: Status
}

export const useNotification = (): ReturnType => {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false)
    const [notificationMessage, setnNotificationMessage] = useState('')
    const [notificationStatus, setnNotificationStatus] = useState(Status.SUCCESS)

    useEffect(() => {
        const notificationFromLocalStorage = localStorage.getItem(NOTIFICATION_KEY)
        if (notificationFromLocalStorage) {
            const { message, status } = JSON.parse(notificationFromLocalStorage)
            setnNotificationMessage(message)
            setnNotificationStatus(status === Status.SUCCESS ? Status.SUCCESS : Status.FAIL)
            setIsNotificationOpen(true)

            setTimeout(() => {
                setIsNotificationOpen(false)
            }, 3000)
            localStorage.removeItem(NOTIFICATION_KEY)
        }
    }, [])

    return { isNotificationOpen, notificationMessage, notificationStatus }
}
