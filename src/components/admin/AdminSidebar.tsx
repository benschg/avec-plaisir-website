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

export default function AdminSidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
        },
      }}
    >
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
    </Drawer>
  )
}

export { DRAWER_WIDTH }
