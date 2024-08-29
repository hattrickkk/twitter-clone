import { bindActionCreators } from '@reduxjs/toolkit'
import { memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Input, Label, SwitcherBody, SwitcherButton } from './styled'
import { ThemeMode } from '@/constants/theme'
import { selectTheme } from '@/store/selectors'
import { setDarkTheme, setLightTheme } from '@/store/slices/themeSlice'

export const ThemeSwitcher = memo(() => {
    const dispatch = useDispatch()
    const theme = useSelector(selectTheme)
    const actions = bindActionCreators({ setDarkTheme, setLightTheme }, dispatch)

    const switcherClickHandler = useCallback(() => {
        theme === ThemeMode.dark ? actions.setLightTheme() : actions.setDarkTheme()
    }, [theme])

    return (
        <Label htmlFor='themeSwitcher' id='themeLabel'>
            <Input
                onClick={switcherClickHandler}
                type='checkbox'
                id='themeSwitcher'
                defaultChecked={theme === ThemeMode.dark}
            />
            <SwitcherBody />
            <SwitcherButton />
        </Label>
    )
})
