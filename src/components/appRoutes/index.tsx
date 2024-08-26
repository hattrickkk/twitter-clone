import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Layout } from '@/components/layout'
import { PRIVATE_ROUTES, ROUTES } from '@/constants/routes'

const AppRoutes = () => {
    const isAuth = true
    return (
        <Routes>
            {ROUTES.map(({ path, component: Component }) => (
                <Route
                    key={path}
                    path={path}
                    element={
                        <Suspense>
                            <Component />
                        </Suspense>
                    }
                />
            ))}
            {isAuth && (
                <Route path='/' element={<Layout />}>
                    {PRIVATE_ROUTES.map(({ path, component: Component }) => (
                        <Route key={path} path={path} element={<Component />} />
                    ))}
                </Route>
            )}
        </Routes>
    )
}

export default AppRoutes
