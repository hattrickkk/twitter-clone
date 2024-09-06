import { lazy } from 'react'

import * as path from './paths'

const landingPage = lazy(() => import('@/pages/landinPage'))
const signUpPage = lazy(() => import('@/pages/signUpPage'))
const logInPage = lazy(() => import('@/pages/logInPage'))
const homePage = lazy(() => import('@/pages/homePage'))
const profilePage = lazy(() => import('@/pages/profilePage'))
const recomendationsPage = lazy(() => import('@/pages/recomendationsPage'))
const notFoundPage = lazy(() => import('@/pages/notFoundPage'))

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
    {
        path: path.NOT_FOUND,
        component: notFoundPage,
    },
]

export const PRIVATE_ROUTES = [
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
        path: path.PROFILE_WITH_PARAM,
        component: profilePage,
    },
    {
        path: path.RECOMENDATIONS,
        component: recomendationsPage,
    },
]
