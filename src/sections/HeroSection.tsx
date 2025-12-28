import { Box, Typography, Container } from '@mui/material'
import { content } from '../data/content'
import { useTextColor } from '../components/DynamicBackground'

const HeroSection = () => {
  const { textColor, headingColor } = useTextColor()
  return (
    <Box
      id="hero"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        boxSizing: 'border-box',
        pt: { xs: 18, md: 10 },
        pb: { xs: 4, md: 6 },
      }}
    >
      {/* Greeting */}
      <Container maxWidth="lg">
        <Typography
          variant="h1"
          sx={{
            textAlign: 'center',
            fontSize: { xs: '3rem', md: '6rem' },
            fontWeight: 600,
            color: headingColor,
            transition: 'color 0.8s ease',
            lineHeight: 1.2,
          }}
        >
          {content.hero.greeting}
        </Typography>
      </Container>

      {/* Logo and Intro */}
      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
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
            maxWidth: 800,
            mx: 'auto',
            lineHeight: 1.7,
            whiteSpace: 'pre-line',
          }}
        >
          {content.hero.intro}
        </Typography>
      </Container>

      {/* Spacer for even distribution */}
      <Box />
    </Box>
  )
}

export default HeroSection
