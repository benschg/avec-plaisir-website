import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { useLenis } from '../hooks/useLenis'

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const location = useLocation()
  const navigate = useNavigate()
  const { lenis, scrollTo } = useLenis()

  useEffect(() => {
    if (!lenis) return

    const handleScroll = () => {
      const currentScrollY = lenis.scroll
      const isScrolled = currentScrollY > 50

      // Show header when scrolling up or at top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setVisible(true)
      } else {
        // Hide header when scrolling down
        setVisible(false)
      }

      setScrolled(isScrolled)
      setLastScrollY(currentScrollY)
    }

    lenis.on('scroll', handleScroll)
    return () => {
      lenis.off('scroll', handleScroll)
    }
  }, [lenis, lastScrollY])

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
    setMobileOpen(false) // Close drawer after navigation
  }

  const handleLogoClick = () => {
    navigate('/')
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const menuItems = [
    { text: 'Kontakt', id: 'kontakt' },
    { text: 'Angebot', id: 'angebot' },
    { text: 'Team', id: 'team' },
  ]

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          // backgroundColor: '#f1938d',
          backdropFilter: 'blur(10px)',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : 'none',
          transform: visible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.3s ease-in-out',
          ...(scrolled && {
            py: 0.5,
          }),
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            py: scrolled ? 0.5 : 1,
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              onClick={handleLogoClick}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8,
                },
              }}
            >
              <img
                src="/avec-plaisir-text-logo.svg"
                alt="avec plaisir zürich"
                style={{
                  marginTop: scrolled ? '10px' : '20px',
                  height: scrolled ? '45px' : '100px',
                  width: 'auto',
                  transition: 'all 0.3s ease-in-out',
                }}
              />
            </Box>
          </Box>

          {/* Desktop Menu */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              gap: 4,
              alignItems: 'center',
            }}
          >
            {menuItems.map((item) => (
              <Button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                sx={{
                  color: '#ffffff',
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 400,
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: 'rgba(255, 255, 255, 0.8)',
                  },
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' }, color: '#ffffff' }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 250,
            backgroundColor: '#f1938d',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <IconButton onClick={handleDrawerToggle} sx={{ color: '#ffffff' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton
                  onClick={() => scrollToSection(item.id)}
                  sx={{
                    textAlign: 'center',
                    color: '#ffffff',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: '1.2rem',
                      fontWeight: 400,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  )
}

export default Navigation
