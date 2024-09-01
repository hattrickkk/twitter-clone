import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { NavPanel } from '@/components/navPanel'
import { SideBar } from '@/components/sideBar'
import { Container } from '@/styles/common'
import { Flex } from '@/styles/flexStyles'
import { Spinner } from '@/ui/spinner'

import { Main, Wrapper } from './styled'

export const Layout = () => {
    return (
        <Wrapper>
            <Suspense fallback={<Spinner />}>
                <Container>
                    <Flex>
                        <NavPanel />
                        <Main>
                            <Outlet />
                        </Main>
                        <SideBar />
                    </Flex>
                </Container>
            </Suspense>
        </Wrapper>
    )
}
