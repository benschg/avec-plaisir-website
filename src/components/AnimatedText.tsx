import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { useTextColor } from './DynamicBackground'

const AnimatedText = ({
  words,
  fontSize = { xs: '1.8rem', md: '8rem' },
  interval = 3000,
}: {
  words: string[]
  fontSize?: { xs: string; md: string }
  interval?: number
}) => {
  const { headingColor } = useTextColor()
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length)
    }, interval)

    return () => clearInterval(timer)
  }, [words.length, interval])

  return (
    <Box
      sx={{
        display: 'inline-flex',
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
          lineHeight: 'inherit',
          display: 'inline-block',
        }}
      >
        <Box
          component="span"
          key={currentWordIndex}
          sx={{
            display: 'inline-block',
            animation: 'slideIn 0.5s ease-in-out',
            '@keyframes slideIn': {
              from: {
                transform: 'translateY(-100%)',
                opacity: 0,
              },
              to: {
                transform: 'translateY(0)',
                opacity: 1,
              },
            },
          }}
        >
          {words[currentWordIndex]}
        </Box>
      </Box>
    </Box>
  )
}

export default AnimatedText
