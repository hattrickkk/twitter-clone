import { useRef } from 'react'
import { createPortal } from 'react-dom'

import { useOutsideClick } from '@/utils/hooks/useOutsideClick'

import { CloseButton, ContentWrapper, StyledPopup, Wrapper } from './styled'
import { WhatsHappening } from '../whatsHappening'

type Props = {
    isPopupOpen: boolean
    closePopup: VoidFunction
}

export const CreateTweetPopup = ({ isPopupOpen, closePopup }: Props) => {
    const popupRef = useRef<HTMLInputElement>(null)
    useOutsideClick(popupRef, closePopup)

    return createPortal(
        <StyledPopup $active={isPopupOpen}>
            <Wrapper $active={isPopupOpen} ref={popupRef}>
                <CloseButton onClick={closePopup} />
                <ContentWrapper>
                    <WhatsHappening closePopup={closePopup} isPopupOpen={isPopupOpen} />
                </ContentWrapper>
            </Wrapper>
        </StyledPopup>,
        document.body
    )
}
