import { memo } from 'react'

import { StyledLike, Wrapper } from './styled'
import { EmptyHeartIcon } from '../emptyHeartIcon'
import { HeartIcon } from '../heartIcon'
type Props = {
    isLiked: boolean
    isSubmiting: boolean
    onClick: VoidFunction
}
export const Like = memo(({ isLiked, onClick, isSubmiting }: Props) => {
    return (
        <Wrapper $isSubmiting={isSubmiting}>
            <StyledLike onClick={onClick} $isSubmiting={isSubmiting}>
                <svg width='17' height='17' viewBox='0 0 21 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    {isLiked ? <HeartIcon /> : <EmptyHeartIcon />}
                </svg>
            </StyledLike>
        </Wrapper>
    )
})
