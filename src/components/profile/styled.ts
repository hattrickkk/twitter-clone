import styled from 'styled-components'

import { MEDIA } from '@/constants/media'

export const ProfileSection = styled.section``

export const BannerWrapper = styled.div``
export const StyledProfile = styled.div``

export const Info = styled.div`
    margin-top: ${({ theme }) => `-${theme.space.sp95}`};
    padding: ${({ theme }) => theme.space.sp25};
    border-bottom: 2px solid ${({ theme }) => theme.usersSectionColor};
`

export const BannerImage = styled.img`
    width: 100%;
    max-height: ${({ theme }) => theme.width.w280};
    object-fit: cover;
    object-position: center;
`

export const AvatarWrapper = styled.div`
    border-radius: 100%;
    overflow: hidden;
    max-width: ${({ theme }) => theme.width.w150};
    margin-bottom: ${({ theme }) => theme.space.sp10};
`

export const AvatarImage = styled.img`
    width: 100%;
`

export const ProfileDescriptionWrapper = styled.div`
    padding-left: ${({ theme }) => theme.space.sp25};
`

export const DisplayName = styled.h1`
    font-size: ${({ theme }) => theme.fontSize.fs24};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-family: ${({ theme }) => theme.fontFamily.robotoSerif};
    margin-bottom: ${({ theme }) => theme.space.sp5};
`

export const Description = styled.p`
    font-size: ${({ theme }) => theme.fontSize.fs18};
    margin-top: ${({ theme }) => theme.space.sp20};
`

export const Text = styled.span`
    font-size: ${({ theme }) => theme.fontSize.fs18};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-family: ${({ theme }) => theme.fontFamily.robotoSerif};
`
export const LightText = styled.span`
    font-size: ${({ theme }) => theme.fontSize.fs16};
    opacity: ${({ theme }) => theme.opacity};
`

export const ButtonWrapper = styled.div<{ $isCurrentUser: boolean }>`
    flex: 0 0 ${({ theme }) => theme.width.w150};
    margin-top: ${({ theme }) => theme.space.sp95};

    button {
        padding: ${({ theme }) => theme.space.sp10};
        font-size: ${({ theme }) => theme.fontSize.fs18};
        ${({ theme, $isCurrentUser }) => !$isCurrentUser && `background-color: ${theme.color.buttonDarkGray};`};
    }
`

export const ProfileFooter = styled.footer`
    display: flex;
    gap: ${({ theme }) => theme.space.sp35};
    margin-left: ${({ theme }) => theme.space.sp25};
    padding: ${({ theme }) => `${theme.space.sp50} 0 ${theme.space.sp20}`};
`

export const FooterItem = styled.div`
    & > *:first-child {
        margin-right: ${({ theme }) => theme.space.sp10};
    }
`
