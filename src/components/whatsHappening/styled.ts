import styled from 'styled-components'

export const Wrapper = styled.div`
    padding: ${({ theme }) => theme.space.sp25};
    border-bottom: 2px solid ${({ theme }) => theme.usersSectionColor};
`

export const AvatarWrapper = styled.div`
    border-radius: 100%;
    overflow: hidden;
    flex: 0 0 ${({ theme }) => theme.width.w50};
    align-self: flex-start;
`

export const AvatarImage = styled.img`
    width: 100%;
`
export const TweetContent = styled.div`
    flex: 1 1 auto;
`

export const TextAreaWrapper = styled.div`
    border-radius: ${({ theme }) => theme.borderRadius.br10};
    overflow: hidden;
`

export const Textarea = styled.textarea`
    resize: none;
    width: 100%;
    height: 102px;
    display: block;
    padding: ${({ theme }) => theme.space.sp15};
    color: ${({ theme }) => theme.textColor};
    background-color: ${({ theme }) => theme.usersSectionColor};
    font-size: ${({ theme }) => theme.fontSize.fs16};
    line-height: ${({ theme }) => theme.lineHeight.lh24};

    &::-webkit-scrollbar {
        width: ${({ theme }) => theme.width.w3};
    }

    &::-webkit-scrollbar-track {
        border-radius: ${({ theme }) => theme.borderRadius.br6};
    }

    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.color.darkGray};
        border-radius: ${({ theme }) => theme.borderRadius.br10};
    }
`
export const TweetContentFooter = styled.footer`
    flex: 1 1 auto;
    margin-top: ${({ theme }) => theme.space.sp15};
`
export const ButtonWrapper = styled.div`
    max-width: ${({ theme }) => theme.width.w100};
    button {
        line-height: ${({ theme }) => theme.lineHeight.lh20};
    }
`
export const Text = styled.p<{ $isHighlight: boolean }>`
    color: ${({ theme, $isHighlight }) => ($isHighlight ? theme.color.red : theme.color.blueGray)};
    text-align: right;
    flex: 1 1 auto;
`

export const Pictures = styled.div`
    border-radius: ${({ theme }) => theme.borderRadius.br20};
    overflow: hidden;
    display: flex;
    gap: ${({ theme }) => theme.width.w10};
    flex-wrap: wrap;
    max-width: 100%;
    max-height: 410px;
    margin-top: ${({ theme }) => theme.space.sp15};
`
export const PictureWrapper = styled.div`
    flex: 1 1 45%;
    border-radius: ${({ theme }) => theme.borderRadius.br20};
    overflow: hidden;
    position: relative;
`
export const Picture = styled.img`
    height: ${({ theme }) => theme.width.w200};
    width: 100%;
    object-fit: cover;
    object-position: center;
`

export const Delete = styled.span`
    position: absolute;
    top: ${({ theme }) => theme.space.sp10};
    right: ${({ theme }) => theme.space.sp10};
    height: ${({ theme }) => theme.width.w32};
    width: ${({ theme }) => theme.width.w32};
    background-color: ${({ theme }) => theme.color.blackWithOpacity};
    border-radius: 100%;
    cursor: pointer;
    display: block;

    &::before,
    &::after {
        content: '';
        width: ${({ theme }) => theme.width.w15};
        height: ${({ theme }) => theme.width.w1d5};
        background-color: ${({ theme }) => theme.color.backBlue};
        border-radius: ${({ theme }) => theme.borderRadius.br6};
        transition: ${({ theme }) => theme.transition.standart};
        position: absolute;
        top: 50%;
        left: 50%;
    }

    &::before {
        transform: translateX(-50%) rotate(45deg);
    }

    &::after {
        transform: translateX(-50%) rotate(-45deg);
    }

    &:hover {
        &::before {
            transform: translateX(-50%) rotate(45deg) scale(1.2);
        }

        &::after {
            transform: translateX(-50%) rotate(-45deg) scale(1.2);
        }
    }
`
