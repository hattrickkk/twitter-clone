import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'

import { Folders } from '@/constants/fireStoreCollections'
import { storage } from '@/firebase'
import { generateHash } from '@/utils/generateHash'

export const uploadPicture = async (files: File[], folderName: Folders) => {
    try {
        const hashFileNames: string[] = []
        const promises = files.map(async file => {
            const hash = await generateHash(file.name + Date.now)
            const fileName = folderName + hash + file.name
            hashFileNames.push(fileName)
            const storageRef = ref(storage, fileName)
            const metadata = { contentType: file.type }
            await uploadBytes(storageRef, file, metadata)
        })
        await Promise.all(promises)
        return hashFileNames
    } catch (error) {
        console.error(error)
    }
}
