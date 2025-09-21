import { ThemeProvider, CssBaseline, Box } from '@mui/material'
import { theme } from './theme'
import Navigation from './components/Navigation'
import FallingFlowers from './components/FallingFlowers'
import DynamicBackground from './components/DynamicBackground'
import ScrollStepper from './components/ScrollStepper'
import HeroSection from './sections/HeroSection'
import ServicesSection from './sections/ServicesSection'
import TeamSection from './sections/TeamSection'
import GallerySection from './sections/GallerySection'
import ContactSection from './sections/ContactSection'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DynamicBackground>
        <FallingFlowers />
        <Navigation />
        <ScrollStepper />
        <Box component="main" sx={{ position: 'relative', zIndex: 0 }}>
          <HeroSection />
          <ContactSection />
          <ServicesSection />
          <TeamSection />
          <GallerySection />
        </Box>
      </DynamicBackground>
    </ThemeProvider>
  )
}

export default App
