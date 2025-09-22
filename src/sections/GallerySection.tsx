import { Box, Container, Grid, Typography } from '@mui/material'

const galleryImages = [
  '/images/imgi_50_NRP_9654-low-scaled.jpg',
  '/images/imgi_51_NRP_8709-low-scaled.jpg',
  '/images/imgi_52_NRP_8922-low-scaled.jpg',
  '/images/imgi_14_NRP_9663-low-scaled.jpg',
  '/images/imgi_15_NRP_9027-low-scaled.jpg',
  '/images/imgi_5_NRP_9528-low-scaled.jpg',
]

const GallerySection = () => {
  return (
    <Box
      id="gallery"
      sx={{
        py: 10,
        my: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {galleryImages.map((image, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Box
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  aspectRatio: '4/5',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    transition: 'transform 0.3s ease',
                  },
                }}
              >
                <img
                  src={image}
                  alt={`Flower arrangement ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </Box>
            </Grid>
          ))}

          {/* Full screen image with vertical text */}
          <Grid size={12} marginTop={20}>
            <Box
              sx={{
                position: 'relative',
                width: '90vv',
                height: { xs: '50vh', md: '60vh' },
                maxWidth: '1200px',
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
                auf Ihren Besuch!
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default GallerySection
