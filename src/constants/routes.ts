import { lazy } from 'react'

import { AUTH, HOME, LOG_IN, SIGN_UP } from './paths'

const landingPage = lazy(() => import('@/pages/landinPage'))
const signUpPage = lazy(() => import('@/pages/signUpPage'))
const logInPage = lazy(() => import('@/pages/logInPage'))
const homePage = lazy(() => import('@/pages/homePage'))

export const ROUTES = [
    {
        path: '/',
        component: landingPage,
    },
    {
        path: AUTH,
        component: landingPage,
    },
    {
        path: SIGN_UP,
        component: signUpPage,
    },
    {
        path: LOG_IN,
        component: logInPage,
    },
    {
        path: HOME,
        component: homePage,
    },
]
