import { Box } from '@mui/material'
import Navigation from './Navigation'
import FallingFlowers from './FallingFlowers'
import DynamicBackground from './DynamicBackground'
import ScrollStepper from './ScrollStepper'
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode
  showScrollStepper?: boolean
}

const Layout = ({ children, showScrollStepper = false }: LayoutProps) => {
  return (
    <DynamicBackground>
      <Box
        component={'div'}
        sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        <FallingFlowers />
        <Navigation />
        {showScrollStepper && <ScrollStepper />}
        <Box component="main" sx={{ position: 'relative', zIndex: 0, flex: 1 }}>
          {children}
        </Box>
        <Footer />
      </Box>
    </DynamicBackground>
  )
}

export default Layout
