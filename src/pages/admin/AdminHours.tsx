import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Switch,
  FormControlLabel,
  Snackbar,
  Alert,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from '@mui/material'
import {
  Save,
  TreePine,
  CableCar,
  Egg,
  Glasses,
  Snowflake,
  Palmtree,
} from 'lucide-react'
import { getContactInfo, updateContactInfo } from '../../services/content.service'
import type { ContactInfoData, HolidayIconId } from '../../types/admin'
import { HOLIDAY_ICONS } from '../../types/admin'

const iconComponents = {
  TreePine,
  CableCar,
  Egg,
  Glasses,
  Snowflake,
  Palmtree,
} as const

export default function AdminHours() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [snackbar, setSnackbar] = useState<{
    open: boolean
    message: string
    severity: 'success' | 'error'
  }>({ open: false, message: '', severity: 'success' })

  const [hours, setHours] = useState({
    weekdays: '',
    saturday: '',
    sunday: '',
  })

  const [holidayClosure, setHolidayClosure] = useState<{
    text: string
    enabled: boolean
    icon?: HolidayIconId
  }>({
    text: '',
    enabled: false,
    icon: 'christmas',
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const data = await getContactInfo()
      if (data) {
        setHours(data.hours)
        setHolidayClosure(data.holidayClosure)
      }
    } catch (error) {
      console.error('Error loading data:', error)
      setSnackbar({
        open: true,
        message: 'Fehler beim Laden der Daten',
        severity: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      const data: Omit<ContactInfoData, 'updatedAt'> = {
        hours,
        holidayClosure,
      }
      await updateContactInfo(data)
      setSnackbar({
        open: true,
        message: 'Änderungen gespeichert',
        severity: 'success',
      })
    } catch (error) {
      console.error('Error saving:', error)
      setSnackbar({
        open: true,
        message: 'Fehler beim Speichern',
        severity: 'error',
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={4}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '1.75rem', sm: '2.125rem' } }}>
        Öffnungszeiten
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={{ xs: 3, sm: 4 }}>
        Verwalte die Öffnungszeiten und Feiertags-Schliessungen.
      </Typography>

      <Paper sx={{ p: { xs: 2, sm: 3 }, mb: { xs: 2, sm: 3 } }}>
        <Typography variant="h6" gutterBottom>
          Reguläre Öffnungszeiten
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Montag - Freitag"
            value={hours.weekdays}
            onChange={(e) => setHours({ ...hours, weekdays: e.target.value })}
            placeholder="z.B. Montag bis Freitag 9 – 18 Uhr"
            fullWidth
          />
          <TextField
            label="Samstag"
            value={hours.saturday}
            onChange={(e) => setHours({ ...hours, saturday: e.target.value })}
            placeholder="z.B. Samstag 9 – 15 Uhr"
            fullWidth
          />
          <TextField
            label="Sonntag"
            value={hours.sunday}
            onChange={(e) => setHours({ ...hours, sunday: e.target.value })}
            placeholder="z.B. Sonntag geschlossen"
            fullWidth
          />
        </Box>
      </Paper>

      <Paper sx={{ p: { xs: 2, sm: 3 }, mb: { xs: 2, sm: 3 } }}>
        <Typography variant="h6" gutterBottom>
          Feiertags-Schliessung
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={holidayClosure.enabled}
              onChange={(e) =>
                setHolidayClosure({
                  ...holidayClosure,
                  enabled: e.target.checked,
                })
              }
            />
          }
          label="Feiertags-Hinweis anzeigen"
        />
        {holidayClosure.enabled && (
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <TextField
              label="Hinweistext"
              value={holidayClosure.text}
              onChange={(e) =>
                setHolidayClosure({ ...holidayClosure, text: e.target.value })
              }
              placeholder="z.B. 26. Dezember 2025 – 3. Januar 2026 geschlossen"
              fullWidth
              multiline
              rows={2}
            />
            <Box>
              <Typography variant="body2" color="text.secondary" mb={1}>
                Symbol auswählen
              </Typography>
              <ToggleButtonGroup
                value={holidayClosure.icon || 'christmas'}
                exclusive
                onChange={(_, value) => {
                  if (value) {
                    setHolidayClosure({ ...holidayClosure, icon: value })
                  }
                }}
                sx={{ flexWrap: 'wrap', gap: 0.5 }}
              >
                {Object.entries(HOLIDAY_ICONS).map(([key, { label, icon }]) => {
                  const IconComponent =
                    iconComponents[icon as keyof typeof iconComponents]
                  return (
                    <Tooltip key={key} title={label}>
                      <ToggleButton value={key} sx={{ px: 2 }}>
                        <IconComponent size={24} />
                      </ToggleButton>
                    </Tooltip>
                  )
                })}
              </ToggleButtonGroup>
            </Box>
          </Box>
        )}
      </Paper>

      <Button
        variant="contained"
        size="large"
        onClick={handleSave}
        disabled={saving}
        startIcon={saving ? <CircularProgress size={20} /> : <Save size={20} />}
        fullWidth={window.innerWidth < 600}
      >
        {saving ? 'Speichern...' : 'Speichern'}
      </Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
