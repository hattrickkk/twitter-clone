import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { ROUTES } from '@/constants/routes'

const AppRoutes = () => {
    return (
        <Routes>
            {ROUTES.map(el => (
                <Route
                    path={el.path}
                    element={
                        <Suspense>
                            <el.component />
                        </Suspense>
                    }
                />
            ))}
        </Routes>
    )
}

export default AppRoutes
