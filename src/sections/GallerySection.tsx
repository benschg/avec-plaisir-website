import { Box, Container, Grid } from '@mui/material'

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
        height: '100vh',
        overflowY: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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

        </Grid>
      </Container>
    </Box>
  )
}

export default GallerySection
