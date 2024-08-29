import { MutableRefObject, useEffect } from 'react'

export const useOutsideClick = (ref: MutableRefObject<HTMLElement | null>, close: VoidFunction) => {
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as HTMLElement)) close()
        }

        document.addEventListener('mousedown', handler)

        return () => {
            document.removeEventListener('mousedown', handler)
        }
    }, [ref, close])
}
