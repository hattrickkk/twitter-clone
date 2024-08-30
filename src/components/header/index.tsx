import { Link, useLocation } from 'react-router-dom'

import { HOME } from '@/constants/paths'
import { Flex } from '@/styles/flexStyles'
import { ThemeSwitcher } from '@/ui/themeSwitcher'

import { StyledHeader, Title } from './styled'

export const Header = () => {
    const currentPath = useLocation().pathname
    return (
        <StyledHeader>
            <Flex $alignitems='center' $gap={20}>
                <Link to={`/${HOME}`}>
                    <Flex $justifycontent='flex-start' $alignitems='center' $gap={10}>
                        {currentPath !== `/${HOME}` && (
                            <svg
                                width='30'
                                height='15'
                                viewBox='0 0 30 15'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M29.1619 6.84379H3.07313L10.8778 1.40151C11.2444 1.14492 11.2444 0.729511 10.8778 0.473573C10.5113 0.216979 9.91782 0.216979 9.5522 0.473573L0.270947 6.96979C-0.0899902 7.22245 -0.0899902 7.64507 0.270947 7.89773L9.5522 14.3946C9.91876 14.6512 10.5122 14.6512 10.8778 14.3946C11.2444 14.138 11.2444 13.7226 10.8778 13.4667L3.07313 8.15629H29.1619C29.6794 8.15629 30.0994 7.86229 30.0994 7.50004C30.0994 7.13779 29.6794 6.84379 29.1619 6.84379Z'
                                    fill='#121313'
                                />
                            </svg>
                        )}
                        <Title>Home</Title>
                    </Flex>
                </Link>
                <ThemeSwitcher />
            </Flex>
        </StyledHeader>
    )
}
