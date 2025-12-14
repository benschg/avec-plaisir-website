import { NavLink } from 'react-router-dom'
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
} from '@mui/material'
import { LayoutDashboard, Clock, Images } from 'lucide-react'

const DRAWER_WIDTH = 240

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/hours', label: 'Öffnungszeiten', icon: Clock },
  { to: '/admin/gallery', label: 'Galerie', icon: Images },
]

interface AdminSidebarProps {
  mobileOpen: boolean
  onDrawerToggle: () => void
}

export default function AdminSidebar({ mobileOpen, onDrawerToggle }: AdminSidebarProps) {
  const drawerContent = (
    <>
      <Toolbar>
        <Box>
          <Typography variant="h6" fontWeight="bold">
            Admin
          </Typography>
          <Typography variant="caption" color="text.secondary">
            avec plaisir
          </Typography>
        </Box>
      </Toolbar>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.to} disablePadding>
            <ListItemButton
              component={NavLink}
              to={item.to}
              end={item.end}
              onClick={onDrawerToggle}
              sx={{
                '&.active': {
                  bgcolor: 'action.selected',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main',
                  },
                  '& .MuiListItemText-primary': {
                    fontWeight: 'bold',
                  },
                },
              }}
            >
              <ListItemIcon>
                <item.icon size={20} />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  )

  return (
    <Box component="nav" sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  )
}

export { DRAWER_WIDTH }
