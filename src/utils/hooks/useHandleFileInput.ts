import { fileTypeFromBuffer } from 'file-type'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { Messages } from '@/constants/messages'
import { Status } from '@/constants/responseStatus'
import { ImageState } from '@/customTypes/tweet'
import { setNotification } from '@/store/slices/notificationSlice'

export const useHandleFileInput = (
    fileInputRef: React.RefObject<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<Partial<ImageState>>>
): [VoidFunction, (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>] => {
    const dispatch = useDispatch()

    const handleFileInputClick = useCallback(() => {
        if (fileInputRef.current) fileInputRef.current.click()
    }, [])

    const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const buffer = await file.arrayBuffer()
            const type = await fileTypeFromBuffer(buffer)
            if (type && file.type.startsWith('image/')) {
                const imageUrl = URL.createObjectURL(file)
                setImage({
                    path: imageUrl,
                    file,
                })
            } else {
                dispatch(setNotification({ status: Status.FAIL, message: Messages.INVALID_FILE_TYPE }))
            }
        }
        e.target.value = ''
    }, [])

    return [handleFileInputClick, handleFileChange]
}
