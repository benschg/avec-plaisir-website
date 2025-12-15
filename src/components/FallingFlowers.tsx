import { useEffect, useRef } from 'react'
import { Box } from '@mui/material'
import { useTextColor } from './DynamicBackground'

const FallingFlowers = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const iconPath = '/avec-plaisir-flower-white.svg'
  const { textColor } = useTextColor()

  // Store textColor in a ref so the event handler always has the current value
  const textColorRef = useRef(textColor)
  useEffect(() => {
    textColorRef.current = textColor
  }, [textColor])

  useEffect(() => {
    const createIconTrail = (x: number, y: number) => {
      if (!containerRef.current) return

      const icon = document.createElement('img')
      icon.src = iconPath

      const rotation = Math.random() * 60 - 30 // Slight random rotation
      const scale = 0.6 + Math.random() * 0.4
      const isInverted = Math.random() < 0.03 // 3% chance to be inverted color
      const fadeOutDuration = isInverted ? 3000 : 1500 // Inverted icons live longer

      // Determine filter based on current text color and inversion state
      const currentTextColor = textColorRef.current
      const isLightText =
        currentTextColor === '#ffffff' || currentTextColor.toLowerCase() === '#fff'

      let filter = 'none'
      if (isInverted) {
        // Inverted: if text is white, flower is black; if text is dark, flower is white
        filter = isLightText ? 'invert(1)' : 'none'
      } else {
        // Normal: match the text color (white SVG needs invert when text is dark)
        filter = isLightText ? 'none' : 'invert(1)'
      }

      // Calculate position accounting for scroll
      const scrollY = window.scrollY || window.pageYOffset
      const scrollX = window.scrollX || window.pageXOffset

      Object.assign(icon.style, {
        position: 'absolute',
        left: `${x + scrollX - 15}px`, // Center the icon on cursor, accounting for scroll
        top: `${y + scrollY - 15}px`,
        width: '30px',
        height: 'auto',
        pointerEvents: 'none',
        userSelect: 'none',
        transform: `rotate(${rotation}deg) scale(${scale})`,
        transition: `opacity ${fadeOutDuration}ms ease-out, transform ${fadeOutDuration}ms ease-out`,
        opacity: '0.8',
        zIndex: '9999',
        filter: filter,
      })

      containerRef.current.appendChild(icon)

      // Start fading out immediately
      requestAnimationFrame(() => {
        icon.style.opacity = '0'
        icon.style.transform = `rotate(${rotation}deg) scale(${scale * 0.5})` // Shrink slightly as it fades
      })

      // Remove icon after fade
      setTimeout(() => {
        if (icon.parentNode) {
          icon.parentNode.removeChild(icon)
        }
      }, fadeOutDuration)
    }

    // Throttle events
    let lastTime = 0
    let isTouching = false

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastTime < 50) return // Create flower more frequently for a continuous trail
      lastTime = now

      createIconTrail(
        e.clientX + Math.random() * 40 - 10,
        e.clientY + Math.random() * 40 - 10
      )
    }

    const handleTouchStart = () => {
      isTouching = true
    }

    const handleTouchMove = (e: TouchEvent) => {
      // Only create flowers when actively touching
      if (!isTouching) return

      const now = Date.now()
      if (now - lastTime < 50) return
      lastTime = now

      const touch = e.touches[0]
      if (touch) {
        createIconTrail(
          touch.clientX + Math.random() * 40 - 10,
          touch.clientY + Math.random() * 40 - 10
        )
      }
    }

    const handleTouchEnd = () => {
      isTouching = false
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        minHeight: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  )
}

export default FallingFlowers
