import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    UserCredential,
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

import { Collections } from '@/constants/fireStoreCollections'
import { Status } from '@/constants/responseStatus'
import { auth, db, provider } from '@/firebase'

export const setUserToFireStore = async (uid: string, userData: UserProfile) => {
    const docRef = doc(db, Collections.USERS, uid)
    await setDoc(docRef, {
        ...userData,
        lastLogin: new Date(),
    })
}

export const signInWithGoogle = async () => {
    try {
        const { user }: UserCredential = await signInWithPopup(auth, provider)
        const { phoneNumber, displayName, email, photoURL, uid } = user
        await setUserToFireStore(uid, { phoneNumber, displayName, email, photoURL })
        const accessToken = await user.getIdToken()
        return { status: Status.SUCCESS, accessToken }
    } catch (error) {
        return { status: Status.FAIL, error: (error as Error).message }
    }
}

type UserProfile = {
    email: string | null
    displayName: string | null
    password?: string | null
    birthDate?: string | null
    phoneNumber?: string | null
    photoURL?: string | null
}

export const signUp = async (userData: UserProfile) => {
    try {
        const { user } = await createUserWithEmailAndPassword(
            auth,
            userData.email as string,
            userData.password as string
        )
        await setUserToFireStore(user.uid, userData)
        const accessToken = await user.getIdToken()
        return { status: Status.SUCCESS, accessToken }
    } catch (error) {
        return { status: Status.FAIL, error: (error as Error).message }
    }
}

export const logIn = async (email: string, password: string) => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        const accessToken = await user.getIdToken()
        return { status: Status.SUCCESS, accessToken }
    } catch (error) {
        return { status: Status.FAIL, error: (error as Error).message }
    }
}
