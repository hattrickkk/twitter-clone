import { ReactElement, Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { NavPanel } from '@/components/navPanel'
import { SideBar } from '@/components/sideBar'
import { Container } from '@/styles/common'
import { Flex } from '@/styles/flexStyles'
import { Spinner } from '@/ui/spinner'

import { Main, NavWrapper, Wrapper } from './styled'
import ErrorBoundary from '../errorBoundary'

type Props = {
    children?: ReactElement | null
}

export const Layout = ({ children = null }: Props) => {
    return (
        <Wrapper>
            <Suspense fallback={<Spinner />}>
                <ErrorBoundary>
                    <Container>
                        <Flex>
                            <NavWrapper>
                                <NavPanel />
                            </NavWrapper>
                            <Main>
                                {children}
                                <Outlet />
                            </Main>
                            <SideBar />
                        </Flex>
                    </Container>
                </ErrorBoundary>
            </Suspense>
        </Wrapper>
    )
}
