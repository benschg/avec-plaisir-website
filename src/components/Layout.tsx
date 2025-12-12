import { useRef, useEffect, useState } from 'react'
import { Box } from '@mui/material'
import Navigation from './Navigation'
import FallingFlowers from './FallingFlowers'
import DynamicBackground from './DynamicBackground'
import ScrollStepper from './ScrollStepper'
import { LenisProvider } from '../hooks/useLenis'

interface LayoutProps {
  children: React.ReactNode
  showScrollStepper?: boolean
}

const Layout = ({ children, showScrollStepper = false }: LayoutProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [wrapper, setWrapper] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (wrapperRef.current) {
      setWrapper(wrapperRef.current)
    }
  }, [])

  return (
    <LenisProvider wrapper={wrapper}>
      <DynamicBackground>
        <Box
          ref={wrapperRef}
          component={'div'}
          className="lenis-wrapper"
        >
          <FallingFlowers />
          <Navigation />
          {showScrollStepper && <ScrollStepper />}
          {children}
        </Box>
      </DynamicBackground>
    </LenisProvider>
  )
}

export default Layout
