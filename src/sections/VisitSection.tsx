import { Box, Container, Typography } from '@mui/material'

const VisitSection = () => {
  return (
    <Box
      id="visit"
      sx={{
        minHeight: '100vh',
        height: { xs: 'auto', md: '100vh' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="lg">
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
            overflow: 'hidden',
          }}
        >
          {/* Background Image */}
          <img
            src="/images/NRP_9162-low-scaled-uai-2133x1707.jpg"
            alt="Flower shop interior"
            style={{
              width: '90%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: '5%',
              zIndex: 1,
            }}
          />

          {/* Left vertical text */}
          <Typography
            variant="h4"
            sx={{
              position: 'absolute',
              left: { xs: '5%', md: 10 },
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
            variant="h4"
            sx={{
              position: 'absolute',
              right: { xs: '5%', md: 10 },
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
