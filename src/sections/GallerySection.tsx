import { useRef, useLayoutEffect } from 'react'
import { Box, Container, Grid, useMediaQuery, useTheme } from '@mui/material'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
            alignItems: 'center',
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
        </Box>
      ) : (
        // Desktop: Grid layout
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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
          </Container>
        </Box>
      )}
    </Box>
  )
}

export default GallerySection
