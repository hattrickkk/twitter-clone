import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
	*{
		font-family: ${({ theme }) => theme.fontFamily.roboto};
    	font-weight: ${({ theme }) => theme.fontWeight.regular};
    	font-size: ${({ theme }) => theme.fontSize.fs14};
		color: ${({ theme }) => theme.textColor};
	}
	
	body{
		background-color: ${({ theme }) => theme.backgroundColor};
	}
`
export const LockBody = createGlobalStyle<{ $isOverflowHidden: boolean }>`
  body {
    overflow: ${({ $isOverflowHidden }) => ($isOverflowHidden ? 'hidden' : 'auto')};
  }
`
