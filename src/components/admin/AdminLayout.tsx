import { Outlet } from 'react-router-dom'
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material'
import { LogOut } from 'lucide-react'
import AdminSidebar, { DRAWER_WIDTH } from './AdminSidebar'
import { useAuth } from '../../contexts/AuthContext'

export default function AdminLayout() {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
          ml: `${DRAWER_WIDTH}px`,
          bgcolor: 'background.paper',
          color: 'text.primary',
          boxShadow: 1,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            Eingeloggt als {user?.email}
          </Typography>
          <Button
            color="inherit"
            onClick={handleLogout}
            startIcon={<LogOut size={18} />}
          >
            Abmelden
          </Button>
        </Toolbar>
      </AppBar>

      <AdminSidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'grey.50',
          minHeight: '100vh',
          p: 3,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}
