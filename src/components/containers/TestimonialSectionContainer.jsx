import TestimonialSection from '../TestimonialSection'
import useTestimonialSlider from '../../hooks/useTestimonialSlider'
import { testimonials } from '../../data/siteData'

function TestimonialSectionContainer() {
  const testimonialSlider = useTestimonialSlider(testimonials)

  return <TestimonialSection testimonials={testimonials} {...testimonialSlider} />
}

export default TestimonialSectionContainer
