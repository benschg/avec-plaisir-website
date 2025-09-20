import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Link,
} from '@mui/material'
import { Phone, Email, LocationOn, Instagram } from '@mui/icons-material'
import { contactInfo, content } from '../data/content'

const ContactSection = () => {
  return (
    <Box id="kontakt" sx={{ py: 8, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            mb: 2,
            color: 'secondary.main',
            fontSize: { xs: '1.8rem', md: '2.2rem' },
          }}
        >
          Kontakt
        </Typography>

        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            mb: 6,
            color: 'text.secondary',
            fontWeight: 400,
            maxWidth: 600,
            mx: 'auto',
          }}
        >
          {content.contact.title}
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: '100%',
                border: '1px solid',
                borderColor: 'primary.light',
                borderRadius: 2,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 3, color: 'primary.main' }}
                >
                  Kontaktinformationen
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOn sx={{ mr: 2, color: 'secondary.main' }} />
                  <Typography variant="body1">
                    {contactInfo.address}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Phone sx={{ mr: 2, color: 'secondary.main' }} />
                  <Link
                    href={`tel:${contactInfo.phone}`}
                    sx={{ color: 'text.primary', textDecoration: 'none' }}
                  >
                    {contactInfo.phone}
                  </Link>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Email sx={{ mr: 2, color: 'secondary.main' }} />
                  <Link
                    href={`mailto:${contactInfo.email}`}
                    sx={{ color: 'text.primary', textDecoration: 'none' }}
                  >
                    {contactInfo.email}
                  </Link>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Instagram sx={{ mr: 2, color: 'secondary.main' }} />
                  <Link
                    href={`https://instagram.com/${contactInfo.instagram.substring(1)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: 'text.primary', textDecoration: 'none' }}
                  >
                    {contactInfo.instagram}
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: '100%',
                border: '1px solid',
                borderColor: 'primary.light',
                borderRadius: 2,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 3, color: 'primary.main' }}
                >
                  Öffnungszeiten
                </Typography>

                <Typography variant="body1" sx={{ mb: 1 }}>
                  {contactInfo.hours.weekdays}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {contactInfo.hours.saturday}
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  {contactInfo.hours.sunday}
                </Typography>

                <Typography
                  variant="h6"
                  sx={{ mt: 4, mb: 2, color: 'primary.main' }}
                >
                  Newsletter
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {content.contact.newsletter}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default ContactSection