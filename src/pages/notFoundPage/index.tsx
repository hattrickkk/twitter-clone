import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { HOME } from '@/constants/paths'
import { selectUser } from '@/store/selectors'
import { Container } from '@/styles/common'
import { PrimaryButton } from '@/ui/buttons'

import { ButtonWrapper, Text, Text404, Wrapper } from './styled'

const NotFoundPage = () => {
    const navigate = useNavigate()
    const currentUser = useSelector(selectUser)
    const handleNavigateToBasePage = () => navigate(currentUser ? HOME : '/', { replace: true })
    return (
        <Container>
            <Wrapper>
                <Text404>404</Text404>
                <Text>Page not found</Text>
                <ButtonWrapper>
                    <PrimaryButton onClick={handleNavigateToBasePage}>Click to reload page</PrimaryButton>
                </ButtonWrapper>
            </Wrapper>
        </Container>
    )
}

export default NotFoundPage
