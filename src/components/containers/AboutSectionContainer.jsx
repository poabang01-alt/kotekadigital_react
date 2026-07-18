import AboutSection from '../AboutSection'
import { aboutCards, contactInfo, teamMembers } from '../../data/siteData'
import { brandLogoSrc } from '../../data/appConfig'

function AboutSectionContainer() {
  return (
    <AboutSection
      aboutCards={aboutCards}
      contactInfo={contactInfo}
      logoSrc={brandLogoSrc}
      teamMembers={teamMembers}
    />
  )
}

export default AboutSectionContainer
