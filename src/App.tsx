import { ThemeProvider, CssBaseline } from '@mui/material'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { theme } from './theme'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Impressum from './pages/Impressum'
import AGBs from './pages/AGBs'
import Datenschutz from './pages/Datenschutz'
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './components/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminHours from './pages/admin/AdminHours'
import AdminGallery from './pages/admin/AdminGallery'
import ProtectedRoute from './components/admin/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
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
        </Router>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
