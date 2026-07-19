import PricingSection from '../PricingSection'
import { contactInfo, pricingPlans } from '../../data/siteData'
import { brandLogoSrc, pricingComparisonRows, pricingFeatureMap } from '../../data/appConfig'

function PricingSectionContainer() {
  const handlePricingAction = (plan) => {
    const whatsappBaseUrl =
      plan.orderLink?.split('?')[0] || `https://wa.me/${contactInfo.whatsappNumber}`
    const whatsappUrl = `${whatsappBaseUrl}?text=${encodeURIComponent(plan.whatsappMessage)}`
    const downloadLink = document.createElement('a')

    downloadLink.href = plan.download
    downloadLink.download = plan.download.split('/').pop() || `${plan.name}.pdf`
    downloadLink.rel = 'noopener'
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <PricingSection
      comparisonRows={pricingComparisonRows}
      handlePricingAction={handlePricingAction}
      logoSrc={brandLogoSrc}
      pricingFeatureMap={pricingFeatureMap}
      pricingPlans={pricingPlans}
    />
  )
}

export default PricingSectionContainer
