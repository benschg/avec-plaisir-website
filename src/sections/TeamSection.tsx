import { Box, Typography, Container, Grid } from '@mui/material'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { teamMembers } from '../data/teamMembers'
import { useTextColor } from '../components/DynamicBackground'

gsap.registerPlugin(ScrollTrigger)

const TeamSection = () => {
  const { textColor } = useTextColor()
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!imageRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        {
          yPercent: 0,
        },
        {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <Box
      id="team"
      sx={{
        minHeight: '100vh',
        height: { xs: 'auto', md: '100vh' },
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        py: { xs: 6, md: 0 },
      }}
    >
      <Container maxWidth="md">
        {teamMembers.map((member, index) => (
          <Grid
            spacing={2}
            container
            key={index}
            sx={{
              textAlign: 'left',
              alignItems: 'center',
            }}
          >
            <Grid size={{ xs: 12, md: 6 }} spacing="gap">
              <Box gap="40px" display={'flex'} flexDirection={'column'}>
                <Box
                  sx={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: textColor,
                    maskImage: 'url(/avec-plaisir-flower-white.svg)',
                    maskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskImage: 'url(/avec-plaisir-flower-white.svg)',
                    WebkitMaskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    transition: 'background-color 0.8s ease',
                  }}
                />

                <Typography
                  variant="h1"
                  sx={{
                    mb: 2,
                    fontWeight: 500,
                    fontSize: { xs: '1.5rem', md: '1.8rem' },
                    whiteSpace: 'pre-line',
                  }}
                >
                  {member.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.7,
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    borderLeft: '4px solid currentColor',
                    paddingLeft: 2,
                    marginLeft: 1,
                  }}
                >
                  "
                  {member.bio
                    .split(/(_[^_]+_)/g)
                    .map((part, i) =>
                      part.startsWith('_') && part.endsWith('_') ? (
                        <em key={i}>{part.slice(1, -1)}</em>
                      ) : (
                        part
                      )
                    )}
                  "
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    mb: 2,
                    fontWeight: 500,
                    fontSize: { xs: '1.0rem', md: '1.1rem' },
                  }}
                >
                  {member.name}, {member.role}
                </Typography>
              </Box>
            </Grid>

            {/* Team member photo */}
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{
                mb: 4,
                overflow: 'hidden',
                maxHeight: { xs: '500px', md: '600px' },
                position: 'relative',
              }}
            >
              <Box
                ref={imageRef}
                component="img"
                src="/images/imgi_123_40A7C801-D815-4BA5-8CFF-AADD6184BA57_1_105_c.jpg"
                alt={member.name}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: { xs: 'center 80%', md: 'center 75%' },
                }}
              />
            </Grid>
          </Grid>
        ))}
      </Container>
    </Box>
  )
}

export default TeamSection
