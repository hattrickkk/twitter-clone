import { memo } from 'react'

export const OpenEyeIcon = memo(() => {
    return (
        <svg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'>
            <rect fill='none' height='256' width='256' />
            <path
                d='M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Z'
                fill='none'
                stroke='#000'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='16'
            />
            <circle
                cx='128'
                cy='128'
                fill='none'
                r='40'
                stroke='#000'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='16'
            />
        </svg>
    )
})
