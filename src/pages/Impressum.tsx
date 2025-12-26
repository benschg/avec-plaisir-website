import { Container, Typography, Box, Paper, Link } from '@mui/material'
import Footer from '../components/Footer'

const Impressum = () => {
  return (
    <Box>
      <Container maxWidth="md" sx={{ py: 8, mt: 8 }}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, md: 6 },
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: 2,
            color: '#000000',
            '& *': { color: '#000000 !important' }
          }}
        >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            color: '#000000',
            fontWeight: 'bold',
            mb: 4
          }}
        >
          Impressum
        </Typography>

        <Box sx={{ '& > *': { mb: 3 } }}>
          <Box>
            <Typography variant="body1" paragraph sx={{ fontWeight: 'bold' }}>
              avec plaisir GmbH<br />
              Aemtlerstrasse 205<br />
              CH-8003 Zürich<br />
              Handelsregisternummer: CH-020-4083746-7<br />
              Registergericht: ZH<br />
              UID/MWST: CHE-441.553.936
            </Typography>
            <Typography variant="body1" paragraph>
              Vertreten durch:<br />
              Monika Fähndrich<br />
              Telefon: 044 492 21 18<br />
              Mail: salut@avecplaisir-zuerich.ch
            </Typography>
            <Typography variant="body1" paragraph>
              Website Gestaltung:<br />
              weblotse.ch
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              EU-Streitschlichtung
            </Typography>
            <Typography variant="body1" paragraph>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <Link href="https://ec.europa.eu/consumers/odr/" target="_blank" sx={{ color: '#000000' }}>https://ec.europa.eu/consumers/odr/</Link>.<br />
              Unsere Mail-Adresse finden Sie oben im Impressum.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              Haftungsausschluss
            </Typography>
            <Typography variant="body1" paragraph>
              Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen. Haftungsansprüche gegen den Autor wegen Schäden materieller oder immaterieller Art, welche aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen, durch Missbrauch der Verbindung oder durch technische Störungen entstanden sind, werden ausgeschlossen. Alle Angebote sind unverbindlich. Der Autor behält es sich ausdrücklich vor, Teile der Seiten oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              Haftung für Links
            </Typography>
            <Typography variant="body1" paragraph>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </Typography>
          </Box>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </Box>
  )
}

export default Impressum