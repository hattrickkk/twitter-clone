import { StyledInput } from './styled'

type Props = {
    placeholder: string
}

export const Input = ({ placeholder }: Props) => {
    return <StyledInput type='text' placeholder={placeholder} />
}
