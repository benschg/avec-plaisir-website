import { Box, Typography, Container, Grid } from '@mui/material'
import { services } from '../data/services'

const ServicesSection = () => {
  return (
    <Box
      id="angebot"
      sx={{
        py: 10,
        my: 4,
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            mb: 8,
            color: '#ffffff',
            fontSize: { xs: '1.8rem', md: '2.5rem' },
            fontWeight: 400,
          }}
        >
          Unser Angebot
        </Typography>

        <Grid container spacing={6}>
          {services.map((service) => (
            <Grid size={{ xs: 12, sm: 6 }} key={service.id}>
              <Box
                sx={{
                  textAlign: 'center',
                  py: 4,
                }}
              >
                {/* Service Icon */}
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    mx: 'auto',
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={service.icon}
                    alt={service.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </Box>

                <Typography
                  variant="h5"
                  sx={{
                    mb: 2,
                    color: '#333333',
                    fontWeight: 500,
                    fontSize: '1.3rem',
                  }}
                >
                  {service.title}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: '#666666',
                    lineHeight: 1.7,
                    fontSize: '1rem',
                  }}
                >
                  {service.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default ServicesSection
