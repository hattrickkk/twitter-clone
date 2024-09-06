import { ReactElement, useRef } from 'react'
import { createPortal } from 'react-dom'

import { useOutsideClick } from '@/utils/hooks/useOutsideClick'

import { CloseButton, ContentWrapper, StyledPopup, Wrapper } from './styled'

type Props = {
    isPopupOpen: boolean
    closePopup: VoidFunction
    isExpand?: boolean
    children: ReactElement
}

export const Popup = ({ isPopupOpen, closePopup, children, isExpand = false }: Props) => {
    const popupRef = useRef<HTMLInputElement>(null)
    useOutsideClick(popupRef, closePopup)

    return createPortal(
        <StyledPopup $active={isPopupOpen} $isExpand={isExpand}>
            <Wrapper $active={isPopupOpen} ref={popupRef}>
                <CloseButton onClick={closePopup} $isExpand={isExpand} />
                <ContentWrapper $isExpand={isExpand}>{children}</ContentWrapper>
            </Wrapper>
        </StyledPopup>,
        document.body
    )
}
