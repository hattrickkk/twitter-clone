import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { Main, Wrapper } from './styled'
import { NavPanel } from '../navPanel'
import { SideBar } from '../sideBar'
import { Container } from '@/styles/common'
import { Flex } from '@/styles/flexStyles'

export const Layout = () => {
    return (
        <Wrapper>
            <Container>
                <Flex>
                    <NavPanel />
                    <Main>
                        <Suspense>
                            <Outlet />
                        </Suspense>
                    </Main>

                    <SideBar />
                </Flex>
            </Container>
        </Wrapper>
    )
}
