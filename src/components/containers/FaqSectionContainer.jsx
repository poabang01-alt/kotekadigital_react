import { useState } from 'react'
import FaqSection from '../FaqSection'
import { faqs } from '../../data/siteData'

function FaqSectionContainer() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0)

  return <FaqSection faqs={faqs} openFaqIndex={openFaqIndex} setOpenFaqIndex={setOpenFaqIndex} />
}

export default FaqSectionContainer
