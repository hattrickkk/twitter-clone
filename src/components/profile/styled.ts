import styled from 'styled-components'

import { MEDIA } from '@/constants/media'

export const ProfileSection = styled.section``

export const BannerWrapper = styled.div`
    height: ${({ theme }) => theme.width.w185};
    overflow: hidden;
`
export const StyledProfile = styled.div``

export const Info = styled.div`
    margin-top: ${({ theme }) => `-${theme.space.sp95}`};
    padding: ${({ theme }) => theme.space.sp25};
    border-bottom: 2px solid ${({ theme }) => theme.usersSectionColor};

    @media ${MEDIA.LARGE_PHONE} {
        padding: ${({ theme }) => `${theme.space.sp25} ${theme.space.sp10}`};
    }
`

export const AvatarWrapper = styled.div`
    border-radius: 100%;
    overflow: hidden;
    width: ${({ theme }) => theme.width.w150};
    height: ${({ theme }) => theme.width.w150};
    margin-bottom: ${({ theme }) => theme.space.sp10};

    @media ${MEDIA.LARGE_PHONE} {
        width: ${({ theme }) => theme.width.w100};
        height: ${({ theme }) => theme.width.w100};
    }
`

export const ProfileDescriptionWrapper = styled.div`
    padding-left: ${({ theme }) => theme.space.sp25};

    @media ${MEDIA.LARGE_PHONE} {
        padding-left: ${({ theme }) => theme.space.sp15};
    }
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

    @media ${MEDIA.PHONE} {
        margin-top: ${({ theme }) => theme.space.sp15};
        flex: 1 1 100%;
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
