import { Typography, Container, Button } from '@mui/material'

const ContactCallToAction = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
      <Typography
        variant="h4"
        sx={{ fontSize: '3em', fontWeight: '300', fontFamily: 'Jost', mb: 4 }}
      >
        Brauchen Sie blumige Beratung? Wir freuen uns auf Ihre Kontaktaufnahme!
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={() => {
          document
            .getElementById('kontakt')
            ?.scrollIntoView({ behavior: 'smooth' })
        }}
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
  )
}

export default ContactCallToAction
