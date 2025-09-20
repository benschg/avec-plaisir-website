import { Box, Typography, Container, Grid, Card, CardContent } from '@mui/material'
import { teamMembers } from '../data/content'

const TeamSection = () => {
  return (
    <Box
      id="team"
      sx={{
        py: 8,
        backgroundColor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            mb: 6,
            color: 'secondary.main',
            fontSize: { xs: '1.8rem', md: '2.2rem' },
          }}
        >
          Team
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  textAlign: 'center',
                  border: '1px solid',
                  borderColor: 'primary.light',
                  borderRadius: 2,
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 1,
                      color: 'primary.main',
                      fontWeight: 500,
                    }}
                  >
                    {member.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      mb: 3,
                      color: 'secondary.main',
                      fontWeight: 400,
                    }}
                  >
                    {member.role}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.6,
                      fontStyle: 'italic',
                    }}
                  >
                    {member.bio}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default TeamSection