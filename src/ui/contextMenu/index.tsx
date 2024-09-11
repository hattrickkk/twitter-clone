import { memo } from 'react'
import { Link } from 'react-router-dom'

import * as paths from '@/constants/paths'

import { Item, Menu, Text } from './styled'

type Item = {
    title: string
    path?: string
    Icon?: () => JSX.Element
}

type Props = {
    items: Item[]
    closeContextMenu: VoidFunction
    hasToolBar?: boolean
}
export const ContextMenu = memo(({ items, hasToolBar = false, closeContextMenu }: Props) => {
    return (
        <Menu $hasToolbar={hasToolBar}>
            {items.map(({ title, path, Icon }) => (
                <Item key={path}>
                    <Link to={path ?? paths.HOME} onClick={closeContextMenu}>
                        {Icon && <Icon />}
                        <Text>{title}</Text>
                    </Link>
                </Item>
            ))}
        </Menu>
    )
})
