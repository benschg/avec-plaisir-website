import { Box, Typography, Container, Button } from '@mui/material'
import { useLenis } from '../hooks/useLenis'

const ContactCallToAction = () => {
  const { scrollTo } = useLenis()

  const handleClick = () => {
    const element = document.getElementById('kontakt')
    if (element) {
      scrollTo(element, { duration: 1.2 })
    }
  }

  return (
    <Box
      id="cta"
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography
          variant="h4"
          sx={{ fontSize: '3em', fontWeight: '300', fontFamily: 'Jost', mb: 4 }}
        >
          Brauchen Sie blumige Beratung? Wir freuen uns auf Ihre
          Kontaktaufnahme!
        </Typography>
        <Button
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
