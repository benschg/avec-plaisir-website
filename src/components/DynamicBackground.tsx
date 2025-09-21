import { useEffect, useState, createContext, useContext } from 'react'
import { Box, GlobalStyles } from '@mui/material'
import { sectionColorConfigs } from '../config/sectionColors'
import { sectionsConfig } from '../config/sections'

// Function to determine if background is light or dark
const isLightColor = (color: string): boolean => {
  const hex = color.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 128
}

// Create context for text color
export const TextColorContext = createContext({
  textColor: '#ffffff',
  headingColor: '#ffffff',
  secondaryTextColor: 'rgba(255, 255, 255, 0.8)',
})

export const useTextColor = () => useContext(TextColorContext)

const DynamicBackground = ({ children }: { children?: React.ReactNode }) => {
  const [currentConfig, setCurrentConfig] = useState(sectionColorConfigs.hero)
  const [textColors, setTextColors] = useState({
    textColor: '#ffffff',
    headingColor: '#ffffff',
    secondaryTextColor: 'rgba(255, 255, 255, 0.8)',
  })

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2

      // Get all sections using centralized configuration
      const sections = sectionsConfig.map((section, index) => ({
        id: section.id,
        element: section.id === 'hero'
          ? document.querySelector('#hero') || document.querySelector('main > *:first-child')
          : section.id === 'gallery'
          ? document.querySelector('[id*="gallery"]') || document.querySelector(`main > *:nth-child(${index + 1})`)
          : document.getElementById(section.id),
      }))

      // Find current section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.element) {
          const rect = section.element.getBoundingClientRect()
          const sectionTop = rect.top + window.scrollY

          if (scrollPosition >= sectionTop) {
            const newConfig = sectionColorConfigs[section.id]
            if (newConfig && newConfig.background !== currentConfig.background) {
              setCurrentConfig(newConfig)

              // Use custom colors if provided, otherwise auto-calculate
              const backgroundColor = newConfig.background
              const isLight = isLightColor(backgroundColor)

              setTextColors({
                textColor: newConfig.textColor || (isLight ? '#333333' : '#ffffff'),
                headingColor: newConfig.headingColor || (isLight ? '#333333' : '#ffffff'),
                secondaryTextColor: newConfig.secondaryTextColor || (isLight ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.8)'),
              })
            }
            break
          }
        }
      }
    }

    // Initial check
    handleScroll()

    // Add scroll listener with throttling
    let ticking = false
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', scrollListener)
    return () => window.removeEventListener('scroll', scrollListener)
  }, [currentConfig.background])

  return (
    <TextColorContext.Provider value={textColors}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: currentConfig.background,
          transition: 'background-color 0.8s ease',
          zIndex: -1,
        }}
      />
      <GlobalStyles
        styles={{
          'body, body *': {
            color: `${textColors.textColor} !important`,
            transition: 'color 0.8s ease',
          },
          'h1, h2, h3, h4, h5, h6': {
            color: `${textColors.headingColor} !important`,
          },
          '.MuiTypography-root': {
            color: 'inherit',
          },
          '.MuiButton-root': {
            color: 'inherit',
          },
          // Navigation specific overrides
          'header .MuiToolbar-root *': {
            color: `${textColors.headingColor} !important`,
          },
          // Keep images and icons unaffected
          'img, svg': {
            color: 'inherit',
          }
        }}
      />
      {children}
    </TextColorContext.Provider>
  )
}

export default DynamicBackground
