import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore'
import { useState, useEffect, useCallback, useRef } from 'react'

import { OBSERVER_OPTIONS } from '@/constants/magicValues'
import { UserInfoDoc } from '@/customTypes/user'

import { concatUsers } from '../concatUsers'
import { getUsersExceptCurrent } from '../firebase/user'

export const useLoadUsers = (currentUserUid: string) => {
    const [users, setUsers] = useState<UserInfoDoc[]>([])
    const [lastUser, setLastUser] = useState<QueryDocumentSnapshot<DocumentData, DocumentData> | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const unsubscribe = loadUsers()
        return () => unsubscribe()
    }, [])

    const loadUsers = useCallback(() => {
        setLoading(true)
        return getUsersExceptCurrent(
            currentUserUid,
            lastUser,
            (users: UserInfoDoc[], last: QueryDocumentSnapshot<DocumentData, DocumentData> | null) => {
                setUsers(prevUsers => {
                    if (!lastUser) return users
                    const uniqueUsers = concatUsers(users, prevUsers)
                    return uniqueUsers
                })
                setLastUser(last)
                setLoading(false)
            }
        )
    }, [lastUser])

    const observer = useRef<IntersectionObserver | null>(null)

    const intersectionObserverCallback = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const entry = entries[0]
            if (entry.isIntersecting && lastUser) loadUsers()
        },
        [lastUser]
    )

    const lastUserRef = useCallback(
        (node: HTMLDivElement) => {
            if (loading) return
            if (observer.current) observer.current.disconnect()
            observer.current = new IntersectionObserver(intersectionObserverCallback, OBSERVER_OPTIONS)
            if (node) observer.current.observe(node)
        },
        [loading, lastUser]
    )

    return { users, lastUserRef, loading }
}
