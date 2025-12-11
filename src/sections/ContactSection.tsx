import { Box, Typography, Container, Grid, Link, Divider } from '@mui/material'
import { contactInfo } from '../data/contactInfo'
import {
  LocationOn,
  Phone,
  Email,
  Instagram,
  Alarm,
  Park,
} from '@mui/icons-material'
import type { ReactNode } from 'react'

const ContactItem = ({
  icon,
  title,
  description,
  link,
}: {
  icon: ReactNode
  title?: string
  description: string
  link?: string
}) => {
  const content = (
    <Box display={'flex'} flexDirection={'row'}>
      {icon}
      <Box display={'flex'} flexDirection={'column'}>
        {title && <Typography variant="h2">{title}</Typography>}
        <Typography
          variant="body1"
          sx={{
            color: '#666666',
            fontSize: { xs: '1.0rem', md: '1.4rem' },
            lineHeight: 2.0,
            whiteSpace: 'pre-line',
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  )

  if (link) {
    return (
      <Link
        href={link}
        target={link.startsWith('http') ? '_blank' : '_self'}
        rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
        sx={{
          textDecoration: 'none',
          color: 'inherit',
          cursor: 'pointer',
          '&:hover': {
            opacity: 0.8,
          },
        }}
      >
        {content}
      </Link>
    )
  }

  return content
}

const ContactSection = () => {
  return (
    <Box
      id="kontakt"
      sx={{
        minHeight: '100vh',
        height: { xs: 'auto', md: '100vh' },
        overflowY: 'auto',
        display: 'flex',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Container>
        <Grid container spacing={8}>
          <Grid size={{ xs: 12, md: 6 }}>
            {/* Shop Image */}
            <Box
              sx={{
                mb: 8,
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Box
                sx={{
                  maxWidth: 600,

                  mx: 'auto',
                  borderRadius: 2,
                  overflow: 'hidden',
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
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            {/* Contact Information */}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <ContactItem
                icon={
                  <LocationOn
                    sx={{ mr: 2, color: '#666666', fontSize: '2rem' }}
                  />
                }
                description={contactInfo.address}
                link="https://maps.app.goo.gl/vwy2pXMkgtcJvcev6"
              />

              <Divider
                sx={{ my: 2, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              />

              <ContactItem
                icon={
                  <Phone sx={{ mr: 2, color: '#666666', fontSize: '2rem' }} />
                }
                description={contactInfo.phone}
                link={`tel:${contactInfo.phone}`}
              />

              <Divider
                sx={{ my: 2, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              />

              <ContactItem
                icon={
                  <Email sx={{ mr: 2, color: '#666666', fontSize: '2rem' }} />
                }
                description={contactInfo.email}
                link={`mailto:${contactInfo.email}`}
              />

              <Divider
                sx={{ my: 2, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              />

              <ContactItem
                icon={
                  <Instagram
                    sx={{ mr: 2, color: '#666666', fontSize: '2rem' }}
                  />
                }
                description={contactInfo.instagram}
                link={`https://instagram.com/${contactInfo.instagram.substring(1)}`}
              />

              <Divider
                sx={{ my: 2, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              />

              <ContactItem
                icon={
                  <Alarm sx={{ mr: 2, color: '#666666', fontSize: '2rem' }} />
                }
                description={[
                  contactInfo.hours.weekdays,
                  contactInfo.hours.saturday,
                  contactInfo.hours.sunday,
                ].join('\n')}
              />

              {contactInfo.holidayClosure && (
                <>
                  <Divider
                    sx={{ my: 2, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                  />

                  <ContactItem
                    icon={
                      <Park
                        sx={{ mr: 2, color: '#666666', fontSize: '2rem' }}
                      />
                    }
                    description={[
                      contactInfo.holidayClosure.dates,
                      contactInfo.holidayClosure.reopening,
                    ].join('\n')}
                  />
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default ContactSection
