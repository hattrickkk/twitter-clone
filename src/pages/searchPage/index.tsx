import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import { Header } from '@/components/header'
import { Search } from '@/components/search'
import { SearchedTweets } from '@/components/searchedTweets'
import { SearchedUsers } from '@/components/searchedUsers'
import { RECOMENDATIONS, SEARCH_TWEETS, SEARCH_USERS } from '@/constants/paths'
import { TweetDoc } from '@/customTypes/tweet'
import { UserInfoDoc } from '@/customTypes/user'
import { searchTweets, searchUsers } from '@/utils/firebase/search'

import { SearchWrapper, Wrapper } from './styled'

const SearchPage = () => {
    const currentLocation = useLocation().pathname
    const { query } = useParams()

    const [searchResults, setSearchResults] = useState<TweetDoc[] | UserInfoDoc[]>([])

    useEffect(() => {
        if (currentLocation.includes(RECOMENDATIONS) || currentLocation.includes(SEARCH_USERS)) {
            searchUsers(query as string)
                .then(res => {
                    setSearchResults((res as UserInfoDoc[]).slice(0, 2))
                })
                .catch(err => console.error(err))
        } else {
            searchTweets(query as string)
                .then(res => {
                    setSearchResults((res as TweetDoc[]).slice(0, 2))
                })
                .catch(err => console.error(err))
        }
    }, [query])

    return (
        <Wrapper>
            <Header />
            <SearchWrapper>
                <Search />
            </SearchWrapper>
            {currentLocation.includes(SEARCH_USERS) || currentLocation.includes(RECOMENDATIONS) ? (
                <SearchedUsers users={searchResults as UserInfoDoc[]} hasFollowButton={false} />
            ) : (
                <SearchedTweets tweets={searchResults as TweetDoc[]} />
            )}
        </Wrapper>
    )
}

export default SearchPage
