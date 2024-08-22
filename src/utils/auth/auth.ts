import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    UserCredential,
} from 'firebase/auth'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'

import { Collections } from '@/constants/fireStoreCollections'
import { InputsNames } from '@/constants/inputsNames'
import { EMAIL_REGEX, PHONE_NUMBER_REGEX } from '@/constants/magicValues'
import { Status } from '@/constants/responseStatus'
import type { UserProfile } from '@/customTypes/user'
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

export const signUp = async ({ email, password, phoneNumber, ...otherData }: UserProfile) => {
    try {
        const q = query(collection(db, Collections.USERS), where(InputsNames.PHONE_NUMBER, '==', phoneNumber))
        const querySnapshot = await getDocs(q)
        if (!querySnapshot.empty) throw new Error('Phone number is already in use')

        const { user } = await createUserWithEmailAndPassword(auth, email as string, password as string)
        await setUserToFireStore(user.uid, { email, phoneNumber, ...otherData })
        const accessToken = await user.getIdToken()
        return { status: Status.SUCCESS, accessToken }
    } catch (error) {
        return { status: Status.FAIL, error: (error as Error).message }
    }
}

export const logIn = async (emailOrPhone: string, password: string) => {
    try {
        let email = ''
        if (EMAIL_REGEX.test(emailOrPhone)) {
            email = emailOrPhone
        } else if (PHONE_NUMBER_REGEX.test(emailOrPhone)) {
            const q = query(collection(db, Collections.USERS), where(InputsNames.PHONE_NUMBER, '==', emailOrPhone))
            const querySnapshot = await getDocs(q)
            if (querySnapshot.empty) throw new Error('There is no user with this phone number')
            email = querySnapshot.docs[0].data().email
        }
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        const accessToken = await user.getIdToken()
        return { status: Status.SUCCESS, accessToken }
    } catch (error) {
        return { status: Status.FAIL, error: (error as Error).message }
    }
}
