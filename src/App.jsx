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
import SiteNavigation from './components/SiteNavigation'
import useSiteNavigation from './hooks/useSiteNavigation'
import PageTransition from './components/motion/PageTransition'
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
    <PageTransition>
      <SiteNavigation brandLogoSrc={brandLogoSrc} {...navigation} />

      <main id="main-content">
        <HeroSection
          companyStats={companyStats}
          handleNavClick={navigation.handleNavClick}
          heroSocialLinks={heroSocialLinks}
          homeConsultationLink={homeConsultationLink}
        />
        <Suspense fallback={<SectionFallback minHeight={160} />}>
          <PartnerSection />
        </Suspense>
        <Suspense fallback={<SectionFallback minHeight={840} />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionFallback minHeight={760} />}>
          <ServicesSection />
        </Suspense>
        <Suspense fallback={<SectionFallback minHeight={900} />}>
          <PricingSection />
        </Suspense>
        <Suspense fallback={<SectionFallback minHeight={760} />}>
          <PortfolioSection />
        </Suspense>
        <Suspense fallback={<SectionFallback minHeight={820} />}>
          <BlogSection />
        </Suspense>
        <Suspense fallback={<SectionFallback minHeight={560} />}>
          <TestimonialSection />
        </Suspense>
        <Suspense fallback={<SectionFallback minHeight={540} />}>
          <FaqSection />
        </Suspense>
        <Suspense fallback={<SectionFallback minHeight={980} />}>
          <ContactSection />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <FooterContainer handleNavClick={navigation.handleNavClick} />
      </Suspense>
    </PageTransition>
  )
}

export default App
