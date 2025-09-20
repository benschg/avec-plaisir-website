import { Box, Typography, Container } from '@mui/material'
import { content } from '../data/content'

const HeroSection = () => {
  return (
    <>
      {/* First Section - Greeting */}
      <Box
        sx={{
          backgroundColor: '#ffffff',
          pt: 12,
          pb: 8,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h1"
            sx={{
              textAlign: 'center',
              fontSize: { xs: '2rem', md: '3.5rem' },
              fontWeight: 300,
              color: '#333333',
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
          backgroundColor: '#f9f9f9',
          py: 8,
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
                width: '120px',
                height: '120px',
                objectFit: 'contain',
              }}
            />
          </Box>

          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 300,
              color: '#f28c86',
              mb: 2,
            }}
          >
            {content.hero.title}
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '1.5rem', md: '2rem' },
              fontWeight: 400,
              color: '#f28c86',
              mb: 4,
            }}
          >
            {content.hero.subtitle}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.1rem' },
              color: '#666666',
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
          backgroundColor: '#ffffff',
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              fontStyle: 'italic',
              color: '#666666',
              lineHeight: 1.6,
              maxWidth: 700,
              mx: 'auto',
              mb: 2,
            }}
          >
            "{content.hero.ownerQuote}"
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              textAlign: 'center',
              color: '#999999',
              fontSize: '1rem',
            }}
          >
            {content.hero.ownerName}
          </Typography>
        </Container>
      </Box>
    </>
  )
}

export default HeroSection