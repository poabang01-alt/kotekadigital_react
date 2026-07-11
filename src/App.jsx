import { useState } from 'react'
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
  comparisonRows,
  heroSocialLinks,
  homeConsultationLink,
  partnerCards,
  pricingFeatureMap,
  techIcons,
  trackedSectionIds,
} from './data/appConfig'
import AboutSection from './components/AboutSection'
import BlogSection from './components/BlogSection'
import ContactSection from './components/ContactSection'
import FaqSection from './components/FaqSection'
import Footer from './components/Footer'
import HeroSection from './components/HeroSection'
import PartnerSection from './components/PartnerSection'
import PortfolioSection from './components/PortfolioSection'
import PricingSection from './components/PricingSection'
import ServicesSection from './components/ServicesSection'
import SiteNavigation from './components/SiteNavigation'
import TestimonialSection from './components/TestimonialSection'
import useRevealOnScroll from './hooks/useRevealOnScroll'
import useSiteNavigation from './hooks/useSiteNavigation'
import useTestimonialSlider from './hooks/useTestimonialSlider'
import './index.css'

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
        <PricingSection
          comparisonRows={comparisonRows}
          handlePricingAction={handlePricingAction}
          logoSrc={brandLogoSrc}
          pricingFeatureMap={pricingFeatureMap}
          pricingPlans={pricingPlans}
        />
        <PortfolioSection
          activePortfolio={activePortfolio}
          nextPortfolio={nextPortfolio}
          portfolioIndex={portfolioIndex}
          portfolioItems={portfolioItems}
          prevPortfolio={prevPortfolio}
          setPortfolioIndex={setPortfolioIndex}
          techIcons={techIcons}
        />
        <BlogSection blogPosts={blogPosts} />
        <TestimonialSection testimonials={testimonials} {...testimonialSlider} />
        <FaqSection faqs={faqs} openFaqIndex={openFaqIndex} setOpenFaqIndex={setOpenFaqIndex} />
        <ContactSection contactInfo={contactInfo} />
      </main>

      <Footer contactInfo={contactInfo} whatsappLinks={whatsappLinks} />
    </>
  )
}

export default App
