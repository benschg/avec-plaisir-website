import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { useTextColor } from './DynamicBackground'
import { sectionsConfig } from '../config/sections'

interface SectionProgress {
  id: string
  title: string
  isActive: boolean
  progress: number
}

const ScrollStepper = () => {
  const { textColor, headingColor } = useTextColor()
  const [sections, setSections] = useState<SectionProgress[]>(
    sectionsConfig.map((section, index) => ({
      id: section.id,
      title: section.title,
      isActive: index === 0,
      progress: 0,
    }))
  )

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      // Get all section elements using configuration
      const sectionElements = sectionsConfig.map((section, index) => ({
        id: section.id,
        element:
          section.id === 'hero'
            ? document.querySelector('#hero') ||
              document.querySelector('main > *:first-child')
            : section.id === 'gallery'
              ? document.querySelector('[id*="gallery"]') ||
                document.querySelector(`main > *:nth-child(${index + 1})`)
              : document.getElementById(section.id),
      }))

      const updatedSections = sectionElements.map((section, index) => {
        if (!section.element) {
          return {
            id: section.id,
            title: sections[index]?.title || section.id,
            isActive: false,
            progress: 0,
          }
        }

        const rect = section.element.getBoundingClientRect()
        const sectionTop = rect.top + scrollPosition
        const sectionHeight = rect.height
        const sectionBottom = sectionTop + sectionHeight

        // Check if section is in viewport
        const isActive =
          scrollPosition + windowHeight / 2 >= sectionTop &&
          scrollPosition + windowHeight / 2 < sectionBottom

        // Calculate progress through section (0-100)
        let progress = 0
        if (scrollPosition + windowHeight / 2 >= sectionTop) {
          if (scrollPosition + windowHeight / 2 >= sectionBottom) {
            progress = 100
          } else {
            progress = Math.min(
              100,
              Math.max(
                0,
                ((scrollPosition + windowHeight / 2 - sectionTop) /
                  sectionHeight) *
                  100
              )
            )
          }
        }

        return {
          id: section.id,
          title: sections[index]?.title || section.id,
          isActive,
          progress,
        }
      })

      setSections(updatedSections)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Box
      sx={{
        position: 'fixed',
        right: 24,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1000,
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        alignItems: 'center',
        '&:hover .section-label': {
          opacity: 1,
          transform: 'translateY(-50%) translateX(-10px)',
          visibility: 'visible',
        },
      }}
    >
      {/* Section indicators */}
      <Box sx={{ position: 'relative' }}>
        {sections.map((section, index) => (
          <Box
            key={section.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              mb: index < sections.length - 1 ? 3 : 0,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              opacity: section.isActive ? 1 : 0.6,
              transform: section.isActive ? 'scale(1.1)' : 'scale(1)',
              position: 'relative',
              width: 'auto',
            }}
            onClick={() => {
              const element = document.getElementById(section.id)
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          >
            {/* Section title - positioned to the left */}
            <Typography
              className="section-label"
              variant="caption"
              sx={{
                position: 'absolute',
                right: '100%',
                top: '50%',
                transform: 'translateY(-50%) translateX(20px)',
                color: textColor,
                fontSize: '0.75rem',
                fontWeight: section.isActive ? 600 : 400,
                transition: 'all 0.3s ease',
                textTransform: 'capitalize',
                opacity: 0,
                visibility: 'hidden',
                whiteSpace: 'nowrap',
                mr: 1,
              }}
            >
              {section.title}
            </Typography>

            {/* Section dot */}
            <Box
              sx={{
                width: section.isActive ? 12 : 8,
                height: section.isActive ? 12 : 8,
                borderRadius: '50%',
                backgroundColor: section.isActive
                  ? headingColor
                  : 'rgba(255, 255, 255, 0.4)',
                transition: 'all 0.3s ease',
                position: 'relative',
              }}
            >
              {/* Progress ring */}
              {section.isActive && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: -4,
                    left: -4,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    border: `2px solid ${headingColor}`,
                    borderTopColor: 'transparent',
                    transform: `rotate(${(section.progress / 100) * 360}deg)`,
                    transition: 'transform 0.3s ease',
                  }}
                />
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default ScrollStepper
