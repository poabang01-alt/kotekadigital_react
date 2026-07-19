import { Suspense, lazy, useEffect } from 'react'
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
import { trackScrollDepth } from './utils/analytics'
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

  useEffect(() => {
    const handleScrollDepth = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) return

      const progress = (window.scrollY / scrollHeight) * 100
      if (progress >= 50) {
        trackScrollDepth(50)
      }
      if (progress >= 90) {
        trackScrollDepth(90)
      }
    }

    window.addEventListener('scroll', handleScrollDepth, { passive: true })
    handleScrollDepth()

    return () => window.removeEventListener('scroll', handleScrollDepth)
  }, [])

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
        <MobileDeferredSection
          fallback={<SectionFallback minHeight={900} />}
          sectionIds={['partner']}
        >
          <Suspense fallback={<SectionFallback minHeight={160} />}>
            <PartnerSection />
          </Suspense>
        </MobileDeferredSection>
        <MobileDeferredSection
          fallback={<SectionFallback minHeight={840} />}
          sectionIds={['about']}
        >
          <Suspense fallback={<SectionFallback minHeight={840} />}>
            <AboutSection />
          </Suspense>
        </MobileDeferredSection>
        <MobileDeferredSection
          fallback={<SectionFallback minHeight={760} />}
          sectionIds={['layanan', 'layanan-kategori-01', 'layanan-kategori-02', 'layanan-kategori-03']}
        >
          <Suspense fallback={<SectionFallback minHeight={760} />}>
            <ServicesSection />
          </Suspense>
        </MobileDeferredSection>
        <MobileDeferredSection
          fallback={<SectionFallback minHeight={900} />}
          sectionIds={['pricing-section']}
        >
          <Suspense fallback={<SectionFallback minHeight={900} />}>
            <PricingSection />
          </Suspense>
        </MobileDeferredSection>
        <MobileDeferredSection
          fallback={<SectionFallback minHeight={760} />}
          sectionIds={['portfolio']}
        >
          <Suspense fallback={<SectionFallback minHeight={760} />}>
            <PortfolioSection />
          </Suspense>
        </MobileDeferredSection>
        <MobileDeferredSection
          fallback={<SectionFallback minHeight={820} />}
          sectionIds={['blog']}
        >
          <Suspense fallback={<SectionFallback minHeight={820} />}>
            <BlogSection />
          </Suspense>
        </MobileDeferredSection>
        <MobileDeferredSection
          fallback={<SectionFallback minHeight={560} />}
          sectionIds={['testimoni']}
        >
          <Suspense fallback={<SectionFallback minHeight={560} />}>
            <TestimonialSection />
          </Suspense>
        </MobileDeferredSection>
        <MobileDeferredSection
          fallback={<SectionFallback minHeight={540} />}
          sectionIds={['faq']}
        >
          <Suspense fallback={<SectionFallback minHeight={540} />}>
            <FaqSection />
          </Suspense>
        </MobileDeferredSection>
        <MobileDeferredSection
          fallback={<SectionFallback minHeight={980} />}
          sectionIds={['kontak']}
        >
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
