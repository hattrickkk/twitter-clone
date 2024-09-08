import { memo, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { RECOMENDATIONS, SEARCH_TWEETS, SEARCH_USERS } from '@/constants/paths'
import { TweetDoc } from '@/customTypes/tweet'
import { UserInfoDoc } from '@/customTypes/user'
import { useOutsideClick } from '@/utils/hooks/useOutsideClick'

import { StyledSection, Title } from './styled'
import { SearchedUsers } from '../searchedUsers'
import { SmallTweet } from '../smallTweet'

type Props = {
    items: (TweetDoc | UserInfoDoc)[]
    isSearchOpen: boolean
    closeSearch: VoidFunction
    query: string
}

export const SearchResult = memo(({ items, isSearchOpen, closeSearch, query }: Props) => {
    const searchBlockRef = useRef(null)
    useOutsideClick(searchBlockRef, closeSearch)
    const currentPath = useLocation().pathname

    if (items.length === 0) return null

    return (
        <StyledSection ref={searchBlockRef} $visibility={isSearchOpen}>
            <Title>Search Results</Title>
            {currentPath.includes(RECOMENDATIONS) || currentPath.includes(SEARCH_USERS) ? (
                <SearchedUsers users={items as UserInfoDoc[]} hasFollowButton={false} />
            ) : (
                (items as TweetDoc[]).map(({ tweetId, userId, text }) => (
                    <SmallTweet userId={userId} text={text} tweetId={tweetId} key={tweetId} />
                ))
            )}
            <Link
                to={`${currentPath.includes(SEARCH_USERS) || currentPath.includes(RECOMENDATIONS) ? SEARCH_USERS : SEARCH_TWEETS}/${query}`}
                onClick={closeSearch}
            >
                Show more
            </Link>
        </StyledSection>
    )
})
