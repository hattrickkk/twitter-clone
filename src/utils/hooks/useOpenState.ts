import { useCallback, useState } from 'react'

type UseOpenState = [boolean, VoidFunction, VoidFunction]

export const useOpenState = (): UseOpenState => {
    const [isOpen, setIsOpen] = useState(false)
    const close = useCallback(() => setIsOpen(false), [])
    const open = useCallback(() => setIsOpen(true), [])
    return [isOpen, close, open]
}
