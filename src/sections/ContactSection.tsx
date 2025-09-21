import { Box, Typography, Container, Grid, Link } from '@mui/material'
import { content } from '../data/content'
import { contactInfo } from '../data/contactInfo'

const ContactSection = () => {
  return (
    <Box id="kontakt" sx={{ py: 10, my: 4 }}>
      <Container maxWidth="md">
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            mb: 3,
            color: '#ffffff',
            fontSize: { xs: '1.8rem', md: '2.5rem' },
            fontWeight: 400,
          }}
        >
          Kontakt
        </Typography>

        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            mb: 8,
            color: '#666666',
            fontSize: { xs: '1rem', md: '1.1rem' },
            lineHeight: 1.7,
            maxWidth: 700,
            mx: 'auto',
          }}
        >
          {content.contact.title}
        </Typography>

        {/* Shop Image */}
        <Box
          sx={{
            mb: 8,
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              maxWidth: 600,
              mx: 'auto',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            }}
          >
            <img
              src="/images/imgi_4_shop-avec-plaisir-e1712241946807.png"
              alt="avec plaisir shop interior"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          </Box>
        </Box>

        <Grid container spacing={8}>
          {/* Contact Information */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  color: '#333333',
                  fontSize: '1.3rem',
                  fontWeight: 500,
                }}
              >
                Kontaktinformationen
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="body1"
                  sx={{ color: '#666666', lineHeight: 1.7, mb: 1 }}
                >
                  <strong>Adresse:</strong>
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: '#666666', lineHeight: 1.7 }}
                >
                  {contactInfo.address}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="body1"
                  sx={{ color: '#666666', lineHeight: 1.7, mb: 1 }}
                >
                  <strong>Telefon:</strong>
                </Typography>
                <Link
                  href={`tel:${contactInfo.phone}`}
                  sx={{
                    color: '#ffffff',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  {contactInfo.phone}
                </Link>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="body1"
                  sx={{ color: '#666666', lineHeight: 1.7, mb: 1 }}
                >
                  <strong>E-Mail:</strong>
                </Typography>
                <Link
                  href={`mailto:${contactInfo.email}`}
                  sx={{
                    color: '#ffffff',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  {contactInfo.email}
                </Link>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="body1"
                  sx={{ color: '#666666', lineHeight: 1.7, mb: 1 }}
                >
                  <strong>Instagram:</strong>
                </Typography>
                <Link
                  href={`https://instagram.com/${contactInfo.instagram.substring(1)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: '#ffffff',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  {contactInfo.instagram}
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* Opening Hours */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  color: '#333333',
                  fontSize: '1.3rem',
                  fontWeight: 500,
                }}
              >
                Öffnungszeiten
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="body1"
                  sx={{ color: '#666666', lineHeight: 1.7 }}
                >
                  {contactInfo.hours.weekdays}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="body1"
                  sx={{ color: '#666666', lineHeight: 1.7 }}
                >
                  {contactInfo.hours.saturday}
                </Typography>
              </Box>
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="body1"
                  sx={{ color: '#666666', lineHeight: 1.7 }}
                >
                  {contactInfo.hours.sunday}
                </Typography>
              </Box>

              <Typography
                variant="h6"
                sx={{
                  mt: 4,
                  mb: 2,
                  color: '#333333',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                }}
              >
                Newsletter
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: '#666666', lineHeight: 1.7 }}
              >
                {content.contact.newsletter}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default ContactSection
