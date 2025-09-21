import { useEffect, useRef } from 'react'
import { Box } from '@mui/material'

const FallingFlowers = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const flowerEmojis = ['🌸', '🌺', '🌼', '🌷']

  useEffect(() => {
    const createFlowerTrail = (x: number, y: number) => {
      if (!containerRef.current) return

      const flower = document.createElement('div')
      flower.textContent =
        flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)]

      const rotation = Math.random() * 60 - 30 // Slight random rotation
      const scale = 0.6 + Math.random() * 0.4
      const fadeOutDuration = 1500 // 1.5 seconds to fade

      Object.assign(flower.style, {
        position: 'absolute',
        left: `${x - 10}px`, // Center the flower on cursor
        top: `${y - 10}px`,
        fontSize: '16px',
        pointerEvents: 'none',
        userSelect: 'none',
        transform: `rotate(${rotation}deg) scale(${scale})`,
        transition: `opacity ${fadeOutDuration}ms ease-out, transform ${fadeOutDuration}ms ease-out`,
        opacity: '0.8',
        zIndex: '9999',
      })

      containerRef.current.appendChild(flower)

      // Start fading out immediately
      requestAnimationFrame(() => {
        flower.style.opacity = '0'
        flower.style.transform = `rotate(${rotation}deg) scale(${scale * 0.5})` // Shrink slightly as it fades
      })

      // Remove flower after fade
      setTimeout(() => {
        if (flower.parentNode) {
          flower.parentNode.removeChild(flower)
        }
      }, fadeOutDuration)
    }

    // Throttle mouse move events
    let lastTime = 0
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastTime < 50) return // Create flower more frequently for a continuous trail
      lastTime = now

      createFlowerTrail(
        e.clientX + Math.random() * 40 - 10,
        e.clientY + Math.random() * 40 - 10
      )
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    />
  )
}

export default FallingFlowers
