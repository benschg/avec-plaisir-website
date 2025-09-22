import { Box, Typography, Container } from '@mui/material'
import { content } from '../data/content'
import { useTextColor } from '../components/DynamicBackground'

const HeroSection = () => {
  const { textColor, headingColor } = useTextColor()
  return (
    <>
      {/* First Section - Greeting */}
      <Box
        id="hero"
        sx={{
          pt: 24,
          pb: 0,
          mt: 0,
          mb: 4,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h1"
            sx={{
              textAlign: 'center',
              fontSize: { xs: '3rem', md: '6rem' },
              fontWeight: 600,
              color: headingColor,
              transition: 'color 0.8s ease',
              mb: 6,
              lineHeight: 1.2,
            }}
          >
            {content.hero.greeting}
          </Typography>
        </Container>
      </Box>

      {/* Logo Section */}
      <Box
        sx={{
          py: 8,
          my: 4,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          {/* Flower logo */}
          <Box
            sx={{
              mb: 4,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                width: '80px',
                height: '80px',
                backgroundColor: textColor,
                maskImage: 'url(/avec-plaisir-flower-white.svg)',
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskImage: 'url(/avec-plaisir-flower-white.svg)',
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                transition: 'background-color 0.8s ease',
              }}
            />
          </Box>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1.5rem', md: '1.8rem' },
              color: textColor,
              transition: 'color 0.8s ease',
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.7,
              mb: 6,
            }}
          >
            {content.hero.intro}
          </Typography>
        </Container>
      </Box>

      {/* Owner Quote Section */}
      <Box
        sx={{
          py: 8,
          my: 4,
        }}
      ></Box>
    </>
  )
}

export default HeroSection
