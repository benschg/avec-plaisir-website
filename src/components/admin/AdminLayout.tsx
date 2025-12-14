import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Box, AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material'
import { LogOut, Menu } from 'lucide-react'
import AdminSidebar, { DRAWER_WIDTH } from './AdminSidebar'
import { useAuth } from '../../contexts/AuthContext'

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

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
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
          bgcolor: 'background.paper',
          color: 'text.primary',
          boxShadow: 1,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: 'none' } }}
            >
              <Menu size={24} />
            </IconButton>
            <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', md: 'block' } }}>
              Eingeloggt als {user?.email}
            </Typography>
          </Box>
          <Button
            color="inherit"
            onClick={handleLogout}
            startIcon={<LogOut size={18} />}
            sx={{
              minWidth: 'auto',
              '& .MuiButton-startIcon': {
                mr: { xs: 0, sm: 1 }
              }
            }}
          >
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
              Abmelden
            </Box>
          </Button>
        </Toolbar>
      </AppBar>

      <AdminSidebar mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'grey.50',
          minHeight: '100vh',
          p: { xs: 2, sm: 3 },
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}
