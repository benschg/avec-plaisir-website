import { Box } from '@mui/material'

interface ServiceImageProps {
  src: string
  alt: string
}

const ServiceImage = ({ src, alt }: ServiceImageProps) => {
  return (
    <Box
      sx={{
        height: '100%',
        minHeight: '300px',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </Box>
  )
}

export default ServiceImage
