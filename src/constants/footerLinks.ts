import { COPYRIGHT } from './magicValues'

export const FOOTER_LINKS = [
    { title: 'About', path: '/about' },
    { title: 'Help Center', path: '/help-center' },
    { title: 'Terms of Service', path: '/terms-of-service' },
    { title: 'Privacy Policy', path: '/privacy-policy' },
    { title: 'Cookie Policy', path: '/cookie-policy' },
    { title: 'Ads info', path: '/ads-info' },
    { title: 'Blog', path: '/blog' },
    { title: 'Status', path: '/status' },
    { title: 'Careers', path: '/careers' },
    { title: 'Brand Resources', path: '/brand-resources' },
    { title: 'Advertising', path: '/advertising' },
    { title: 'Marketing', path: '/marketing' },
    { title: 'Twitter for Business', path: '/twitter-for-business' },
    { title: 'Developers', path: '/developers' },
    { title: 'Directory', path: '/directory' },
    { title: 'Settings', path: '/settings' },
    { title: COPYRIGHT },
]

export const SOME_FOOTER_LINKS = FOOTER_LINKS.slice(0, 4)
export const REST_FOOTER_LINKS = FOOTER_LINKS.slice(4, -1)
