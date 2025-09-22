import { ThemeProvider, CssBaseline } from '@mui/material'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { theme } from './theme'
import Layout from './components/Layout'
import Home from './pages/Home'
import Impressum from './pages/Impressum'
import AGBs from './pages/AGBs'
import Datenschutz from './pages/Datenschutz'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
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
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
