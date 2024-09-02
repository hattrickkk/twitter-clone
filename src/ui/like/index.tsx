import { memo } from 'react'

import { StyledLike } from './styled'
import { EmptyHeartIcon } from '../emptyHeartIcon'
import { HeartIcon } from '../heartIcon'
type Props = {
    isLiked: boolean
    onClick: VoidFunction
}
export const Like = memo(({ isLiked, onClick }: Props) => {
    return (
        <StyledLike onClick={onClick}>
            <svg width='17' height='17' viewBox='0 0 21 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
                {isLiked ? <HeartIcon /> : <EmptyHeartIcon />}
            </svg>
        </StyledLike>
    )
})
