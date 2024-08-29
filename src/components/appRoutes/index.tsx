import { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'

import { Layout } from '@/components/layout'
import { HOME } from '@/constants/paths'
import { PRIVATE_ROUTES, ROUTES } from '@/constants/routes'
import { selectUser } from '@/store/selectors'

export const AppRoutes = () => {
    const currentUser = useSelector(selectUser)
    return (
        <Routes>
            {ROUTES.map(({ path, component: Component }) =>
                path === '/' && currentUser ? (
                    <Route key={path} path={path} element={<Navigate to={HOME} replace />} />
                ) : (
                    <Route
                        key={path}
                        path={path}
                        element={
                            <Suspense>
                                <Component />
                            </Suspense>
                        }
                    />
                )
            )}

            {currentUser && (
                <Route path='/' element={<Layout />}>
                    {PRIVATE_ROUTES.map(({ path, component: Component }) => (
                        <Route key={path} path={path} element={<Component />} />
                    ))}
                </Route>
            )}
        </Routes>
    )
}
