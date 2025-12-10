import { Box } from '@mui/material'
import HeroSection from '../sections/HeroSection'
import ServicesIntroSection from '../sections/ServicesIntroSection'
import ServicesSection from '../sections/ServicesSection'
import AnimatedTextSection from '../sections/AnimatedTextSection'
import TeamSection from '../sections/TeamSection'
import GallerySection from '../sections/GallerySection'
import VisitSection from '../sections/VisitSection'
import ContactSection from '../sections/ContactSection'
import Footer from '../components/Footer'
import ContactCallToAction from '../sections/ContactCallToAction'

const Home = () => {
  return (
    <Box>
      <HeroSection />
      <ContactSection />
      <GallerySection />
      <VisitSection />
      <ServicesIntroSection />
      <ServicesSection />
      <AnimatedTextSection />
      <TeamSection />
      <ContactCallToAction />
      <Footer />
    </Box>
  )
}

export default Home
