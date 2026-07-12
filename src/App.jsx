import { lazy, Suspense, useState } from 'react'
import {
  aboutCards,
  blogPosts,
  companyStats,
  contactInfo,
  faqs,
  portfolioItems,
  pricingPlans,
  serviceGroups,
  teamMembers,
  testimonials,
  whatsappLinks,
} from './data/siteData'
import {
  brandLogoSrc,
  heroSocialLinks,
  homeConsultationLink,
  partnerCards,
  pricingComparisonRows,
  pricingFeatureMap,
  techIcons,
  trackedSectionIds,
} from './data/appConfig'
import AboutSection from './components/AboutSection'
import DeferredSection from './components/DeferredSection'
import HeroSection from './components/HeroSection'
import PartnerSection from './components/PartnerSection'
import ServicesSection from './components/ServicesSection'
import SiteNavigation from './components/SiteNavigation'
import useRevealOnScroll from './hooks/useRevealOnScroll'
import useSiteNavigation from './hooks/useSiteNavigation'
import useTestimonialSlider from './hooks/useTestimonialSlider'
import './index.css'

const DeferredPricingSection = lazy(() => import('./components/PricingSection'))
const DeferredPortfolioSection = lazy(() => import('./components/PortfolioSection'))
const DeferredBlogSection = lazy(() => import('./components/BlogSection'))
const DeferredTestimonialSection = lazy(() => import('./components/TestimonialSection'))
const DeferredFaqSection = lazy(() => import('./components/FaqSection'))
const DeferredContactSection = lazy(() => import('./components/ContactSection'))
const DeferredFooter = lazy(() => import('./components/Footer'))

function App() {
  const [portfolioIndex, setPortfolioIndex] = useState(0)
  const [openFaqIndex, setOpenFaqIndex] = useState(0)

  const navigation = useSiteNavigation(trackedSectionIds)
  const testimonialSlider = useTestimonialSlider(testimonials)

  useRevealOnScroll()

  const activePortfolio = portfolioItems[portfolioIndex]

  const handlePricingAction = (plan) => {
    const downloadLink = document.createElement('a')
    downloadLink.href = plan.download
    downloadLink.setAttribute('download', '')
    downloadLink.style.display = 'none'
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)

    const whatsappBaseUrl =
      plan.orderLink?.split('?')[0] || `https://wa.me/${contactInfo.whatsappNumber}`
    const whatsappUrl = `${whatsappBaseUrl}?text=${encodeURIComponent(plan.whatsappMessage)}`

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  const nextPortfolio = () => {
    setPortfolioIndex((current) => (current + 1) % portfolioItems.length)
  }

  const prevPortfolio = () => {
    setPortfolioIndex(
      (current) => (current - 1 + portfolioItems.length) % portfolioItems.length
    )
  }

  return (
    <>
      <SiteNavigation brandLogoSrc={brandLogoSrc} {...navigation} />

      <main id="main-content">
        <HeroSection
          companyStats={companyStats}
          handleNavClick={navigation.handleNavClick}
          heroSocialLinks={heroSocialLinks}
          homeConsultationLink={homeConsultationLink}
        />
        <PartnerSection partnerCards={partnerCards} />
        <AboutSection
          aboutCards={aboutCards}
          contactInfo={contactInfo}
          logoSrc={brandLogoSrc}
          teamMembers={teamMembers}
        />
        <ServicesSection serviceGroups={serviceGroups} />
        <DeferredSection className="section-placeholder" minHeight={960}>
          <Suspense fallback={<div className="section-placeholder" aria-hidden="true" />}>
            <DeferredPricingSection
              comparisonRows={pricingComparisonRows}
              handlePricingAction={handlePricingAction}
              logoSrc={brandLogoSrc}
              pricingFeatureMap={pricingFeatureMap}
              pricingPlans={pricingPlans}
            />
          </Suspense>
        </DeferredSection>
        <DeferredSection className="section-placeholder" minHeight={920}>
          <Suspense fallback={<div className="section-placeholder" aria-hidden="true" />}>
            <DeferredPortfolioSection
              activePortfolio={activePortfolio}
              nextPortfolio={nextPortfolio}
              portfolioIndex={portfolioIndex}
              portfolioItems={portfolioItems}
              prevPortfolio={prevPortfolio}
              setPortfolioIndex={setPortfolioIndex}
              techIcons={techIcons}
            />
          </Suspense>
        </DeferredSection>
        <DeferredSection className="section-placeholder" minHeight={900}>
          <Suspense fallback={<div className="section-placeholder" aria-hidden="true" />}>
            <DeferredBlogSection blogPosts={blogPosts} />
          </Suspense>
        </DeferredSection>
        <DeferredSection className="section-placeholder" minHeight={780}>
          <Suspense fallback={<div className="section-placeholder" aria-hidden="true" />}>
            <DeferredTestimonialSection testimonials={testimonials} {...testimonialSlider} />
          </Suspense>
        </DeferredSection>
        <DeferredSection className="section-placeholder" minHeight={720}>
          <Suspense fallback={<div className="section-placeholder" aria-hidden="true" />}>
            <DeferredFaqSection
              faqs={faqs}
              openFaqIndex={openFaqIndex}
              setOpenFaqIndex={setOpenFaqIndex}
            />
          </Suspense>
        </DeferredSection>
        <DeferredSection className="section-placeholder" minHeight={1100}>
          <Suspense fallback={<div className="section-placeholder" aria-hidden="true" />}>
            <DeferredContactSection contactInfo={contactInfo} />
          </Suspense>
        </DeferredSection>
      </main>

      <DeferredSection className="section-placeholder" minHeight={320}>
        <Suspense fallback={<div className="section-placeholder" aria-hidden="true" />}>
          <DeferredFooter
            contactInfo={contactInfo}
            handleNavClick={navigation.handleNavClick}
            whatsappLinks={whatsappLinks}
          />
        </Suspense>
      </DeferredSection>
    </>
  )
}

export default App
