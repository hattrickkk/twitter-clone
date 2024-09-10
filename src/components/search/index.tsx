import { ChangeEvent, memo, ReactElement, useCallback, useEffect, useRef, useState } from 'react'

import { RECOMENDATIONS, SEARCH_TWEETS, SEARCH_USERS } from '@/constants/paths'
import { LoupeIcon } from '@/ui/loupeIcon'
import { useDebounce } from '@/utils/hooks/useDebounce'
import { useOpenState } from '@/utils/hooks/useOpenState'
import { useOutsideClick } from '@/utils/hooks/useOutsideClick'

import { InputWrapper, SearchInput } from './styled'
import { SearchResult } from '../searchResults'

type Props<T> = {
    placeholder: string
    currentPath: string
    searchFunction: (query: string) => Promise<T[] | undefined>
    renderResults: (results: T[]) => ReactElement
}

export const Search = memo(
    <T extends object>({ placeholder, searchFunction, renderResults, currentPath }: Props<T>) => {
        const [value, setValue] = useState('')
        const [searchResults, setSearchResults] = useState<T[]>([])
        const debouncedValue = useDebounce(value, 500)
        const [isSearchOpen, closeSearch, openSearch] = useOpenState()

        const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            setValue(e.currentTarget.value)
        }, [])

        useEffect(() => {
            searchFunction(debouncedValue)
                .then(res => setSearchResults(res as T[]))
                .catch(err => console.error(err))
        }, [debouncedValue])

        useEffect(() => {
            if (!(currentPath.includes(SEARCH_USERS) || currentPath.includes(SEARCH_TWEETS))) {
                setValue('')
            }
        }, [currentPath])

        const searchBlockRef = useRef<HTMLDivElement>(null)
        useOutsideClick(searchBlockRef, closeSearch)

        return (
            <InputWrapper>
                <SearchInput placeholder={placeholder} value={value} onChange={handleOnChange} onClick={openSearch} />
                <LoupeIcon />
                {searchResults.length > 0 && (
                    <SearchResult
                        isSearchOpen={isSearchOpen}
                        closeSearch={closeSearch}
                        ref={searchBlockRef}
                        linkTo={`/${currentPath.includes(SEARCH_USERS) || currentPath.includes(RECOMENDATIONS) ? SEARCH_USERS : SEARCH_TWEETS}/${debouncedValue}`}
                    >
                        {renderResults(searchResults)}
                    </SearchResult>
                )}
            </InputWrapper>
        )
    }
)
