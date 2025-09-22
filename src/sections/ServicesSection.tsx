import { Box, Typography, Container, Grid } from '@mui/material'
import ServiceImage from '../components/ServiceImage'
import ServiceCard from '../components/ServiceCard'
import { useTextColor } from '../components/DynamicBackground'
import AnimatedText from '../components/AnimatedText'

const ServicesSection = () => {
  const { headingColor } = useTextColor()

  return (
    <Box
      id="angebot"
      sx={{
        py: 10,
        my: 2,
        borderRadius: 0,
      }}
    >
      <Container maxWidth="lg">
        <Box display={'flex'} justifyContent={'center'}>
          <Box
            maxWidth={{ xs: '90%', md: '700px' }}
            display={'flex'}
            justifyContent={'center'}
            alignContent={'center'}
            alignItems={'center'}
            textAlign={'center'}
            flexDirection={'column'}
          >
            <Typography
              variant="h2"
              sx={{ color: headingColor }}
              fontSize={{ xs: '1.8rem', md: '8rem' }}
            >
              avec plaisir!
            </Typography>
            <Typography
              variant="h2"
              sx={{ color: headingColor }}
              fontSize={{ xs: '1.1rem', md: '3rem' }}
            >
              Ihre Blumen nach Wunsch.
            </Typography>

            <Typography
              maxWidth={'500px'}
              paddingTop={8}
              paddingBottom={8}
              variant="body1"
              fontSize={{ xs: '1.1rem', md: '1.5rem' }}
            >
              Wir erfüllen Ihren Blumenwunsch mit grosser Freude. Egal ob
              einmalig oder wiederkehrend, für den Küchentisch oder ein grosses
              Bankett, Ihre Bestellung wird mit äusserster Sorgfalt und so
              schnell wie möglich erledigt.
            </Typography>
          </Box>
        </Box>

        <Grid container>
          <Grid size={{ xs: 12, md: 4 }}>
            <ServiceImage
              src="/images/imgi_12_NRP_8709-low-scaled-uai-1138x1707.jpg"
              alt="Blumenarrangement"
            />
          </Grid>
          {/* Row 1: Blumen-Abo and Trauerfloristik */}
          <Grid size={{ xs: 12, md: 4 }}>
            <ServiceCard
              icon="/images/imgi_19_Avec-Plaisir-Zuerich-Blumenabo.png"
              title="Blumen-Abo"
              description="Ob wöchentlich oder monatlich, mit einem Blumen-Abo beliefern wir Sie zuhause oder geschäftlich mit frischen Blumen nach Ihrem Budget und Gusto."
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ServiceImage
              src="/images/imgi_57_NRP_9043-low-scaled.jpg"
              alt="Blumenarrangement"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <ServiceCard
              icon="/images/imgi_20_Avec-Plaisir-Zuerich-Trauerfloristik.png"
              title="Trauerfloristik"
              description="Blumenkranz, Sargbouquets, Urnenschmuck oder Grabbepflanzung, wir nehmen uns viel Zeit, um Ihnen in schweren Stunden bestmöglich zur Seite zu stehen."
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ServiceImage
              src="/images/imgi_58_NRP_9612-low-1-scaled.jpg"
              alt="Blumenarrangement"
            />
          </Grid>

          {/* Row 2: Hauslieferdienst and Events */}
          <Grid size={{ xs: 12, md: 4 }}>
            <ServiceCard
              icon="/images/imgi_21_Avec-Plaisir-Zuerich-Blumenlieferdienst.png"
              title="Hauslieferdienst"
              description="Ihnen ist es nicht möglich, unseren Laden im Kreis 3 zu besuchen? Kein Problem, wir liefern Blumen und Pflanzen gemäss Abmachung auch gerne an die gewünschte Adresse."
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ServiceImage
              src="/images/imgi_59_avec-plaisir-blumen.jpg"
              alt="Blumenarrangement"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <ServiceCard
              icon="/images/imgi_22_Avec-Plaisir-Zuerich-Blumendeko.png"
              title="Events"
              description="Ihr feierlicher Anlass ist unser floristischer Ansporn. Gerne beraten wir Sie und geben Ihrem Event mit unseren Blumenkreationen das florale i-Tüpfelchen."
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ServiceImage
              src="/images/imgi_60_Screenshot-2024-09-17-at-13.19.32.png"
              alt="Blumenarrangement"
            />
          </Grid>
        </Grid>

        {/* Animated Text Section */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 8,
            mb: 4,
          }}
        >
          <AnimatedText
            words={[
              'plaisir!',
              'fleurs?',
              {
                type: 'svg',
                src: '/avec-plaisir-flower-white.svg',
                alt: 'flower',
                filter: 'invert(1)',
              },
            ]}
            fontSize={{ xs: '2rem', md: '6rem' }}
            interval={4000}
          />
        </Box>
      </Container>
    </Box>
  )
}

export default ServicesSection
