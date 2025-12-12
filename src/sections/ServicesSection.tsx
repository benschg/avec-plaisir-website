import { Box, Container, Grid, useMediaQuery, useTheme } from '@mui/material'
import ServiceImage from '../components/ServiceImage'
import ServiceCard from '../components/ServiceCard'

const services = [
  {
    image: '/images/imgi_12_NRP_8709-low-scaled-uai-1138x1707.jpg',
    icon: '/images/imgi_19_Avec-Plaisir-Zuerich-Blumenabo.png',
    title: 'Blumen-Abo',
    description:
      'Ob wöchentlich oder monatlich, mit einem Blumen-Abo beliefern wir dich zuhause oder geschäftlich mit frischen Blumen nach deinem Budget und Gusto.',
  },
  {
    image: '/images/imgi_57_NRP_9043-low-scaled.jpg',
    icon: '/images/imgi_20_Avec-Plaisir-Zuerich-Trauerfloristik.png',
    title: 'Trauerfloristik',
    description:
      'Blumenkranz, Sargbouquets, Urnenschmuck oder Grabbepflanzung, wir nehmen uns viel Zeit, um dir in schweren Stunden bestmöglich zur Seite zu stehen.',
  },
  {
    image: '/images/imgi_58_NRP_9612-low-1-scaled.jpg',
    icon: '/images/imgi_21_Avec-Plaisir-Zuerich-Blumenlieferdienst.png',
    title: 'Hauslieferdienst',
    description:
      'Dir ist es nicht möglich, unseren Laden im Kreis 3 zu besuchen? Kein Problem, wir liefern Blumen und Pflanzen gemäss Abmachung auch gerne an die gewünschte Adresse.',
  },
  {
    image: '/images/imgi_59_avec-plaisir-blumen.jpg',
    icon: '/images/imgi_22_Avec-Plaisir-Zuerich-Blumendeko.png',
    title: 'Events',
    description:
      'Dein feierlicher Anlass ist unser floristischer Ansporn. Gerne beraten wir dich und geben deinem Event mit unseren Blumenkreationen das florale i-Tüpfelchen.',
  },
]

const ServicesSection = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  // Mobile: alternating full-screen image/card pairs with snap
  if (isMobile) {
    return (
      <Box id="angebot">
        {services.map((service, index) => (
          <Box key={index}>
            {/* Image panel */}
            <Box
              className="snap-section"
              data-snap-id={`service-image-${index}`}
              sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
              }}
            >
              <ServiceImage src={service.image} alt={service.title} />
            </Box>

            {/* Card panel */}
            <Box
              className="snap-section"
              data-snap-id={`service-card-${index}`}
              sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 4,
              }}
            >
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            </Box>
          </Box>
        ))}
      </Box>
    )
  }

  // Desktop: Original grid layout
  return (
    <Box
      id="angebot"
      sx={{
        minHeight: '100vh',
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
          <Grid size={{ xs: 12, md: 4 }} sx={{ height: '33.33%' }}>
            <ServiceImage
              src="/images/imgi_12_NRP_8709-low-scaled-uai-1138x1707.jpg"
              alt="Blumenarrangement"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} sx={{ height: '33.33%' }}>
            <ServiceCard
              icon="/images/imgi_19_Avec-Plaisir-Zuerich-Blumenabo.png"
              title="Blumen-Abo"
              description="Ob wöchentlich oder monatlich, mit einem Blumen-Abo beliefern wir dich zuhause oder geschäftlich mit frischen Blumen nach deinem Budget und Gusto."
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} sx={{ height: '33.33%' }}>
            <ServiceImage
              src="/images/imgi_57_NRP_9043-low-scaled.jpg"
              alt="Blumenarrangement"
            />
          </Grid>

          {/* Row 2 */}
          <Grid size={{ xs: 12, md: 4 }} sx={{ height: '33.33%' }}>
            <ServiceCard
              icon="/images/imgi_20_Avec-Plaisir-Zuerich-Trauerfloristik.png"
              title="Trauerfloristik"
              description="Blumenkranz, Sargbouquets, Urnenschmuck oder Grabbepflanzung, wir nehmen uns viel Zeit, um dir in schweren Stunden bestmöglich zur Seite zu stehen."
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} sx={{ height: '33.33%' }}>
            <ServiceImage
              src="/images/imgi_58_NRP_9612-low-1-scaled.jpg"
              alt="Blumenarrangement"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} sx={{ height: '33.33%' }}>
            <ServiceCard
              icon="/images/imgi_21_Avec-Plaisir-Zuerich-Blumenlieferdienst.png"
              title="Hauslieferdienst"
              description="Dir ist es nicht möglich, unseren Laden im Kreis 3 zu besuchen? Kein Problem, wir liefern Blumen und Pflanzen gemäss Abmachung auch gerne an die gewünschte Adresse."
            />
          </Grid>

          {/* Row 3 */}
          <Grid size={{ xs: 12, md: 4 }} sx={{ height: '33.33%' }}>
            <ServiceImage
              src="/images/imgi_59_avec-plaisir-blumen.jpg"
              alt="Blumenarrangement"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} sx={{ height: '33.33%' }}>
            <ServiceCard
              icon="/images/imgi_22_Avec-Plaisir-Zuerich-Blumendeko.png"
              title="Events"
              description="Dein feierlicher Anlass ist unser floristischer Ansporn. Gerne beraten wir dich und geben deinem Event mit unseren Blumenkreationen das florale i-Tüpfelchen."
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} sx={{ height: '33.33%' }}>
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
