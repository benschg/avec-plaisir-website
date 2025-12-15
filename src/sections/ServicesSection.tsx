import {
  Box,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ServiceImage from '../components/ServiceImage'
import ServiceCard from '../components/ServiceCard'
import AnimatedText from '../components/AnimatedText'
import PhotoGallery from '../components/PhotoGallery'
import { useTextColor } from '../components/DynamicBackground'
import { useGallery } from '../hooks/useGallery'

gsap.registerPlugin(ScrollTrigger)

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
  const { headingColor } = useTextColor()
  const sectionRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const mobileIntroRef = useRef<HTMLDivElement>(null)
  const mobileCardsRef = useRef<HTMLDivElement>(null)

  // Gallery hooks
  const trauerGallery = useGallery('trauerfloristik')
  const eventsGallery = useGallery('events')

  useEffect(() => {
    if (isMobile && mobileIntroRef.current && mobileCardsRef.current) {
      // Mobile ScrollTrigger setup - wait for layout to settle
      const timeoutId = setTimeout(() => {
        if (mobileIntroRef.current && mobileCardsRef.current) {
          const ctx = gsap.context(() => {
            // Refresh ScrollTrigger to ensure correct calculations
            ScrollTrigger.refresh()

            // Pin the intro section
            ScrollTrigger.create({
              trigger: mobileIntroRef.current,
              start: 'top top',
              end: () => `+=${mobileCardsRef.current!.offsetHeight}`,
              pin: mobileIntroRef.current,
              pinSpacing: false,
              anticipatePin: 1,
            })

            // Pin each image/card pair
            const items = mobileCardsRef.current!.querySelectorAll('.service-item')
            items.forEach((item, index) => {
              const image = item.querySelector('.service-image')
              const card = item.querySelector('.service-card')

              if (image && card) {
                // Pin the image while the card scrolls over
                ScrollTrigger.create({
                  trigger: item,
                  start: 'top top',
                  end: 'bottom top',
                  pin: image,
                  pinSpacing: false,
                  anticipatePin: 1,
                  id: `service-pin-${index}`,
                })
              }
            })

            // Final refresh to recalculate after all pins are created
            ScrollTrigger.refresh()
          }, mobileCardsRef)

          return () => ctx.revert()
        }
      }, 200)

      return () => clearTimeout(timeoutId)
    } else if (!isMobile && sectionRef.current && introRef.current && gridRef.current) {
      // Desktop ScrollTrigger setup
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${gridRef.current!.offsetHeight}`,
          pin: introRef.current,
          pinSpacing: false,
          scrub: true,
        })
      }, sectionRef)

      return () => ctx.revert()
    }
  }, [isMobile])

  // Mobile: pinned intro with alternating pinned images and scrolling cards
  if (isMobile) {
    return (
      <Box id="angebot" sx={{ position: 'relative' }}>
        {/* Intro section - will be pinned */}
        <Box
          ref={mobileIntroRef}
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: 4,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Container maxWidth="lg">
            <Box display="flex" justifyContent="center">
              <Box
                maxWidth={{ xs: '90%', md: '1000px' }}
                display="flex"
                justifyContent="center"
                alignContent="center"
                alignItems="center"
                textAlign="center"
                flexDirection="column"
              >
                <Typography
                  variant="h2"
                  sx={{ color: headingColor }}
                  fontSize={{ xs: '3.0rem', md: '8rem' }}
                  fontFamily="Lora"
                  fontWeight="600"
                >
                  avec plaisir!
                </Typography>
                <Typography
                  variant="h2"
                  fontFamily="Lora"
                  fontWeight="600"
                  sx={{ color: headingColor }}
                  fontSize={{ xs: '1.1rem', md: '3rem' }}
                >
                  Deine Blumen nach Wunsch.
                </Typography>

                <Typography
                  maxWidth="500px"
                  paddingTop={8}
                  paddingBottom={8}
                  variant="body1"
                  fontSize={{ xs: '1.1rem', md: '1.5rem' }}
                >
                  Wir erfüllen deinen Blumenwunsch mit grosser Freude. Egal ob
                  einmalig oder wiederkehrend, für den Küchentisch oder ein
                  grosses Bankett, deine Bestellung wird mit äusserster Sorgfalt
                  und so schnell wie möglich erledigt.
                </Typography>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Services - image stays pinned while card scrolls over */}
        <Box ref={mobileCardsRef} sx={{ overflow: 'hidden' }}>
          {services.map((service, index) => (
            <Box key={index} className="service-item" sx={{ position: 'relative' }}>
              {/* Image - will be pinned */}
              <Box
                className="service-image"
                sx={{
                  height: '100vh',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: { xs: 2, sm: 3 },
                  backgroundColor: '#f5f5f5',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <Box sx={{ height: '100%', width: '100%' }}>
                  <ServiceImage src={service.image} alt={service.title} />
                </Box>
              </Box>

              {/* Card - will scroll over image */}
              <Box
                className="service-card"
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  pt: { xs: 4, sm: 5 },
                  pb: { xs: 12, sm: 16 },
                  px: { xs: 3, sm: 4 },
                  backgroundColor: 'white',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <Box sx={{ maxWidth: '600px', width: '100%' }}>
                  <ServiceCard
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                    actionButton={
                      service.title === 'Trauerfloristik' && trauerGallery.hasImages
                        ? {
                            label: 'Fotos',
                            onClick: trauerGallery.openGallery,
                          }
                        : service.title === 'Events' && eventsGallery.hasImages
                        ? {
                            label: 'Fotos',
                            onClick: eventsGallery.openGallery,
                          }
                        : undefined
                    }
                  />
                </Box>
              </Box>
            </Box>
          ))}

          {/* Final animated text section - scrolls normally without pinning */}
          <Box
            id="avec-animated"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
              position: 'relative',
              zIndex: 2,
              backgroundColor: '#9ba7aa',
              transition: 'background-color 0.8s ease',
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
                },
              ]}
              fontSize={{ xs: '3.5rem', md: '6rem' }}
              interval={4000}
            />
          </Box>
        </Box>

        {/* Photo Gallery Modal - Trauerfloristik */}
        <PhotoGallery
          open={trauerGallery.isOpen}
          onClose={trauerGallery.closeGallery}
          images={trauerGallery.images}
        />

        {/* Photo Gallery Modal - Events */}
        <PhotoGallery
          open={eventsGallery.isOpen}
          onClose={eventsGallery.closeGallery}
          images={eventsGallery.images}
        />
      </Box>
    )
  }

  // Desktop: Grid layout with intro
  return (
    <Box id="angebot" ref={sectionRef} sx={{ position: 'relative' }}>
      {/* Intro section - will be pinned */}
      <Box
        ref={introRef}
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="center">
            <Box
              maxWidth={{ xs: '90%', md: '1000px' }}
              display="flex"
              justifyContent="center"
              alignContent="center"
              alignItems="center"
              textAlign="center"
              flexDirection="column"
            >
              <Typography
                variant="h2"
                sx={{ color: headingColor }}
                fontSize={{ xs: '3.0rem', md: '8rem' }}
                fontFamily="Lora"
                fontWeight="600"
              >
                avec plaisir!
              </Typography>
              <Typography
                variant="h2"
                fontFamily="Lora"
                fontWeight="600"
                sx={{ color: headingColor }}
                fontSize={{ xs: '1.1rem', md: '3rem' }}
              >
                Deine Blumen nach Wunsch.
              </Typography>

              <Typography
                maxWidth="500px"
                paddingTop={8}
                paddingBottom={8}
                variant="body1"
                fontSize={{ xs: '1.1rem', md: '1.5rem' }}
              >
                Wir erfüllen deinen Blumenwunsch mit grosser Freude. Egal ob
                einmalig oder wiederkehrend, für den Küchentisch oder ein
                grosses Bankett, deine Bestellung wird mit äusserster Sorgfalt
                und so schnell wie möglich erledigt.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Services grid - will scroll over intro */}
      <Box
        ref={gridRef}
        sx={{
          position: 'relative',
          zIndex: 2,
          backgroundColor: 'white',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          py: { xs: 4, md: 6, lg: 8 },
          boxSizing: 'border-box',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 0, md: 1, lg: 2 }}>
          {/* Row 1 */}
          <Grid size={{ xs: 12, md: 4 }} sx={{ minHeight: { xs: '300px', md: '250px', lg: '320px' } }}>
            <ServiceImage
              src="/images/imgi_12_NRP_8709-low-scaled-uai-1138x1707.jpg"
              alt="Blumenarrangement"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} sx={{ minHeight: { xs: '300px', md: '250px', lg: '320px' } }}>
            <ServiceCard
              icon="/images/imgi_19_Avec-Plaisir-Zuerich-Blumenabo.png"
              title="Blumen-Abo"
              description="Ob wöchentlich oder monatlich, mit einem Blumen-Abo beliefern wir dich zuhause oder geschäftlich mit frischen Blumen nach deinem Budget und Gusto."
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} sx={{ minHeight: { xs: '300px', md: '250px', lg: '320px' } }}>
            <ServiceImage
              src="/images/imgi_57_NRP_9043-low-scaled.jpg"
              alt="Blumenarrangement"
            />
          </Grid>

          {/* Row 2 */}
          <Grid size={{ xs: 12, md: 4 }} sx={{ minHeight: { xs: '300px', md: '250px', lg: '320px' } }}>
            <ServiceCard
              icon="/images/imgi_20_Avec-Plaisir-Zuerich-Trauerfloristik.png"
              title="Trauerfloristik"
              description="Blumenkranz, Sargbouquets, Urnenschmuck oder Grabbepflanzung, wir nehmen uns viel Zeit, um dir in schweren Stunden bestmöglich zur Seite zu stehen."
              actionButton={
                trauerGallery.hasImages
                  ? {
                      label: 'Fotos',
                      onClick: trauerGallery.openGallery,
                    }
                  : undefined
              }
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} sx={{ minHeight: { xs: '300px', md: '250px', lg: '320px' } }}>
            <ServiceImage
              src="/images/imgi_58_NRP_9612-low-1-scaled.jpg"
              alt="Blumenarrangement"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} sx={{ minHeight: { xs: '300px', md: '250px', lg: '320px' } }}>
            <ServiceCard
              icon="/images/imgi_21_Avec-Plaisir-Zuerich-Blumenlieferdienst.png"
              title="Hauslieferdienst"
              description="Dir ist es nicht möglich, unseren Laden im Kreis 3 zu besuchen? Kein Problem, wir liefern Blumen und Pflanzen gemäss Abmachung auch gerne an die gewünschte Adresse."
            />
          </Grid>

          {/* Row 3 */}
          <Grid size={{ xs: 12, md: 4 }} sx={{ minHeight: { xs: '300px', md: '250px', lg: '320px' } }}>
            <ServiceImage
              src="/images/imgi_59_avec-plaisir-blumen.jpg"
              alt="Blumenarrangement"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} sx={{ minHeight: { xs: '300px', md: '250px', lg: '320px' } }}>
            <ServiceCard
              icon="/images/imgi_22_Avec-Plaisir-Zuerich-Blumendeko.png"
              title="Events"
              description="Dein feierlicher Anlass ist unser floristischer Ansporn. Gerne beraten wir dich und geben deinem Event mit unseren Blumenkreationen das florale i-Tüpfelchen."
              actionButton={
                eventsGallery.hasImages
                  ? {
                      label: 'Fotos',
                      onClick: eventsGallery.openGallery,
                    }
                  : undefined
              }
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} sx={{ minHeight: { xs: '300px', md: '250px', lg: '320px' } }}>
            <ServiceImage
              src="/images/imgi_60_Screenshot-2024-09-17-at-13.19.32.png"
              alt="Blumenarrangement"
            />
          </Grid>
        </Grid>
      </Container>
      </Box>

      {/* Animated text section - part of angebot section */}
      <Box
        id="avec-animated"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          position: 'relative',
          zIndex: 2,
          backgroundColor: '#9ba7aa',
          transition: 'background-color 0.8s ease',
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
            },
          ]}
          fontSize={{ xs: '3.5rem', md: '6rem' }}
          interval={4000}
        />
      </Box>

      {/* Photo Gallery Modal - Trauerfloristik */}
      <PhotoGallery
        open={trauerGallery.isOpen}
        onClose={trauerGallery.closeGallery}
        images={trauerGallery.images}
      />

      {/* Photo Gallery Modal - Events */}
      <PhotoGallery
        open={eventsGallery.isOpen}
        onClose={eventsGallery.closeGallery}
        images={eventsGallery.images}
      />
    </Box>
  )
}

export default ServicesSection
