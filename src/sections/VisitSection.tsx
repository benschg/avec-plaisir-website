import { useRef, useLayoutEffect } from 'react'
import { Box, Container, Typography } from '@mui/material'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const VisitSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const leftTextRef = useRef<HTMLSpanElement>(null)
  const rightTextRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    if (!sectionRef.current || !imageRef.current) return

    const ctx = gsap.context(() => {
      // Animate image from right to left as we scroll past
      gsap.fromTo(
        imageRef.current,
        { xPercent: 25 },
        {
          xPercent: -25,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      )

      // "wir freuen uns" moves up
      gsap.fromTo(
        leftTextRef.current,
        { yPercent: 60 },
        {
          yPercent: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      )

      // "auf deinen Besuch!" moves down
      gsap.fromTo(
        rightTextRef.current,
        { yPercent: -60 },
        {
          yPercent: 60,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <Box
      id="visit"
      ref={sectionRef}
      sx={{
        minHeight: '100vh',
        height: { xs: 'auto', md: '100vh' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="lg">
        {/* Outer container for positioning text - no overflow clipping */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: { xs: '60vh', md: '70vh' },
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Image container with overflow hidden */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              overflow: 'hidden',
            }}
          >
            <img
              ref={imageRef}
              src="/images/NRP_9162-low-scaled-uai-2133x1707.jpg"
              alt="Flower shop interior"
              style={{
                width: '120%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                left: '-10%',
              }}
            />
          </Box>

          {/* Left vertical text */}
          <Typography
            ref={leftTextRef}
            variant="h4"
            sx={{
              position: 'absolute',
              left: { xs: 0, md: 10 },
              top: { xs: '50%', md: '50%' },
              transform: {
                xs: 'translate(-50%, -50%) rotate(-90deg)',
                md: 'translateY(-100%) translateX(-43%) rotate(-90deg)',
              },
              transformOrigin: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: { xs: '1.5rem', md: '5rem' },
              zIndex: 2,
              whiteSpace: 'nowrap',
            }}
          >
            wir freuen uns
          </Typography>

          {/* Right vertical text */}
          <Typography
            ref={rightTextRef}
            variant="h4"
            sx={{
              position: 'absolute',
              right: { xs: 0, md: 10 },
              top: { xs: '50%', md: '50%' },
              transform: {
                xs: 'translate(50%, -50%) rotate(90deg)',
                md: 'translateY(-100%) translateX(43%) rotate(90deg)',
              },
              transformOrigin: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: { xs: '1.5rem', md: '4rem' },
              zIndex: 2,
              whiteSpace: 'nowrap',
            }}
          >
            auf deinen Besuch!
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default VisitSection
