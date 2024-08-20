import { PageWrapper } from './styled'
import { Footer } from '@/components/footer'
import { LandingContent } from '@/components/landingContent'

export const LandingPage = () => {
    return (
        <PageWrapper>
            <LandingContent />
            <Footer />
        </PageWrapper>
    )
}
