import { lazy, Suspense } from 'react'
import { ThemeProvider, CssBaseline, CircularProgress, Box } from '@mui/material'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { theme } from './theme'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Impressum from './pages/Impressum'
import AGBs from './pages/AGBs'
import Datenschutz from './pages/Datenschutz'

// Lazy load admin components
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminHours = lazy(() => import('./pages/admin/AdminHours'))
const AdminGallery = lazy(() => import('./pages/admin/AdminGallery'))
const ProtectedRoute = lazy(() => import('./components/admin/ProtectedRoute'))

// Loading component
const LoadingFallback = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
    <CircularProgress />
  </Box>
)

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Public routes */}
              <Route
                path="/"
                element={
                  <Layout showScrollStepper={true}>
                    <Home />
                  </Layout>
                }
              />
              <Route
                path="/impressum"
                element={
                  <Layout>
                    <Impressum />
                  </Layout>
                }
              />
              <Route
                path="/agbs"
                element={
                  <Layout>
                    <AGBs />
                  </Layout>
                }
              />
              <Route
                path="/datenschutz"
                element={
                  <Layout>
                    <Datenschutz />
                  </Layout>
                }
              />

              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="hours" element={<AdminHours />} />
                <Route path="gallery" element={<AdminGallery />} />
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
