import { ReactElement } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { HOME } from '@/constants/paths'
import { Flex } from '@/styles/flexStyles'
import { Arrow } from '@/ui/arrow'
import { ThemeSwitcher } from '@/ui/themeSwitcher'

import { NavWrapper, StyledHeader, Title } from './styled'
import { NavPanel } from '../navPanel'

type Props = {
    children?: ReactElement
}

export const Header = ({ children }: Props) => {
    const currentPath = useLocation().pathname
    return (
        <StyledHeader>
            <Flex $alignitems='center' $gap={20}>
                <NavWrapper>
                    <NavPanel />
                </NavWrapper>
                {children ?? (
                    <Link to={`/${HOME}`}>
                        <Flex $justifycontent='flex-start' $alignitems='center' $gap={10}>
                            {currentPath !== `/${HOME}` && <Arrow />}
                            <Title>Home</Title>
                        </Flex>
                    </Link>
                )}
                <ThemeSwitcher />
            </Flex>
        </StyledHeader>
    )
}
