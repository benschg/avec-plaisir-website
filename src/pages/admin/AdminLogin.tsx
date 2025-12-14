import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Typography, Paper, Alert } from '@mui/material'
import { useAuth } from '../../contexts/AuthContext'

export default function AdminLogin() {
  const { user, isAdmin, loading, signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && user && isAdmin) {
      navigate('/admin')
    }
  }, [user, isAdmin, loading, navigate])

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
    } catch (error) {
      console.error('Sign in failed:', error)
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="grey.100"
      px={{ xs: 2, sm: 0 }}
    >
      <Paper sx={{ p: { xs: 3, sm: 4 }, maxWidth: 400, width: '100%', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Admin Login
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          avec plaisir zürich
        </Typography>

        {user && !isAdmin && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Dieses Konto hat keine Admin-Berechtigung.
          </Alert>
        )}

        <Button
          variant="contained"
          onClick={handleGoogleSignIn}
          fullWidth
          size="large"
          sx={{ py: 1.5 }}
        >
          Mit Google anmelden
        </Button>
      </Paper>
    </Box>
  )
}
