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
      elevation={0}
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <img
            src="/images/avecplaisir-logo.png"
            alt="avec plaisir zürich"
            style={{
              height: '40px',
              width: 'auto',
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 4 }}>
          <Button
            onClick={() => scrollToSection('angebot')}
            sx={{
              color: '#666666',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 400,
              '&:hover': {
                backgroundColor: 'transparent',
                color: '#f28c86',
              },
            }}
          >
            Angebot
          </Button>
          <Button
            onClick={() => scrollToSection('team')}
            sx={{
              color: '#666666',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 400,
              '&:hover': {
                backgroundColor: 'transparent',
                color: '#f28c86',
              },
            }}
          >
            Team
          </Button>
          <Button
            onClick={() => scrollToSection('kontakt')}
            sx={{
              color: '#666666',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 400,
              '&:hover': {
                backgroundColor: 'transparent',
                color: '#f28c86',
              },
            }}
          >
            Kontakt
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation