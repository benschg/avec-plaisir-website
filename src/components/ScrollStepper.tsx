import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { useTextColor } from './DynamicBackground'
import { sectionsConfig } from '../config/sections'
import { useLenis } from '../hooks/useLenis'

interface SectionProgress {
  id: string
  title: string
  isActive: boolean
  progress: number
}

// Filter out sections that shouldn't appear in the stepper
const visibleSections = sectionsConfig.filter(
  (section) => section.id !== 'avec-animated' && section.id !== 'footer'
)

const ScrollStepper = () => {
  const { textColor, headingColor, backgroundColor } = useTextColor()
  const { lenis, scrollTo } = useLenis()
  const [sections, setSections] = useState<SectionProgress[]>(
    visibleSections.map((section, index) => ({
      id: section.id,
      title: section.title,
      isActive: index === 0,
      progress: 0,
    }))
  )

  useEffect(() => {
    if (!lenis) return

    const handleScroll = () => {
      const scrollPosition = lenis.scroll
      const windowHeight = window.innerHeight

      // Get all section elements using configuration
      const sectionElements = visibleSections.map((section) => ({
        id: section.id,
        title: section.title,
        element:
          section.id === 'hero'
            ? document.querySelector('#hero')
            : section.id === 'gallery'
              ? document.querySelector('[id*="gallery"]')
              : document.getElementById(section.id),
      }))

      const updatedSections = sectionElements.map((section, index) => {
        const title = section.title

        if (!section.element) {
          return {
            id: section.id,
            title,
            isActive: false,
            progress: 0,
          }
        }

        const rect = section.element.getBoundingClientRect()
        const sectionTop = rect.top + scrollPosition
        const sectionHeight = rect.height
        const sectionBottom = sectionTop + sectionHeight

        // Check if section is in viewport
        // For the first section (hero), consider it active when at the top of the page
        const isActive =
          index === 0
            ? lenis.scroll < Math.max(100, sectionHeight * 0.3) ||
              (scrollPosition + windowHeight / 2 >= sectionTop &&
                scrollPosition + windowHeight / 2 < sectionBottom)
            : scrollPosition + windowHeight / 2 >= sectionTop &&
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
          title,
          isActive,
          progress,
        }
      })

      setSections(updatedSections)
    }

    // Listen to Lenis scroll events
    lenis.on('scroll', handleScroll)
    handleScroll() // Initial call

    return () => {
      lenis.off('scroll', handleScroll)
    }
  }, [lenis])

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      scrollTo(element, { duration: 1.2 })
    }
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        right: { xs: -4, md: 24 },
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '&:hover .labels-container': {
          opacity: 1,
          visibility: 'visible',
        },
      }}
    >
      {/* Section indicators */}
      <Box sx={{ position: 'relative' }}>
        {/* Labels container with page background */}
        <Box
          className="labels-container"
          sx={{
            position: 'absolute',
            right: 24,
            top: 0,
            opacity: 0,
            visibility: 'hidden',
            transition: 'opacity 0.3s ease, visibility 0.3s ease',
            backgroundColor,
            borderRadius: 2,
            px: 1.5,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {sections.map((section, index) => (
            <Typography
              key={section.id}
              variant="caption"
              onClick={() => handleSectionClick(section.id)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                color: textColor,
                fontSize: '0.75rem',
                fontWeight: section.isActive ? 600 : 400,
                textTransform: 'capitalize',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                height: 12,
                mb: index < sections.length - 1 ? 3 : 0,
                opacity: section.isActive ? 1 : 0.6,
                transition: 'all 0.3s ease',
                '&:hover': {
                  opacity: 1,
                },
              }}
            >
              {section.title}
            </Typography>
          ))}
        </Box>
        {sections.map((section, index) => (
          <Box
            key={section.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              height: 12,
              mb: index < sections.length - 1 ? 3 : 0,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              opacity: section.isActive ? 1 : 0.6,
            }}
            onClick={() => handleSectionClick(section.id)}
          >
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
