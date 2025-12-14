import { Box, Typography, Container, Button } from '@mui/material'
import { useLenis } from '../hooks/useLenis'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ContactCallToAction = () => {
  const { scrollTo } = useLenis()
  const textRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = () => {
    const element = document.getElementById('kontakt')
    if (element) {
      scrollTo(element, { duration: 1.2 })
    }
  }

  useEffect(() => {
    if (!textRef.current) return

    const words = textRef.current.querySelectorAll('.word')

    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(words, {
        opacity: 0,
        y: 30,
      })

      if (buttonRef.current) {
        gsap.set(buttonRef.current, {
          opacity: 0,
          y: 20,
        })
      }

      // Animate words on scroll
      gsap.to(words, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // Animate button after words
      if (buttonRef.current) {
        gsap.to(buttonRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          delay: 0.8,
        })
      }
    }, textRef)

    return () => ctx.revert()
  }, [])

  const text = 'Brauchst du blumige Beratung? Wir freuen uns auf deine Kontaktaufnahme!'
  const words = text.split(' ')

  return (
    <Box
      id="cta"
      sx={{
        minHeight: '100vh',
        height: { xs: 'auto', md: '100vh' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography
          ref={textRef}
          variant="h4"
          sx={{ fontSize: '3em', fontWeight: '300', fontFamily: 'Jost', mb: 4 }}
        >
          {words.map((word, index) => (
            <Box
              component="span"
              key={index}
              className="word"
              sx={{ display: 'inline-block', mr: '0.3em' }}
            >
              {word}
            </Box>
          ))}
        </Typography>
        <Button
          ref={buttonRef}
          variant="contained"
          size="large"
          onClick={handleClick}
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            px: 4,
            py: 2,
            fontSize: '1.2rem',
            fontWeight: '500',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          Kontakt
        </Button>
      </Container>
    </Box>
  )
}

export default ContactCallToAction
