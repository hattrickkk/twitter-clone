import { Notification } from '@/ui/notification'
import { useNotification } from '@/utils/hooks/useNotification'

const Home = () => {
    const { isNotificationOpen, notificationMessage, notificationStatus } = useNotification()
    return (
        <div>
            <Notification message={notificationMessage} status={notificationStatus} visibility={isNotificationOpen} />
            Home
        </div>
    )
}

export default Home
