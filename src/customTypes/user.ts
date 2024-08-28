export type UserProfile = {
    email: string | null
    displayName: string | null
    password?: string | null
    birthDate?: string | null
    phoneNumber?: string | null
    photoURL?: string | null
    uid?: string | null
}

export type RequiredUser = Required<Pick<UserProfile, 'uid' | 'photoURL' | 'displayName'>>
