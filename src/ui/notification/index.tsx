import { createPortal } from 'react-dom'

import { Icon, StyledNotification, Message } from './styled'
import { Status } from '@/constants/responseStatus'
import { Flex } from '@/styles/flexStyles'

type Props = {
    message: string
    status: Status
    visibility: boolean
}

export const Notification = ({ message, status, visibility }: Props) => {
    return createPortal(
        <StyledNotification className={`${visibility ? 'visible' : 'hidden'}`}>
            <Flex $gap={10}>
                <Icon $isFailed={status === Status.FAIL}> {status === Status.FAIL ? '✘' : '✔'}</Icon>
                <Message>{message} </Message>
            </Flex>
        </StyledNotification>,
        document.body
    )
}
