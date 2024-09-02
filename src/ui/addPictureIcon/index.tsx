import { ChangeEvent, forwardRef, memo } from 'react'

import { FileInput, Wrapper } from './styled'

type Props = {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    onClick: VoidFunction
    disable: boolean
}

export const AddPictureIcon = memo(
    forwardRef<HTMLInputElement, Props>(({ onChange, onClick, disable }, ref) => {
        return (
            <>
                <Wrapper onClick={onClick} $disable={disable}>
                    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M17.75 0H2.25C1.01 0 0 1.01 0 2.25V17.75C0 18.99 1.01 20 2.25 20H17.75C18.99 20 20 18.99 20 17.75V2.25C20 1.01 18.99 0 17.75 0ZM2.25 1.5H17.75C18.163 1.5 18.5 1.837 18.5 2.25V11.926L14.642 8.068C14.502 7.928 14.312 7.848 14.112 7.848H14.109C13.909 7.848 13.716 7.928 13.577 8.072L9.25999 12.456L7.44701 10.65C7.30701 10.51 7.11701 10.43 6.91701 10.43C6.72401 10.4 6.522 10.51 6.382 10.657L1.5 15.642V2.25C1.5 1.837 1.837 1.5 2.25 1.5ZM1.506 17.78L6.924 12.246L13.206 18.5H2.25C1.848 18.5 1.523 18.178 1.506 17.78ZM17.75 18.5H15.33L10.323 13.513L14.115 9.663L18.5 14.047V17.75C18.5 18.163 18.163 18.5 17.75 18.5Z'
                            fill='#1D9BF0'
                        />
                        <path
                            d='M6.86816 7.85097C7.72016 7.85097 8.41017 7.16067 8.41017 6.30897C8.41017 5.45737 7.72016 4.76697 6.86816 4.76697C6.01616 4.76697 5.32617 5.45737 5.32617 6.30897C5.32617 7.16067 6.01616 7.85097 6.86816 7.85097Z'
                            fill='#1D9BF0'
                        />
                    </svg>
                </Wrapper>
                <FileInput type='file' onChange={onChange} ref={ref} />
            </>
        )
    })
)
