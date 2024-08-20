import React, { memo, useCallback, useEffect, useRef, useState } from 'react'

import { Content, ContentWrapper, Field, Item, StyledDropdown } from './styled'
import { DropdownTypes } from '@/constants/magicValues'
import { useOpenState } from '@/utils/hooks/useOpenState'
import { useOutsideClick } from '@/utils/hooks/useOutsideClick'

type Props = {
    placeholder: string
    items: (string | number)[]
    setSelectedMonth?: React.Dispatch<React.SetStateAction<string>>
    setSelectedYear?: React.Dispatch<React.SetStateAction<number>>
}

export const Dropdown = memo(({ placeholder, items, setSelectedMonth, setSelectedYear }: Props) => {
    const [value, setValue] = useState(placeholder)
    const [isOpen, close, open] = useOpenState()

    const handleClickField = useCallback(() => (isOpen ? close() : open()), [isOpen])

    const handleItemClick = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
        const text = e.currentTarget.textContent as string
        setValue(text)
        close()
        placeholder === DropdownTypes.MONTH && setSelectedMonth && setSelectedMonth(text)
        placeholder === DropdownTypes.YEAR && setSelectedYear && setSelectedYear(+text)
    }, [])

    useEffect(() => {
        if (placeholder === DropdownTypes.DAY && value > items[items.length - 1]) {
            setValue(items[items.length - 1].toString())
        }
    }, [items])

    const dropdownRef = useRef(null)
    useOutsideClick(dropdownRef, close)

    return (
        <StyledDropdown ref={dropdownRef}>
            <ContentWrapper $isOpen={isOpen}>
                <Content>
                    {items.map(item => (
                        <Item key={item} onClick={handleItemClick}>
                            {item}
                        </Item>
                    ))}
                </Content>
            </ContentWrapper>

            <Field $isOpen={isOpen} onClick={handleClickField}>
                {value}
            </Field>
        </StyledDropdown>
    )
})
