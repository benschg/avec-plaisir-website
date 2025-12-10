import { Box, Typography } from '@mui/material'

interface ServiceCardProps {
  icon: string
  title: string
  description: string
}

const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 4,
        px: 3,
        height: '100%',
        minHeight: '500px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: 240,
          height: 160,
          mx: 'auto',
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={icon}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </Box>
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          color: '#333333',
          fontWeight: 500,
          fontSize: '1.4rem',
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: '#666666',
          lineHeight: 1.7,
          fontSize: '1rem',
        }}
      >
        {description}
      </Typography>
    </Box>
  )
}

export default ServiceCard
