import { ChangeEvent, memo, useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { RECOMENDATIONS, SEARCH_TWEETS, SEARCH_USERS } from '@/constants/paths'
import { TweetDoc } from '@/customTypes/tweet'
import { UserInfoDoc } from '@/customTypes/user'
import { LoupeIcon } from '@/ui/loupeIcon'
import { searchTweets, searchUsers } from '@/utils/firebase/search'
import { useDebounce } from '@/utils/hooks/useDebounce'
import { useOpenState } from '@/utils/hooks/useOpenState'

import { InputWrapper, SearchInput } from './styled'
import { SearchResult } from '../searchResults'

export const Search = memo(() => {
    const currentLocation = useLocation().pathname
    const [value, setValue] = useState('')
    const [searchResults, setSearchResults] = useState<TweetDoc[] | UserInfoDoc[]>([])
    const [isSearchOpen, closeSearch, openSearch] = useOpenState()
    const debouncedValue = useDebounce(value, 500)

    const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }, [])

    useEffect(() => {
        if (currentLocation.includes(RECOMENDATIONS) || currentLocation.includes(SEARCH_USERS)) {
            searchUsers(debouncedValue).then(res => {
                setSearchResults((res as UserInfoDoc[]).slice(0, 2))
            })
        } else {
            searchTweets(debouncedValue).then(res => {
                setSearchResults((res as TweetDoc[]).slice(0, 2))
            })
        }
    }, [debouncedValue, currentLocation])

    useEffect(() => {
        if (!(currentLocation.includes(SEARCH_USERS) || currentLocation.includes(SEARCH_TWEETS))) {
            setValue('')
        }
    }, [currentLocation])

    return (
        <div>
            <InputWrapper>
                <SearchInput
                    placeholder={`Search ${currentLocation.includes(RECOMENDATIONS) || currentLocation.includes(SEARCH_USERS) ? 'users' : 'tweets'}`}
                    value={value}
                    onChange={handleOnChange}
                    onClick={openSearch}
                />
                <LoupeIcon />

                <SearchResult
                    items={searchResults}
                    isSearchOpen={isSearchOpen}
                    closeSearch={closeSearch}
                    query={debouncedValue}
                />
            </InputWrapper>
        </div>
    )
})
