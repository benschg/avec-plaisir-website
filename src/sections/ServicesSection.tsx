import { Box, Container, Grid } from '@mui/material'
import ServiceImage from '../components/ServiceImage'
import ServiceCard from '../components/ServiceCard'

const ServicesSection = () => {
  return (
    <Box
      id="angebot"
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        py: 2,
        boxSizing: 'border-box',
      }}
    >
      <Container maxWidth="lg" sx={{ height: '95%' }}>
        <Grid container sx={{ height: '100%' }}>
          {/* Row 1 */}
          <Grid size={{ xs: 12, md: 4 }} sx={{ height: { md: '33.33%' } }}>
            <ServiceImage
              src="/images/imgi_12_NRP_8709-low-scaled-uai-1138x1707.jpg"
              alt="Blumenarrangement"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} sx={{ height: { md: '33.33%' } }}>
            <ServiceCard
              icon="/images/imgi_19_Avec-Plaisir-Zuerich-Blumenabo.png"
              title="Blumen-Abo"
              description="Ob wöchentlich oder monatlich, mit einem Blumen-Abo beliefern wir Sie zuhause oder geschäftlich mit frischen Blumen nach Ihrem Budget und Gusto."
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} sx={{ height: { md: '33.33%' } }}>
            <ServiceImage
              src="/images/imgi_57_NRP_9043-low-scaled.jpg"
              alt="Blumenarrangement"
            />
          </Grid>

          {/* Row 2 */}
          <Grid size={{ xs: 12, md: 4 }} sx={{ height: { md: '33.33%' } }}>
            <ServiceCard
              icon="/images/imgi_20_Avec-Plaisir-Zuerich-Trauerfloristik.png"
              title="Trauerfloristik"
              description="Blumenkranz, Sargbouquets, Urnenschmuck oder Grabbepflanzung, wir nehmen uns viel Zeit, um Ihnen in schweren Stunden bestmöglich zur Seite zu stehen."
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} sx={{ height: { md: '33.33%' } }}>
            <ServiceImage
              src="/images/imgi_58_NRP_9612-low-1-scaled.jpg"
              alt="Blumenarrangement"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} sx={{ height: { md: '33.33%' } }}>
            <ServiceCard
              icon="/images/imgi_21_Avec-Plaisir-Zuerich-Blumenlieferdienst.png"
              title="Hauslieferdienst"
              description="Ihnen ist es nicht möglich, unseren Laden im Kreis 3 zu besuchen? Kein Problem, wir liefern Blumen und Pflanzen gemäss Abmachung auch gerne an die gewünschte Adresse."
            />
          </Grid>

          {/* Row 3 */}
          <Grid size={{ xs: 12, md: 4 }} sx={{ height: { md: '33.33%' } }}>
            <ServiceImage
              src="/images/imgi_59_avec-plaisir-blumen.jpg"
              alt="Blumenarrangement"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} sx={{ height: { md: '33.33%' } }}>
            <ServiceCard
              icon="/images/imgi_22_Avec-Plaisir-Zuerich-Blumendeko.png"
              title="Events"
              description="Ihr feierlicher Anlass ist unser floristischer Ansporn. Gerne beraten wir Sie und geben Ihrem Event mit unseren Blumenkreationen das florale i-Tüpfelchen."
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} sx={{ height: { md: '33.33%' } }}>
            <ServiceImage
              src="/images/imgi_60_Screenshot-2024-09-17-at-13.19.32.png"
              alt="Blumenarrangement"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default ServicesSection
