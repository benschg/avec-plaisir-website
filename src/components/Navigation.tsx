import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'

const Navigation = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          sx={{
            color: 'primary.main',
            fontWeight: 400,
            fontSize: '1.2rem',
          }}
        >
          avec plaisir zürich
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            color="secondary"
            onClick={() => scrollToSection('angebot')}
            sx={{ textTransform: 'none' }}
          >
            Angebot
          </Button>
          <Button
            color="secondary"
            onClick={() => scrollToSection('team')}
            sx={{ textTransform: 'none' }}
          >
            Team
          </Button>
          <Button
            color="secondary"
            onClick={() => scrollToSection('kontakt')}
            sx={{ textTransform: 'none' }}
          >
            Kontakt
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation