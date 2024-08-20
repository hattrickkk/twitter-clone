import styled from 'styled-components'

type FlexPropsType = Partial<{
    $justifycontent: string
    $flexdirection: string
    $flexwrap: string
    $alignitems: string
    $gap: number
}>

export const Flex = styled.div<FlexPropsType>`
    display: flex;
    flex-direction: ${({ $flexdirection }) => $flexdirection || ' row'};
    flex-wrap: ${({ $flexwrap }) => $flexwrap || ' no-wrap'};
    justify-content: ${({ $justifycontent }) => $justifycontent || 'space-between'};
    align-items: ${({ $alignitems }) => $alignitems || ' stretch'};
    gap: ${({ $gap }) => $gap || 0}px;
`
