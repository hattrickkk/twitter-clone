import styled from 'styled-components'

import { MEDIA } from '@/constants/media'

export const StyledInput = styled.input`
    padding: ${({ theme }) => `${theme.space.sp25} ${theme.space.sp20}`};
    color: ${({ theme }) => theme.color.blackText};
    background-color: ${({ theme }) => theme.inputColor};
    font-size: ${({ theme }) => theme.fontSize.fs18};
    border: ${({ theme }) => `${theme.borderSize.bs1} solid ${theme.color.gray}`};
    border-radius: ${({ theme }) => theme.borderRadius.br6};
    width: 100%;

    @media ${MEDIA.TABLET} {
        padding: ${({ theme }) => `${theme.space.sp20} ${theme.space.sp15}`};
    }
`
