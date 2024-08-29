import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { ROUTES } from '@/constants/routes'

const AppRoutes = () => {
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
        </Routes>
    )
}

export default AppRoutes
