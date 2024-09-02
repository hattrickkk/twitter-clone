import { memo } from 'react'

import { Flex } from '@/styles/flexStyles'

import { StyledSpinnerWrapper, StyledSpinner } from './styled'

export const Spinner = memo(() => {
    return (
        <StyledSpinnerWrapper>
            <Flex $justifycontent='center'>
                <StyledSpinner />
            </Flex>
        </StyledSpinnerWrapper>
    )
})
