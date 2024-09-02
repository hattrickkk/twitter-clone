import { lazy } from 'react'

import * as path from './paths'

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
        path: path.SIGN_UP,
        component: signUpPage,
    },
    {
        path: path.LOG_IN,
        component: logInPage,
    },
]

export const PRIVATE_ROUTES = [
    {
        path: '/',
        component: homePage,
    },
    {
        path: path.HOME,
        component: homePage,
    },
    {
        path: path.EXPLORE,
        component: homePage,
    },
    {
        path: path.NOTIFICATIONS,
        component: homePage,
    },
    {
        path: path.MESSAGES,
        component: homePage,
    },
    {
        path: path.BOOKMARKS,
        component: homePage,
    },
    {
        path: path.LISTS,
        component: homePage,
    },
    {
        path: path.PROFILE,
        component: homePage,
    },
]
