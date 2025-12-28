import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  LinearProgress,
} from '@mui/material'
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom'
import { Instagram } from 'lucide-react'
import { useLenis } from '../hooks/useLenis'
import { getContactInfo } from '../services/content.service'
import type { ContactInfoData } from '../types/admin'

const Footer = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { scrollTo } = useLenis()
  const [adminData, setAdminData] = useState<ContactInfoData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getContactInfo()
      .then((data) => setAdminData(data))
      .catch((error) => console.error('Error loading contact info:', error))
      .finally(() => setLoading(false))
  }, [])

  const hours = adminData?.hours

  const scrollToSection = (sectionId: string) => {
    // If not on home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/')
      // Wait for navigation and then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          scrollTo(element, { duration: 1.2 })
        }
      }, 100)
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        scrollTo(element, { duration: 1.2 })
      }
    }
  }

  return (
    <Box
      id="footer"
      component="footer"
      sx={{
        backgroundColor: '#5e747a',
        color: 'white',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Left side - Address */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#FFB6C1' }}>
              avec plaisir GmbH
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Aemtlerstrasse 205
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              CH-8003 Zürich
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Telefon: +41 44 492 21 18
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              E-Mail: salut@avecplaisir-zuerich.ch
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Öffnungszeiten:
            </Typography>
            {loading ? (
              <Box sx={{ width: '50%', py: 1 }}>
                <LinearProgress />
              </Box>
            ) : hours ? (
              <>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {hours.weekdays}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {hours.saturday}
                </Typography>
                <Typography variant="body2">{hours.sunday}</Typography>
              </>
            ) : null}
          </Grid>

          {/* Right side - Links */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'flex-end', md: 'flex-end' },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  position: 'relative',
                }}
              >
                {/* Navigation Links */}
                <Link
                  component="button"
                  onClick={() => scrollToSection('kontakt')}
                  sx={{
                    color: 'white',
                    textDecoration: 'none',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    font: 'inherit',
                    textAlign: 'right',
                    '&:hover': {
                      color: '#FFB6C1',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Kontakt
                </Link>
                <Link
                  component="button"
                  onClick={() => scrollToSection('angebot')}
                  sx={{
                    color: 'white',
                    textDecoration: 'none',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    font: 'inherit',
                    textAlign: 'right',
                    '&:hover': {
                      color: '#FFB6C1',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Angebot
                </Link>
                <Link
                  component="button"
                  onClick={() => scrollToSection('team')}
                  sx={{
                    color: 'white',
                    textDecoration: 'none',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    font: 'inherit',
                    textAlign: 'right',
                    '&:hover': {
                      color: '#FFB6C1',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Team
                </Link>

                {/* Legal Links */}
                <Link
                  component={RouterLink}
                  to="/impressum"
                  sx={{
                    color: 'white',
                    textAlign: 'right',
                    textDecoration: 'none',
                    '&:hover': {
                      color: '#FFB6C1',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Impressum
                </Link>
                <Link
                  component={RouterLink}
                  to="/datenschutz"
                  sx={{
                    color: 'white',
                    textAlign: 'right',
                    textDecoration: 'none',
                    '&:hover': {
                      color: '#FFB6C1',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Datenschutzerklärung
                </Link>
                <Link
                  component={RouterLink}
                  to="/agbs"
                  sx={{
                    color: 'white',
                    textAlign: 'right',
                    textDecoration: 'none',
                    '&:hover': {
                      color: '#FFB6C1',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  AGBs
                </Link>

                {/* Social Media */}
                <Link
                  href="https://www.instagram.com/avecplaisirzuerich"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'white',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: 0.5,
                    mt: 1,
                    '&:hover': {
                      color: '#FFB6C1',
                    },
                  }}
                >
                  <Instagram size={20} />
                  Instagram
                </Link>

                {/* Flower decoration in bottom right after links */}
                <Box
                  sx={{
                    opacity: 1.0,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    my: 8,
                    transition: 'opacity 0.3s ease-in-out',
                  }}
                >
                  <img
                    src="/avec-plaisir-flower-white.svg"
                    alt="avec plaisir flower decoration"
                    style={{
                      width: '50px',
                      height: '50px',
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box
          sx={{
            borderTop: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
            mt: 4,
            pt: 3,
          }}
        >
          <Typography
            variant="body2"
            align="center"
            sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
          >
            © {new Date().getFullYear()} avec plaisir GmbH. Alle Rechte
            vorbehalten.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
