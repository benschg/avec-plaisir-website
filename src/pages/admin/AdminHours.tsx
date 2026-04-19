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
  IconButton,
  Stack,
  Divider,
} from '@mui/material'
import {
  Save,
  TreePine,
  CableCar,
  Egg,
  Glasses,
  Snowflake,
  Palmtree,
  Plus,
  Trash2,
} from 'lucide-react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { de } from 'date-fns/locale'
import { getContactInfo, updateContactInfo } from '../../services/content.service'
import type { ContactInfoData, HolidayEntry, HolidayIconId } from '../../types/admin'
import { HOLIDAY_ICONS } from '../../types/admin'

const iconComponents = {
  TreePine,
  CableCar,
  Egg,
  Glasses,
  Snowflake,
  Palmtree,
} as const

const newId = () =>
  `h-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

const toDate = (iso?: string): Date | null => {
  if (!iso) return null
  const d = new Date(iso)
  return isNaN(d.getTime()) ? null : d
}

const toIso = (d: Date | null): string => {
  if (!d || isNaN(d.getTime())) return ''
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

const DEFAULT_START_TIME = '09:00'
const DEFAULT_END_TIME = '18:00'

const toTime = (hhmm?: string): Date | null => {
  if (!hhmm) return null
  const [h, m] = hhmm.split(':').map(Number)
  if (isNaN(h) || isNaN(m)) return null
  const d = new Date()
  d.setHours(h, m, 0, 0)
  return d
}

const fromTime = (d: Date | null): string => {
  if (!d || isNaN(d.getTime())) return ''
  const h = String(d.getHours()).padStart(2, '0')
  const m = String(d.getMinutes()).padStart(2, '0')
  return `${h}:${m}`
}

interface EntryRowProps {
  entry: HolidayEntry
  onChange: (entry: HolidayEntry) => void
  onDelete: () => void
}

function EntryRow({ entry, onChange, onDelete }: EntryRowProps) {
  return (
    <Paper variant="outlined" sx={{ p: 1.5 }}>
      <Stack spacing={1.25}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Switch
            size="small"
            checked={entry.enabled}
            onChange={(e) => onChange({ ...entry, enabled: e.target.checked })}
          />
          <TextField
            size="small"
            label="Bezeichnung"
            value={entry.text}
            onChange={(e) => onChange({ ...entry, text: e.target.value })}
            placeholder="z.B. Sechseläuten, Muttertag, Betriebsferien"
            fullWidth
          />
          <IconButton
            size="small"
            color="error"
            onClick={onDelete}
            aria-label="Eintrag löschen"
          >
            <Trash2 size={18} />
          </IconButton>
        </Stack>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={1}
          alignItems={{ xs: 'stretch', md: 'center' }}
        >
          <DatePicker
            label="Start"
            value={toDate(entry.startDate)}
            onChange={(d) => onChange({ ...entry, startDate: toIso(d) })}
            slotProps={{
              textField: { size: 'small', sx: { minWidth: 0, flex: 1 } },
            }}
          />
          <DatePicker
            label="Ende"
            value={toDate(entry.endDate)}
            onChange={(d) =>
              onChange({ ...entry, endDate: d ? toIso(d) : undefined })
            }
            slotProps={{
              textField: { size: 'small', sx: { minWidth: 0, flex: 1 } },
              field: { clearable: true },
            }}
          />
          <FormControlLabel
            sx={{ mx: 0, whiteSpace: 'nowrap' }}
            control={
              <Switch
                size="small"
                checked={entry.closed}
                onChange={(e) => {
                  const closed = e.target.checked
                  onChange({
                    ...entry,
                    closed,
                    startTime: closed
                      ? undefined
                      : entry.startTime ?? DEFAULT_START_TIME,
                    endTime: closed
                      ? undefined
                      : entry.endTime ?? DEFAULT_END_TIME,
                  })
                }}
              />
            }
            label="Geschlossen"
          />
          {!entry.closed && (
            <>
              <TimePicker
                label="Von"
                value={toTime(entry.startTime ?? DEFAULT_START_TIME)}
                onChange={(d) => onChange({ ...entry, startTime: fromTime(d) })}
                ampm={false}
                slotProps={{
                  textField: { size: 'small', sx: { minWidth: 0, flex: 1 } },
                }}
              />
              <TimePicker
                label="Bis"
                value={toTime(entry.endTime ?? DEFAULT_END_TIME)}
                onChange={(d) => onChange({ ...entry, endTime: fromTime(d) })}
                ampm={false}
                slotProps={{
                  textField: { size: 'small', sx: { minWidth: 0, flex: 1 } },
                }}
              />
            </>
          )}
        </Stack>
      </Stack>
    </Paper>
  )
}

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
    entries: HolidayEntry[]
    enabled: boolean
    icon?: HolidayIconId
  }>({
    entries: [],
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
        setHolidayClosure({
          entries: data.holidayClosure.entries ?? [],
          enabled: data.holidayClosure.enabled,
          icon: data.holidayClosure.icon,
        })
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
      const normalizedEntries = holidayClosure.entries.map((e) =>
        e.closed
          ? e
          : {
              ...e,
              startTime: e.startTime ?? DEFAULT_START_TIME,
              endTime: e.endTime ?? DEFAULT_END_TIME,
            }
      )
      const data: Omit<ContactInfoData, 'updatedAt'> = {
        hours,
        holidayClosure: { ...holidayClosure, entries: normalizedEntries },
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

  const updateEntry = (id: string, next: HolidayEntry) => {
    setHolidayClosure((prev) => ({
      ...prev,
      entries: prev.entries.map((e) => (e.id === id ? next : e)),
    }))
  }

  const deleteEntry = (id: string) => {
    setHolidayClosure((prev) => ({
      ...prev,
      entries: prev.entries.filter((e) => e.id !== id),
    }))
  }

  const addEntry = () => {
    const entry: HolidayEntry = {
      id: newId(),
      text: '',
      startDate: '',
      closed: true,
      enabled: true,
    }
    setHolidayClosure((prev) => ({ ...prev, entries: [...prev.entries, entry] }))
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={4}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
      <Box>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{ fontSize: { xs: '1.75rem', sm: '2.125rem' } }}
        >
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
            <Box mt={2}>
              <Stack spacing={2} mb={2}>
                {holidayClosure.entries.length === 0 && (
                  <Typography variant="body2" color="text.secondary">
                    Noch keine Einträge. Füge unten einen neuen hinzu.
                  </Typography>
                )}
                {holidayClosure.entries.map((entry) => (
                  <EntryRow
                    key={entry.id}
                    entry={entry}
                    onChange={(next) => updateEntry(entry.id, next)}
                    onDelete={() => deleteEntry(entry.id)}
                  />
                ))}
              </Stack>
              <Button
                variant="outlined"
                startIcon={<Plus size={18} />}
                onClick={addEntry}
              >
                Eintrag hinzufügen
              </Button>

              <Divider sx={{ my: 3 }} />

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
    </LocalizationProvider>
  )
}
