import { Box } from '@mui/material'
import AnimatedText from '../components/AnimatedText'

const AnimatedTextSection = () => {
  return (
    <Box
      id="avec-animated"
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
        fontSize={{ xs: '2rem', md: '6rem' }}
        interval={4000}
      />
    </Box>
  )
}

export default AnimatedTextSection
