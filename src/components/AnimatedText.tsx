import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { useTextColor } from './DynamicBackground'

interface AnimatedTextProps {
  words: string[]
  fontSize?: { xs: string; md: string }
  interval?: number
}

const AnimatedText = ({ words, fontSize = { xs: '1.8rem', md: '8rem' }, interval = 3000 }: AnimatedTextProps) => {
  const { headingColor } = useTextColor()
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true)

      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length)
        setIsAnimating(false)
      }, 500)
    }, interval)

    return () => clearInterval(timer)
  }, [words.length, interval])

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        alignItems: 'baseline',
        fontFamily: 'Inter',
        fontSize: fontSize,
        fontWeight: 300,
        color: headingColor,
        lineHeight: 1.3,
        gap: '0.3em',
      }}
    >
      <Box component="span">avec</Box>

      <Box
        sx={{
          position: 'relative',
          minWidth: { xs: '3em', md: '6em' },
          height: '1em',
          overflow: 'hidden',
        }}
      >
        <Box
          component="span"
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            whiteSpace: 'nowrap',
            transform: isAnimating ? 'translateY(-100%)' : 'translateY(0)',
            opacity: isAnimating ? 0 : 1,
            transition: 'all 0.5s ease-in-out',
          }}
        >
          {words[currentWordIndex]}
        </Box>

        {isAnimating && (
          <Box
            component="span"
            sx={{
              position: 'absolute',
              left: 0,
              top: 0,
              whiteSpace: 'nowrap',
              transform: 'translateY(100%)',
              opacity: 0,
              animation: 'slideInFromTop 0.5s ease-in-out forwards',
              '@keyframes slideInFromTop': {
                from: {
                  transform: 'translateY(100%)',
                  opacity: 0,
                },
                to: {
                  transform: 'translateY(0)',
                  opacity: 1,
                },
              },
            }}
          >
            {words[(currentWordIndex + 1) % words.length]}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default AnimatedText