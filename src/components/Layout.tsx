import { Box } from '@mui/material'
import Navigation from './Navigation'
import FallingFlowers from './FallingFlowers'
import DynamicBackground from './DynamicBackground'
import ScrollStepper from './ScrollStepper'

interface LayoutProps {
  children: React.ReactNode
  showScrollStepper?: boolean
}

const Layout = ({ children, showScrollStepper = false }: LayoutProps) => {
  return (
    <DynamicBackground>
      <FallingFlowers />
      <Navigation />
      {showScrollStepper && <ScrollStepper />}
      <Box component="main" sx={{ position: 'relative', zIndex: 0 }}>
        {children}
      </Box>
    </DynamicBackground>
  )
}

export default Layout