import styled from 'styled-components'

export const EditingProfileSection = styled.section`
    width: ${({ theme }) => theme.width.w580};
    padding: ${({ theme }) => theme.space.sp10};
    input,
    #dropdown-field {
        padding: ${({ theme }) => theme.space.sp15};
    }
`
export const Title = styled.h2`
    margin-bottom: ${({ theme }) => theme.space.sp30};
    font-size: ${({ theme }) => theme.fontSize.fs30};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-family: ${({ theme }) => theme.fontFamily.robotoSerif};
`

export const Photos = styled.div`
    margin-bottom: ${({ theme }) => theme.space.sp45};
    position: relative;
`

export const BannerWrapper = styled.div<{ $disable: boolean }>`
    border-radius: ${({ theme }) => theme.borderRadius.br10};
    height: ${({ theme }) => theme.width.w165};
    overflow: hidden;
    position: relative;
    pointer-events: none;

    ${({ theme, $disable }) =>
        !$disable &&
        `cursor: pointer;
        pointer-events: all;

        &::after {
            background-color: transparent;
            transition: ${theme.transition.standart};
            content: '';
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            position: absolute;
        }

        &:hover {
            div {
                opacity: 1;
            }
            &::after {
                background-color: ${theme.color.black};
                opacity: ${theme.opacity};
            }
        }`};
`

export const BannerBack = styled.div`
    position: absolute;
    transform: translate(-50%) scale(2);
    z-index: 3;
    top: 50%;
    left: 50%;
    opacity: 0;
    transition: ${({ theme }) => theme.transition.standart};
`

export const BannerImage = styled.img`
    height: 100%;
    width: 100%;
    max-height: ${({ theme }) => theme.width.w280};
    object-fit: cover;
    object-position: center;
`

export const Avatar = styled.div`
    position: absolute;
    top: 50%;
`

export const AvatarWrapper = styled.div<{ $disable: boolean }>`
    border-radius: 100%;
    overflow: hidden;
    width: ${({ theme }) => theme.width.w100};
    height: ${({ theme }) => theme.width.w100};
    margin-bottom: ${({ theme }) => theme.space.sp10};
    position: relative;
    left: ${({ theme }) => theme.space.sp20};
    top: 50%;
    pointer-events: none;

    ${({ theme, $disable }) =>
        !$disable &&
        `cursor: pointer;
        pointer-events: all;
        &::after {
            background-color: transparent;
            transition: ${theme.transition.standart};
            content: '';
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            position: absolute;
        }

        &:hover {
            div {
                opacity: 1;
            }
            &::after {
                background-color: ${theme.color.black};
                opacity: ${theme.opacity};
            }
        }
    `}
`
export const AvatarBack = styled.div`
    position: absolute;
    transform: translate(-50%) scale(1.5);
    z-index: 3;
    top: 50%;
    left: 50%;
    opacity: 0;
    transition: ${({ theme }) => theme.transition.standart};
`

export const AvatarImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
`

export const InputsWrapper = styled.div`
    & > *:not(:first-child) {
        margin-top: ${({ theme }) => theme.space.sp20};
    }
    margin-bottom: ${({ theme }) => theme.space.sp25};
`

export const Wrapper = styled.div`
    max-height: ${({ theme }) => theme.width.w400};
    overflow-y: scroll;
    margin-bottom: ${({ theme }) => theme.space.sp25};
    padding-right: ${({ theme }) => theme.space.sp15};

    &::-webkit-scrollbar {
        width: ${({ theme }) => theme.width.w10};
    }

    &::-webkit-scrollbar-track {
        border-radius: ${({ theme }) => theme.borderRadius.br10};
    }

    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.scrollBarThemeColor};
        border-radius: ${({ theme }) => theme.borderRadius.br10};
    }
`
