import { Box, Typography, Container } from '@mui/material'
import { useTextColor } from '../components/DynamicBackground'

const ServicesIntroSection = () => {
  const { headingColor } = useTextColor()

  return (
    <Box
      id="angebot-intro"
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Box display={'flex'} justifyContent={'center'}>
          <Box
            maxWidth={{ xs: '90%', md: '1000px' }}
            display={'flex'}
            justifyContent={'center'}
            alignContent={'center'}
            alignItems={'center'}
            textAlign={'center'}
            flexDirection={'column'}
          >
            <Typography
              variant="h2"
              sx={{ color: headingColor }}
              fontSize={{ xs: '3.0rem', md: '8rem' }}
              fontFamily={'Lora'}
              fontWeight={'600'}
            >
              avec plaisir!
            </Typography>
            <Typography
              variant="h2"
              fontFamily={'Lora'}
              fontWeight={'600'}
              sx={{ color: headingColor }}
              fontSize={{ xs: '1.1rem', md: '3rem' }}
            >
              Ihre Blumen nach Wunsch.
            </Typography>

            <Typography
              maxWidth={'500px'}
              paddingTop={8}
              paddingBottom={8}
              variant="body1"
              fontSize={{ xs: '1.1rem', md: '1.5rem' }}
            >
              Wir erfüllen Ihren Blumenwunsch mit grosser Freude. Egal ob
              einmalig oder wiederkehrend, für den Küchentisch oder ein grosses
              Bankett, Ihre Bestellung wird mit äusserster Sorgfalt und so
              schnell wie möglich erledigt.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default ServicesIntroSection
