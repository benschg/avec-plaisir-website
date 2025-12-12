import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import Lenis from 'lenis'
import Snap from 'lenis/snap'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { sectionsConfig } from '../config/sections'

gsap.registerPlugin(ScrollTrigger)

interface LenisContextType {
  lenis: Lenis | null
  scrollTo: (
    target: string | number | HTMLElement,
    options?: ScrollToOptions
  ) => void
}

interface ScrollToOptions {
  offset?: number
  duration?: number
  immediate?: boolean
}

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  scrollTo: () => {},
})

export const useLenis = () => {
  const context = useContext(LenisContext)
  if (!context) {
    throw new Error('useLenis must be used within a LenisProvider')
  }
  return context
}

interface LenisProviderProps {
  children: ReactNode
  wrapper?: HTMLElement | null
}

export const LenisProvider = ({ children, wrapper }: LenisProviderProps) => {
  const lenisRef = useRef<Lenis | null>(null)
  const snapRef = useRef<Snap | null>(null)
  const [lenis, setLenis] = useState<Lenis | null>(null)

  // Get section elements for snapping
  const getSectionElements = useCallback(() => {
    return sectionsConfig
      .map((section) => {
        if (section.id === 'hero') {
          return document.querySelector('#hero') as HTMLElement | null
        }
        if (section.id === 'gallery') {
          return (
            (document.querySelector('[id*="gallery"]') as HTMLElement | null) ||
            document.getElementById(section.id)
          )
        }
        return document.getElementById(section.id)
      })
      .filter((el): el is HTMLElement => el !== null)
  }, [])

  useEffect(() => {
    if (!wrapper) return

    // Initialize Lenis - use native window scroll for better ScrollTrigger compatibility
    const lenisInstance = new Lenis({
      smoothWheel: true,
      lerp: 0.08,
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      touchMultiplier: 2,
      syncTouch: true,
      syncTouchLerp: 0.075,
    })

    lenisRef.current = lenisInstance
    setLenis(lenisInstance)

    // Initialize Snap with Lenis
    const snapInstance = new Snap(lenisInstance, {
      type: 'proximity',
    })

    snapRef.current = snapInstance

    // Add snap points for each section using element references
    const setupSnapPoints = () => {
      const sections = getSectionElements()

      sections.forEach((section) => {
        // Use element-based snapping which handles dynamic positioning
        // Use 'center' alignment to center sections in viewport
        snapInstance.addElement(section, { align: ['center'] })
      })

      // Also add snap points for elements with .snap-section class (e.g., service panels)
      const snapSections = document.querySelectorAll('.snap-section')
      snapSections.forEach((section) => {
        snapInstance.addElement(section as HTMLElement, { align: ['center'] })
      })
    }

    // Setup snap points after DOM is ready
    const timeoutId = setTimeout(() => {
      setupSnapPoints()
    }, 100)

    // Integrate Lenis with GSAP ScrollTrigger
    // Sync ScrollTrigger with Lenis scroll updates
    lenisInstance.on('scroll', ScrollTrigger.update)

    // Use GSAP ticker to drive Lenis (single RAF loop)
    const tickerCallback = (time: number) => {
      lenisInstance.raf(time * 1000)
    }
    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    return () => {
      clearTimeout(timeoutId)
      gsap.ticker.remove(tickerCallback)
      lenisInstance.off('scroll', ScrollTrigger.update)
      snapInstance.destroy()
      lenisInstance.destroy()
      lenisRef.current = null
      snapRef.current = null
      setLenis(null)
    }
  }, [wrapper, getSectionElements])

  const scrollTo = useCallback(
    (target: string | number | HTMLElement, options?: ScrollToOptions) => {
      if (!lenisRef.current) return

      lenisRef.current.scrollTo(target, {
        offset: options?.offset ?? 0,
        duration: options?.duration ?? 1.2,
        immediate: options?.immediate ?? false,
      })
    },
    []
  )

  return (
    <LenisContext.Provider value={{ lenis, scrollTo }}>
      {children}
    </LenisContext.Provider>
  )
}

export default useLenis
