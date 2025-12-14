import { Link } from 'react-router-dom'
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Grid,
} from '@mui/material'
import { Clock, Images } from 'lucide-react'

const quickActions = [
  {
    to: '/admin/hours',
    title: 'Öffnungszeiten',
    description: 'Öffnungszeiten und Feiertage verwalten',
    icon: Clock,
  },
  {
    to: '/admin/gallery',
    title: 'Galerie',
    description: 'Bilder hochladen und verwalten',
    icon: Images,
  },
]

export default function AdminDashboard() {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Willkommen
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Verwalte hier die Inhalte der avec plaisir Website.
      </Typography>

      <Typography variant="h6" gutterBottom>
        Schnellzugriff
      </Typography>
      <Grid container spacing={3}>
        {quickActions.map((action) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={action.to}>
            <Card>
              <CardActionArea component={Link} to={action.to}>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2} mb={1}>
                    <action.icon size={24} />
                    <Typography variant="h6">{action.title}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {action.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
