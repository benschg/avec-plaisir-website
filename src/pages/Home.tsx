import { Box } from '@mui/material'
import HeroSection from '../sections/HeroSection'
import ServicesSection from '../sections/ServicesSection'
import AnimatedTextSection from '../sections/AnimatedTextSection'
import TeamSection from '../sections/TeamSection'
import GallerySection from '../sections/GallerySection'
import VisitSection from '../sections/VisitSection'
import ContactSection from '../sections/ContactSection'
import Footer from '../components/Footer'
import ContactCallToAction from '../sections/ContactCallToAction'
import { useMediaQuery, useTheme } from '@mui/material'

const Home = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box>
      <HeroSection />
      <ContactSection />
      <GallerySection />
      <VisitSection />
      <ServicesSection />
      {/* Show AnimatedTextSection separately only on desktop */}
      {!isMobile && <AnimatedTextSection />}
      <TeamSection />
      <ContactCallToAction />
      <Footer />
    </Box>
  )
}

export default Home
