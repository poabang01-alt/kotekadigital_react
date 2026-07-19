import { Suspense, lazy } from 'react'
import {
  companyStats,
} from './data/siteData'
import {
  brandLogoSrc,
  heroSocialLinks,
  homeConsultationLink,
  trackedSectionIds,
} from './data/appConfig'
import HeroSection from './components/HeroSection'
import MobileDeferredSection from './components/MobileDeferredSection'
import SiteNavigation from './components/SiteNavigation'
import useSiteNavigation from './hooks/useSiteNavigation'
import './index.css'

const PartnerSection = lazy(() => import('./components/containers/PartnerSectionContainer'))
const AboutSection = lazy(() => import('./components/containers/AboutSectionContainer'))
const ServicesSection = lazy(() => import('./components/containers/ServicesSectionContainer'))
const PricingSection = lazy(() => import('./components/containers/PricingSectionContainer'))
const PortfolioSection = lazy(() => import('./components/containers/PortfolioSectionContainer'))
const BlogSection = lazy(() => import('./components/containers/BlogSectionContainer'))
const TestimonialSection = lazy(() => import('./components/containers/TestimonialSectionContainer'))
const FaqSection = lazy(() => import('./components/containers/FaqSectionContainer'))
const ContactSection = lazy(() => import('./components/containers/ContactSectionContainer'))
const FooterContainer = lazy(() => import('./components/containers/FooterContainer'))

function SectionFallback({ minHeight = 320 }) {
  return <div className="section-placeholder" style={{ minHeight }} aria-hidden="true" />
}

function App() {
  const navigation = useSiteNavigation(trackedSectionIds)

  return (
    <>
      <SiteNavigation brandLogoSrc={brandLogoSrc} {...navigation} />

      <main id="main-content" tabIndex={-1}>
        <HeroSection
          companyStats={companyStats}
          handleNavClick={navigation.handleNavClick}
          heroSocialLinks={heroSocialLinks}
          homeConsultationLink={homeConsultationLink}
        />
        <MobileDeferredSection fallback={<SectionFallback minHeight={900} />}>
          <Suspense fallback={<SectionFallback minHeight={160} />}>
            <PartnerSection />
          </Suspense>
        </MobileDeferredSection>
        <MobileDeferredSection fallback={<SectionFallback minHeight={840} />}>
          <Suspense fallback={<SectionFallback minHeight={840} />}>
            <AboutSection />
          </Suspense>
        </MobileDeferredSection>
        <MobileDeferredSection fallback={<SectionFallback minHeight={760} />}>
          <Suspense fallback={<SectionFallback minHeight={760} />}>
            <ServicesSection />
          </Suspense>
        </MobileDeferredSection>
        <MobileDeferredSection fallback={<SectionFallback minHeight={900} />}>
          <Suspense fallback={<SectionFallback minHeight={900} />}>
            <PricingSection />
          </Suspense>
        </MobileDeferredSection>
        <MobileDeferredSection fallback={<SectionFallback minHeight={760} />}>
          <Suspense fallback={<SectionFallback minHeight={760} />}>
            <PortfolioSection />
          </Suspense>
        </MobileDeferredSection>
        <MobileDeferredSection fallback={<SectionFallback minHeight={820} />}>
          <Suspense fallback={<SectionFallback minHeight={820} />}>
            <BlogSection />
          </Suspense>
        </MobileDeferredSection>
        <MobileDeferredSection fallback={<SectionFallback minHeight={560} />}>
          <Suspense fallback={<SectionFallback minHeight={560} />}>
            <TestimonialSection />
          </Suspense>
        </MobileDeferredSection>
        <MobileDeferredSection fallback={<SectionFallback minHeight={540} />}>
          <Suspense fallback={<SectionFallback minHeight={540} />}>
            <FaqSection />
          </Suspense>
        </MobileDeferredSection>
        <MobileDeferredSection fallback={<SectionFallback minHeight={980} />}>
          <Suspense fallback={<SectionFallback minHeight={980} />}>
            <ContactSection />
          </Suspense>
        </MobileDeferredSection>
      </main>

      <Suspense fallback={null}>
        <FooterContainer handleNavClick={navigation.handleNavClick} />
      </Suspense>
    </>
  )
}

export default App
