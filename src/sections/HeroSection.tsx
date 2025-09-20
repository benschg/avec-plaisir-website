import { Box, Typography, Container } from '@mui/material'
import { content } from '../data/content'

const HeroSection = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
        pt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: 'center',
            maxWidth: 800,
            mx: 'auto',
            py: 8,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              color: 'primary.main',
              mb: 2,
              fontWeight: 300,
            }}
          >
            {content.hero.title}
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              color: 'secondary.main',
              mb: 4,
              fontWeight: 400,
            }}
          >
            {content.hero.subtitle}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.1rem' },
              color: 'text.secondary',
              lineHeight: 1.6,
              fontStyle: 'italic',
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            {content.hero.tagline}
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default HeroSection