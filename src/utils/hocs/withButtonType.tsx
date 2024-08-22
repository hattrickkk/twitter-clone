import { ComponentType, ReactElement } from 'react'

import { ButtonTypes } from '@/constants/buttonTypes'

export const withButtonType = <P extends object>(Component: ComponentType<P>, category: ButtonTypes) => {
    return (props: P): ReactElement => {
        return <Component {...(props as P)} category={category} />
    }
}
