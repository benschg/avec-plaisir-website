import { ThemeProvider, CssBaseline } from '@mui/material'
import { theme } from './theme'
import Navigation from './components/Navigation'
import FallingFlowers from './components/FallingFlowers'
import HeroSection from './sections/HeroSection'
import ServicesSection from './sections/ServicesSection'
import TeamSection from './sections/TeamSection'
import GallerySection from './sections/GallerySection'
import ContactSection from './sections/ContactSection'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <TeamSection />
      <GallerySection />
      <ContactSection />
    </ThemeProvider>
  )
}

export default App
