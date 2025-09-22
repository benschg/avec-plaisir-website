import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { useTextColor } from './DynamicBackground'

type AnimatedItem =
  | string
  | { type: 'svg'; src: string; alt?: string; filter?: string }

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
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length)
        setIsAnimating(false)
      }, 400)
    }, interval)

    return () => clearInterval(timer)
  }, [words.length, interval])

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'baseline',
        fontFamily: 'Lora',
        fontSize: fontSize,
        fontWeight: 300,
        color: headingColor,
        lineHeight: 1.3,
        gap: '0.3em',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          minWidth: '4em',
          height: '1.3em',
          display: 'inline-block',
          overflow: 'hidden',
          verticalAlign: 'baseline',
        }}
      >
        <Box
          component="span"
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            whiteSpace: 'nowrap',
            textAlign: 'right',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'flex-end',
          }}
        >
          avec
        </Box>
      </Box>

      <Box
        sx={{
          position: 'relative',
          minWidth: { xs: '4em', md: '4em' },
          height: '1.3em',
          display: 'inline-block',
          overflow: 'hidden',
          verticalAlign: 'baseline',
        }}
      >
        {words.map((item, index) => {
          const isCurrent = index === currentWordIndex
          const isNext = index === (currentWordIndex + 1) % words.length

          if (!isCurrent && !isNext) return null

          const renderContent = () => {
            if (typeof item === 'string') {
              return item
            } else if (item.type === 'svg') {
              // Use a mask to apply the current text color to the SVG
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
              component="span"
              key={`${typeof item === 'string' ? item : item.src}-${index}`}
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                transform: isCurrent
                  ? isAnimating
                    ? 'translateY(-120%)'
                    : 'translateY(0)'
                  : isAnimating
                    ? 'translateY(0)'
                    : 'translateY(120%)',
                opacity: isCurrent
                  ? isAnimating
                    ? 0
                    : 1
                  : isAnimating
                    ? 1
                    : 0,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {renderContent()}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default AnimatedText
