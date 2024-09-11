export type UserProfile = {
    email: string | null
    displayName: string | null
    password?: string | null
    birthDate?: string | null
    phoneNumber?: string | null
    photoURL?: string | null
    uid?: string | null
    userName?: string | null
}

export type RequiredUser = Required<Pick<UserProfile, 'uid' | 'photoURL' | 'displayName' | 'userName'>>

export type UserInfo = {
    displayName: string
    userName: string
    uid: string
    photoURL: string | null
}

export type UserInfoDoc = UserInfo & {
    uid: string
    tweets: string[]
    likedTweets: string[]
    phoneNumber: string
    birthDate: string
    followers: string[]
    following: string[]
    banner: string | null
    description: string
}
