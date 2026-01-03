import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
  const [lenis, setLenis] = useState<Lenis | null>(null)

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

    // Integrate Lenis with GSAP ScrollTrigger
    // Sync ScrollTrigger with Lenis scroll updates
    lenisInstance.on('scroll', ScrollTrigger.update)

    // Use GSAP ticker to drive Lenis (single RAF loop)
    const tickerCallback = (time: number) => {
      lenisInstance.raf(time * 1000)
    }
    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    // Refresh ScrollTrigger on resize
    const handleResize = () => {
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      gsap.ticker.remove(tickerCallback)
      lenisInstance.off('scroll', ScrollTrigger.update)
      lenisInstance.destroy()
      lenisRef.current = null
      setLenis(null)
    }
  }, [wrapper])

  const scrollTo = (
    target: string | number | HTMLElement,
    options?: ScrollToOptions
  ) => {
    if (!lenisRef.current) return

    lenisRef.current.scrollTo(target, {
      offset: options?.offset ?? 0,
      duration: options?.duration ?? 1.2,
      immediate: options?.immediate ?? false,
    })
  }

  return (
    <LenisContext.Provider value={{ lenis, scrollTo }}>
      {children}
    </LenisContext.Provider>
  )
}

export default useLenis
