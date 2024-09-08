import { MutableRefObject, useEffect } from 'react'

export const useOutsideClick = (ref: MutableRefObject<HTMLElement | null>, close: VoidFunction, id?: string) => {
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (e.target && ref.current && !ref.current.contains(e.target as HTMLElement)) {
                if (id) {
                    if ((e.target as HTMLElement).id !== id) {
                        close()
                    }
                } else {
                    close()
                }
            }
        }

        document.addEventListener('mousedown', handler)

        return () => {
            document.removeEventListener('mousedown', handler)
        }
    }, [ref, close])
}
