import { PageWrapper } from './styled'
import { Footer } from '@/components/footer'
import { LandingContent } from '@/components/landingContent'

const LandingPage = () => {
    return (
        <PageWrapper>
            <LandingContent />
            <Footer />
        </PageWrapper>
    )
}
export default LandingPage
