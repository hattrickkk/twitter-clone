import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { NavPanel } from '@/components/navPanel'
import { SideBar } from '@/components/sideBar'
import { Container } from '@/styles/common'
import { Flex } from '@/styles/flexStyles'

import { Main, Wrapper } from './styled'

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
