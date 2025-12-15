import { Box } from '@mui/material'
import HeroSection from '../sections/HeroSection'
import ServicesSection from '../sections/ServicesSection'
import TeamSection from '../sections/TeamSection'
import GallerySection from '../sections/GallerySection'
import VisitSection from '../sections/VisitSection'
import ContactSection from '../sections/ContactSection'
import Footer from '../components/Footer'
import ContactCallToAction from '../sections/ContactCallToAction'
import BackToTop from '../components/BackToTop'

const Home = () => {
  return (
    <Box>
      <HeroSection />
      <ContactSection />
      <GallerySection />
      <VisitSection />
      <ServicesSection />
      <TeamSection />
      <ContactCallToAction />
      <Footer />
      <BackToTop />
    </Box>
  )
}

export default Home
