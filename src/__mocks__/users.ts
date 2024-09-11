import type { UserInfoDoc } from '../customTypes/user'

const baseUser = {
    tweets: [],
    likedTweets: [],
    banner: null,
    photoURL: null,
    phoneNumber: '+375121211212',
    birthDate: '31/1/2020',
    description: 'some description',
    followers: [],
    following: [],
    uid: 'v6tXNQUfeQY8Ct0MIaKqeBnCzFD2',
    userName: 'v6tXNQUfeQY8Ct0MIaKqeBnCzFD2',
    displayName: 'some Name',
}

export const user1: UserInfoDoc = {
    ...baseUser,
    followers: ['zE2nToRtKZaqPMDp18Wj3o1yVBD2'],
}

export const user2: UserInfoDoc = {
    ...baseUser,
    uid: 'zE2nToRtKZaqPMDp18Wj3o1yVBD2',
    phoneNumber: '+375121211212',
}

export const user3: UserInfoDoc = {
    ...baseUser,
    displayName: 'darya',
}

export const user4: UserInfoDoc = {
    ...baseUser,
    followers: ['zE2nToRtKZaqPMDp18Wj3o1yVBD2'],
}
