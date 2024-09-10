import { forwardRef, memo, ReactElement } from 'react'
import { Link } from 'react-router-dom'

import { StyledSection, Title } from './styled'

type Props = {
    isSearchOpen: boolean
    closeSearch: VoidFunction
    linkTo: string
    children: ReactElement
}

export const SearchResult = memo(
    forwardRef<HTMLElement, Props>(({ isSearchOpen, closeSearch, linkTo, children }, ref) => {
        return (
            <StyledSection ref={ref} $visibility={isSearchOpen}>
                <Title>Search Results</Title>
                {children}
                <Link to={linkTo} onClick={closeSearch} data-cy='show-more-search'>
                    Show more
                </Link>
            </StyledSection>
        )
    })
)
