import { memo } from 'react'
import { Link } from 'react-router-dom'

import { Item, Menu, Text } from './styled'
import * as paths from '@/constants/paths'

type Item = {
    title: string
    path?: string
    Icon?: () => JSX.Element
}

type Props = {
    items: Item[]
    hasToolBar?: boolean
}
export const ContextMenu = memo(({ items, hasToolBar = false }: Props) => {
    return (
        <Menu $hasToolbar={hasToolBar}>
            {items.map(({ title, path, Icon }) => (
                <Item key={path}>
                    <Link to={path ?? paths.HOME}>
                        {Icon && <Icon />}
                        <Text>{title}</Text>
                    </Link>
                </Item>
            ))}
        </Menu>
    )
})
