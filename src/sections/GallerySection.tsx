import { useRef, useLayoutEffect } from 'react'
import { Box, Container, Grid, useMediaQuery, useTheme, Typography } from '@mui/material'
import { Instagram } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { contactInfo } from '../data/contactInfo'

gsap.registerPlugin(ScrollTrigger)

const galleryImages = [
  '/images/imgi_50_NRP_9654-low-scaled.jpg',
  '/images/imgi_51_NRP_8709-low-scaled.jpg',
  '/images/imgi_52_NRP_8922-low-scaled.jpg',
  '/images/imgi_14_NRP_9663-low-scaled.jpg',
  '/images/imgi_15_NRP_9027-low-scaled.jpg',
  '/images/imgi_5_NRP_9528-low-scaled.jpg',
]

const GallerySection = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const sectionRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Setup horizontal scroll animation
  useLayoutEffect(() => {
    if (!isMobile || !scrollContainerRef.current || !triggerRef.current) return

    const scrollContainer = scrollContainerRef.current
    const totalScrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth

    const ctx = gsap.context(() => {
      gsap.to(scrollContainer, {
        scrollLeft: totalScrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: () => `+=${totalScrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    })

    return () => ctx.revert()
  }, [isMobile])

  return (
    <Box id="gallery" ref={sectionRef}>
      {isMobile ? (
        // Mobile: Pinned horizontal scroll with GSAP ScrollTrigger
        <Box
          ref={triggerRef}
          sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Box
            ref={scrollContainerRef}
            sx={{
              width: '100%',
              overflowX: 'hidden',
              display: 'flex',
              gap: 2,
              px: 2,
            }}
          >
            {galleryImages.map((image, index) => (
              <Box
                key={index}
                sx={{
                  flexShrink: 0,
                  width: '80vw',
                  borderRadius: 2,
                  overflow: 'hidden',
                  aspectRatio: '4/5',
                }}
              >
                <img
                  src={image}
                  alt={`Flower arrangement ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </Box>
            ))}
          </Box>

          {/* Instagram link for mobile - fixed below images */}
          <Box
            component="a"
            href={`https://instagram.com/${contactInfo.instagram.substring(1)}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              mt: 3,
              textDecoration: 'none',
              color: 'inherit',
              transition: 'opacity 0.3s ease',
              '&:hover': {
                opacity: 0.7,
              },
            }}
          >
            <Instagram size={24} />
            <Typography variant="body1">{contactInfo.instagram}</Typography>
          </Box>
        </Box>
      ) : (
        // Desktop: Grid layout
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 4,
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={2}>
              {galleryImages.map((image, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <Box
                    sx={{
                      borderRadius: 2,
                      overflow: 'hidden',
                      aspectRatio: '4/5',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        transition: 'transform 0.3s ease',
                      },
                    }}
                  >
                    <img
                      src={image}
                      alt={`Flower arrangement ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>

            {/* Instagram link for desktop */}
            <Box
              component="a"
              href={`https://instagram.com/${contactInfo.instagram.substring(1)}`}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                mt: 4,
                textDecoration: 'none',
                color: 'inherit',
                transition: 'opacity 0.3s ease',
                '&:hover': {
                  opacity: 0.7,
                },
              }}
            >
              <Instagram size={24} />
              <Typography variant="body1">{contactInfo.instagram}</Typography>
            </Box>
          </Container>
        </Box>
      )}
    </Box>
  )
}

export default GallerySection
