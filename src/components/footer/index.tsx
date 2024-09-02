import { Link } from 'react-router-dom'

import { FOOTER_LINKS } from '@/constants/footerLinks'
import { Container } from '@/styles/common'
import { Flex } from '@/styles/flexStyles'

import { StyledFooter, Text } from './styled'

export const Footer = () => {
    return (
        <StyledFooter>
            <Container>
                <Flex $alignitems='center' $flexwrap='wrap' $justifycontent='center'>
                    {FOOTER_LINKS.map(({ title, path }) =>
                        path ? (
                            <Link to={path} key={path}>
                                {title}
                            </Link>
                        ) : (
                            <Text key={title}>{title}</Text>
                        )
                    )}
                </Flex>
            </Container>
        </StyledFooter>
    )
}
