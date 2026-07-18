import Footer from '../Footer'
import { contactInfo, whatsappLinks } from '../../data/siteData'

function FooterContainer({ handleNavClick }) {
  return (
    <Footer
      contactInfo={contactInfo}
      handleNavClick={handleNavClick}
      whatsappLinks={whatsappLinks}
    />
  )
}

export default FooterContainer
