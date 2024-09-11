import { Footer } from '@/components/footer'
import { LandingContent } from '@/components/landingContent'

import { PageWrapper } from './styled'

const LandingPage = () => {
    return (
        <PageWrapper>
            <LandingContent />
            <Footer />
        </PageWrapper>
    )
}
export default LandingPage
