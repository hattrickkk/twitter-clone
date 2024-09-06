import React, { memo, useMemo } from 'react'

import { DropdownTypes } from '@/constants/dropdownTypes'
import { MONTHS } from '@/constants/month'
import { DropdownsValues } from '@/customTypes/form'
import { Dropdown } from '@/ui/dropdown'
import { getDays } from '@/utils/getDays'
import { getYears } from '@/utils/getYears'

import { DropdownsWrapper } from './stylesd'

type Props = {
    dropdownsValues: DropdownsValues
    setDropdownValues: React.Dispatch<React.SetStateAction<DropdownsValues>>
    birthDate?: string | null
    disable?: boolean
}

export const DropdownsGroup = memo(
    ({ dropdownsValues, setDropdownValues, birthDate = null, disable = false }: Props) => {
        const years: number[] = useMemo(getYears, [])
        const days: number[] = useMemo(
            () =>
                getDays(
                    isNaN(+dropdownsValues.month.value)
                        ? dropdownsValues.month.value.toString()
                        : MONTHS[+dropdownsValues.month.value - 1],
                    dropdownsValues.year.value as number
                ),
            [dropdownsValues]
        )

        const [day, month, year] = birthDate?.split('/') || Array(3).fill(null)

        return (
            <DropdownsWrapper $disable={disable}>
                <Dropdown
                    placeholder={DropdownTypes.MONTH}
                    selectedValue={month}
                    items={MONTHS}
                    setDropdownValues={setDropdownValues}
                />
                <Dropdown
                    placeholder={DropdownTypes.DAY}
                    selectedValue={day}
                    items={days}
                    setDropdownValues={setDropdownValues}
                />
                <Dropdown
                    placeholder={DropdownTypes.YEAR}
                    selectedValue={year}
                    items={years}
                    setDropdownValues={setDropdownValues}
                />
            </DropdownsWrapper>
        )
    }
)
