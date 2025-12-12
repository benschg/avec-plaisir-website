import { useRef, useEffect } from 'react'
import { Box } from '@mui/material'
import { useTextColor } from './DynamicBackground'
import gsap from 'gsap'

type AnimatedItem =
  | string
  | { type: 'svg'; src: string; alt?: string }

const AnimatedText = ({
  words,
  fontSize = { xs: '1.8rem', md: '8rem' },
  interval = 3000,
}: {
  words: AnimatedItem[]
  fontSize?: { xs: string; md: string }
  interval?: number
}) => {
  const { headingColor } = useTextColor()
  const containerRef = useRef<HTMLDivElement>(null)
  const currentIndexRef = useRef(0)

  useEffect(() => {
    if (!containerRef.current) return

    const items = containerRef.current.querySelectorAll(
      '.animated-word'
    ) as NodeListOf<HTMLElement>
    if (items.length === 0) return

    // Set initial state - first item visible, others hidden below
    // Use xPercent: -50 to maintain center positioning with left: 50%
    gsap.set(items, {
      yPercent: 120,
      xPercent: -50,
      opacity: 0,
      visibility: 'hidden',
    })
    gsap.set(items[0], {
      yPercent: 0,
      xPercent: -50,
      opacity: 1,
      visibility: 'visible',
    })

    // Set container width based on first item
    const container = containerRef.current
    container.style.width = `${items[0].offsetWidth}px`

    const animateNext = () => {
      const currentIndex = currentIndexRef.current
      const nextIndex = (currentIndex + 1) % words.length
      const currentItem = items[currentIndex]
      const nextItem = items[nextIndex]

      // Animate container width to match next item
      gsap.to(container, {
        width: nextItem.offsetWidth,
        duration: 0.4,
        ease: 'power2.inOut',
      })

      // Animate current out (up) and next in (from below)
      gsap.to(currentItem, {
        yPercent: -120,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.set(currentItem, { visibility: 'hidden' })
        },
      })

      gsap.set(nextItem, { visibility: 'visible' })
      gsap.fromTo(
        nextItem,
        { yPercent: 120, xPercent: -50, opacity: 0 },
        {
          yPercent: 0,
          xPercent: -50,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.inOut',
        }
      )

      currentIndexRef.current = nextIndex
    }

    const timer = setInterval(animateNext, interval)

    return () => clearInterval(timer)
  }, [words.length, interval])

  const renderContent = (item: AnimatedItem) => {
    if (typeof item === 'string') {
      return item
    } else if (item.type === 'svg') {
      return (
        <Box
          component="span"
          sx={{
            display: 'inline-block',
            width: '1em',
            height: '1em',
            backgroundColor: 'currentColor',
            maskImage: `url(${item.src})`,
            maskSize: 'contain',
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
            WebkitMaskImage: `url(${item.src})`,
            WebkitMaskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
          }}
        />
      )
    }
    return null
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Lora',
        fontSize: fontSize,
        fontWeight: 300,
        color: headingColor,
        lineHeight: 1,
        gap: '0.3em',
      }}
    >
      <Box component="span">avec</Box>

      <Box
        ref={containerRef}
        sx={{
          position: 'relative',
          height: '1.2em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {words.map((item, index) => (
          <Box
            component="span"
            key={index}
            className="animated-word"
            sx={{
              position: 'absolute',
              left: '50%',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {renderContent(item)}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default AnimatedText
