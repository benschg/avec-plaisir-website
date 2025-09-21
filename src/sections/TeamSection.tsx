import { Box, Typography, Container } from '@mui/material'
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
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            mb: 8,
            fontSize: { xs: '1.8rem', md: '2.5rem' },
            fontWeight: 400,
          }}
        >
          Team
        </Typography>

        {teamMembers.map((member, index) => (
          <Box
            key={index}
            sx={{
              textAlign: 'center',
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            {/* Team member photo */}
            <Box
              sx={{
                width: '50%',
                mx: 'auto',
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
            </Box>
            <Typography
              variant="h1"
              sx={{
                mb: 2,
                fontWeight: 500,
                fontSize: { xs: '1.5rem', md: '1.8rem' },
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
              }}
            >
              "{member.bio}"
            </Typography>
            <Typography
              variant="h4"
              sx={{
                mb: 2,
                fontWeight: 500,
                fontSize: { xs: '1.5rem', md: '1.8rem' },
              }}
            >
              {member.name}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                mb: 4,
                fontSize: '1.1rem',
                fontWeight: 400,
              }}
            >
              {member.role}
            </Typography>
          </Box>
        ))}
      </Container>
    </Box>
  )
}

export default TeamSection
