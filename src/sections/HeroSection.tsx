import { Box, Typography, Container } from '@mui/material'
import { content } from '../data/content'

const HeroSection = () => {
  return (
    <>
      {/* First Section - Greeting */}
      <Box
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
              color: '#ffffff',
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
            <img
              src="/images/Flower-wht-150x150.png"
              alt="avec plaisir flower logo"
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'contain',
              }}
            />
          </Box>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1.5rem', md: '1.8rem' },
              color: '#ffffff',
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
