import { SHORT_MOHTN } from '@/constants/month'
import { dateHelper } from '@/utils/dateHepler'

export const getTweetTime = (created: string) => {
    const createdDate = dateHelper.getDateByString(created)
    const diff = dateHelper.getCurrentDate().getTime() - createdDate.getTime()

    const month = createdDate.getMonth()
    const year = createdDate.getFullYear()
    const day = createdDate.getDay()

    if (diff < 60000) return 'now'
    else if (diff < 3600000) return `${Math.trunc(diff / 60000)}m`
    else if (diff < 86400000) return `${Math.trunc(diff / 3600000)}h`
    else if (createdDate.getFullYear() === dateHelper.getCurrentYear()) {
        return `${day} ${SHORT_MOHTN[month]}`
    } else {
        return `${day} ${SHORT_MOHTN[month]} ${year}`
    }
}
