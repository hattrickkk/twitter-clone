import { NOTIFICATION_KEY } from '@/constants/magicValues'
import { Status } from '@/constants/responseStatus'

export const setNotification = (message: string, status: Status) => {
    localStorage.setItem(NOTIFICATION_KEY, JSON.stringify({ message, status }))
}
