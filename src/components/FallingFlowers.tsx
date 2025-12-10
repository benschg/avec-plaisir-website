import { useEffect, useRef } from 'react'
import { Box } from '@mui/material'

const FallingFlowers = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const iconPath = '/avec-plaisir-flower-white.svg'

  useEffect(() => {
    const createIconTrail = (x: number, y: number) => {
      if (!containerRef.current) return

      const icon = document.createElement('img')
      icon.src = iconPath

      const rotation = Math.random() * 60 - 30 // Slight random rotation
      const scale = 0.6 + Math.random() * 0.4
      const fadeOutDuration = 1500 // 1.5 seconds to fade

      Object.assign(icon.style, {
        position: 'absolute',
        left: `${x - 15}px`, // Center the icon on cursor
        top: `${y - 15}px`,
        width: '30px',
        height: 'auto',
        pointerEvents: 'none',
        userSelect: 'none',
        transform: `rotate(${rotation}deg) scale(${scale})`,
        transition: `opacity ${fadeOutDuration}ms ease-out, transform ${fadeOutDuration}ms ease-out`,
        opacity: '0.8',
        zIndex: '9999',
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

    // Throttle mouse move events
    let lastTime = 0
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastTime < 50) return // Create flower more frequently for a continuous trail
      lastTime = now

      createIconTrail(
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
