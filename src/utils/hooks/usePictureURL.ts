import { useState, useEffect } from 'react'

import { Folders } from '@/constants/fireStoreCollections'

import { getPictureURL } from '../firebase/pictures'

export const usePictureURL = (photoURL: string | null) => {
    const [image, setImage] = useState<string | null>(null)

    useEffect(() => {
        if (photoURL && photoURL.includes(Folders.USERS)) {
            getPictureURL(photoURL)
                .then(url => {
                    setImage(url as string)
                })
                .catch(err => console.error(err))
        } else {
            setImage(photoURL)
        }
    }, [photoURL])

    return image
}
