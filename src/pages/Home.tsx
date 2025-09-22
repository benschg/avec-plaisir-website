import { Box } from '@mui/material'
import HeroSection from '../sections/HeroSection'
import ServicesSection from '../sections/ServicesSection'
import TeamSection from '../sections/TeamSection'
import GallerySection from '../sections/GallerySection'
import ContactSection from '../sections/ContactSection'

const Home = () => {
  return (
    <Box>
      <HeroSection />
      <ContactSection />
      <GallerySection />
      <ServicesSection />
      <TeamSection />
    </Box>
  )
}

export default Home
