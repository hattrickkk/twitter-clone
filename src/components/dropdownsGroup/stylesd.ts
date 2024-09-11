import styled from 'styled-components'

import { MEDIA } from '@/constants/media'

export const DropdownsWrapper = styled.div<{ $disable: boolean }>`
    display: flex;
    flex-direction: row;
    gap: ${({ theme }) => theme.space.sp20};

    & > *:nth-child(1) {
        flex: 4 4 auto;
    }
    & > *:nth-child(2),
    & > *:nth-child(3) {
        flex: 1 1 ${({ theme }) => theme.width.w130};
    }

    @media ${MEDIA.PHONE} {
        flex-direction: column;

        & > *:nth-child(2),
        & > *:nth-child(3) {
            flex: 1 1 auto;
        }
    }

    ${({ theme, $disable }) =>
        $disable &&
        `#dropdown-field {
            &::before, &::after{
                  background-color: ${theme.color.darkGray};
            }
            color: ${theme.color.darkGray};
            background-color: ${theme.color.gray};
            pointer-events: none;
        }`};
`
