import { Box, Typography, Container, Grid } from '@mui/material'
import { teamMembers } from '../data/teamMembers'

const TeamSection = () => {
  return (
    <Box
      id="team"
      sx={{
        py: 10,
        my: 4,
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
            }}
          >
            <Grid size={{ xs: 12, md: 6 }} spacing="gap">
              <Box gap="40px" display={'flex'} flexDirection={'column'}>
                <img
                  src="/images/Flower-wht-150x150.png"
                  alt="avec plaisir flower logo"
                  style={{
                    width: '40px',
                    objectFit: 'contain',
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
                    fontStyle: 'italic',
                    borderLeft: '4px solid currentColor',
                    paddingLeft: 2,
                    marginLeft: 1,
                  }}
                >
                  "{member.bio}"
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
              }}
            >
              <img
                src="/images/imgi_123_40A7C801-D815-4BA5-8CFF-AADD6184BA57_1_105_c.jpg"
                alt={member.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
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
