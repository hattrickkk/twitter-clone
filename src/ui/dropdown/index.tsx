import React, { memo, useCallback, useEffect, useRef, useState } from 'react'

import { DropdownTypes } from '@/constants/dropdownTypes'
import { MONTHS } from '@/constants/month'
import type { DropdownsValues } from '@/customTypes/form'
import { useOpenState } from '@/utils/hooks/useOpenState'
import { useOutsideClick } from '@/utils/hooks/useOutsideClick'

import { Content, ContentWrapper, Field, Item, StyledDropdown } from './styled'

type Props = {
    placeholder: string
    selectedValue?: string | null
    items: (string | number)[]
    setDropdownValues: React.Dispatch<React.SetStateAction<DropdownsValues>>
}

export const Dropdown = memo(({ placeholder, items, setDropdownValues, selectedValue = null }: Props) => {
    const [value, setValue] = useState(placeholder)
    const [isOpen, close, open] = useOpenState()

    const handleClickField = useCallback(() => (isOpen ? close() : open()), [isOpen])

    const handleItemClick = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
        const text = e.currentTarget.textContent as string
        setValue(text)
        close()
        setDropdownValues(prevValues => {
            return {
                ...prevValues,
                [placeholder.toLowerCase()]: {
                    isSelected: true,
                    value: placeholder === DropdownTypes.MONTH ? text : +text,
                },
            }
        })
    }, [])

    useEffect(() => {
        if (selectedValue) setValue(placeholder === 'Month' ? MONTHS[+selectedValue - 1] : selectedValue)
    }, [selectedValue])

    useEffect(() => {
        if (placeholder === DropdownTypes.DAY && value > items[items.length - 1]) {
            setValue(items[items.length - 1].toString())
        }
    }, [items])

    const dropdownRef = useRef(null)
    useOutsideClick(dropdownRef, close)

    return (
        <StyledDropdown ref={dropdownRef} data-cy='dropdown'>
            <ContentWrapper $isOpen={isOpen}>
                <Content>
                    {items.map(item => (
                        <Item key={item} onClick={handleItemClick}>
                            {item}
                        </Item>
                    ))}
                </Content>
            </ContentWrapper>

            <Field $isOpen={isOpen} onClick={handleClickField} id='dropdown-field'>
                {value}
            </Field>
        </StyledDropdown>
    )
})
