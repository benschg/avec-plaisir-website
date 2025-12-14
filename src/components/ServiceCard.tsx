import { Box, Typography, Button } from '@mui/material'

interface ServiceCardProps {
  icon: string
  title: string
  description: string
  actionButton?: {
    label: string
    onClick: () => void
  }
}

const ServiceCard = ({ icon, title, description, actionButton }: ServiceCardProps) => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: { xs: 3, md: 2, lg: 3 },
        px: { xs: 3, md: 2, lg: 3 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: { xs: 180, md: 160, lg: 240 },
          height: { xs: 120, md: 110, lg: 160 },
          mx: 'auto',
          mb: { xs: 2, md: 2, lg: 3 },
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
          mb: { xs: 2, md: 2, lg: 3 },
          color: '#333333',
          fontWeight: 500,
          fontSize: { xs: '1.2rem', md: '1.1rem', lg: '1.4rem' },
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: '#666666',
          lineHeight: 1.7,
          fontSize: { xs: '0.95rem', md: '0.85rem', lg: '1rem' },
        }}
      >
        {description}
      </Typography>
      {actionButton && (
        <Button
          variant="outlined"
          onClick={actionButton.onClick}
          sx={{
            mt: { xs: 2, md: 2, lg: 3 },
            borderColor: '#333333',
            color: '#333333',
            '&:hover': {
              borderColor: '#000000',
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          {actionButton.label}
        </Button>
      )}
    </Box>
  )
}

export default ServiceCard
