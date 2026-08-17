import { Box, Button, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

/**
 * Client-side fallback for unknown paths.
 *
 * Direct hits never reach this: Firebase Hosting answers unknown paths with a
 * real 404 and the static public/404.html. This covers in-app navigation to a
 * path that no route matches, so the user never sees a blank page.
 */
const NotFound = () => (
  <Container maxWidth="sm">
    <Box
      sx={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 3,
      }}
    >
      <Typography variant="h2" component="h1">
        Seite nicht gefunden
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Diese Adresse gibt es nicht (mehr). Auf der Startseite finden Sie alles
        zu unserem Angebot, Blumen-Abo und Kontakt.
      </Typography>
      <Button component={Link} to="/" variant="outlined" size="large">
        Zur Startseite
      </Button>
    </Box>
  </Container>
)

export default NotFound
