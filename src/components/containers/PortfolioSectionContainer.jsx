import { useState } from 'react'
import PortfolioSection from '../PortfolioSection'
import { portfolioItems } from '../../data/siteData'
import { techIcons } from '../../data/appConfig'

function PortfolioSectionContainer() {
  const [portfolioIndex, setPortfolioIndex] = useState(0)
  const activePortfolio = portfolioItems[portfolioIndex]

  const nextPortfolio = () => {
    setPortfolioIndex((current) => (current + 1) % portfolioItems.length)
  }

  const prevPortfolio = () => {
    setPortfolioIndex((current) => (current - 1 + portfolioItems.length) % portfolioItems.length)
  }

  return (
    <PortfolioSection
      activePortfolio={activePortfolio}
      nextPortfolio={nextPortfolio}
      portfolioIndex={portfolioIndex}
      portfolioItems={portfolioItems}
      prevPortfolio={prevPortfolio}
      setPortfolioIndex={setPortfolioIndex}
      techIcons={techIcons}
    />
  )
}

export default PortfolioSectionContainer
