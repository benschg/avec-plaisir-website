import { useState, useEffect, useCallback } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Grid,
  Skeleton,
  Divider,
  Link,
} from '@mui/material'
import { ExternalLink, Image as ImageIcon } from 'lucide-react'
import type { GalleryImage } from '../../types/admin'

interface ImageMetadata {
  width: number
  height: number
  size: number
}

interface ImageDetailDialogProps {
  image: GalleryImage | null
  open: boolean
  onClose: () => void
  onSave: (id: string, data: { alt: string; description: string }) => Promise<void>
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

async function fetchImageMetadata(url: string): Promise<ImageMetadata> {
  // Try to fetch blob first to get both size and create object URL for dimensions
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    const size = blob.size

    // Get dimensions from blob
    const dimensions = await new Promise<{ width: number; height: number }>(
      (resolve, reject) => {
        const img = new window.Image()
        const objectUrl = URL.createObjectURL(blob)
        img.onload = () => {
          URL.revokeObjectURL(objectUrl)
          resolve({
            width: img.naturalWidth,
            height: img.naturalHeight,
          })
        }
        img.onerror = () => {
          URL.revokeObjectURL(objectUrl)
          reject(new Error('Failed to load image'))
        }
        img.src = objectUrl
      }
    )

    return { ...dimensions, size }
  } catch {
    // Fallback: load image directly without file size
    const dimensions = await new Promise<{ width: number; height: number }>(
      (resolve, reject) => {
        const img = new window.Image()
        img.onload = () => {
          resolve({
            width: img.naturalWidth,
            height: img.naturalHeight,
          })
        }
        img.onerror = () => reject(new Error('Failed to load image'))
        img.src = url
      }
    )

    return { ...dimensions, size: 0 }
  }
}

export default function ImageDetailDialog({
  image,
  open,
  onClose,
  onSave,
}: ImageDetailDialogProps) {
  const [alt, setAlt] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)
  const [thumbnailMeta, setThumbnailMeta] = useState<ImageMetadata | null>(null)
  const [webMeta, setWebMeta] = useState<ImageMetadata | null>(null)
  const [fullMeta, setFullMeta] = useState<ImageMetadata | null>(null)
  const [loadingMeta, setLoadingMeta] = useState(false)

  useEffect(() => {
    if (image && open) {
      setAlt(image.alt)
      setDescription(image.description)
      setThumbnailMeta(null)
      setWebMeta(null)
      setFullMeta(null)
      setLoadingMeta(true)

      // Fetch metadata for all image sizes
      Promise.all([
        fetchImageMetadata(image.thumbnailUrl).catch(() => null),
        fetchImageMetadata(image.webUrl).catch(() => null),
        image.fullUrl && image.fullUrl !== image.webUrl
          ? fetchImageMetadata(image.fullUrl).catch(() => null)
          : Promise.resolve(null),
      ]).then(([thumb, web, full]) => {
        setThumbnailMeta(thumb)
        setWebMeta(web)
        setFullMeta(full)
        setLoadingMeta(false)
      })
    }
  }, [image, open])

  const handleSave = useCallback(async () => {
    if (!image) return

    setSaving(true)
    try {
      await onSave(image.id, { alt, description })
      onClose()
    } catch (error) {
      console.error('Error saving:', error)
    } finally {
      setSaving(false)
    }
  }, [image, alt, description, onSave, onClose])

  const hasChanges = image && (alt !== image.alt || description !== image.description)

  if (!image) return null

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Bilddetails</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          {/* Image Preview */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              component="img"
              src={image.webUrl}
              alt={image.alt}
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: 300,
                objectFit: 'contain',
                borderRadius: 1,
                bgcolor: 'grey.100',
              }}
            />
          </Grid>

          {/* Image Info */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Bildgrössen
            </Typography>

            {/* Thumbnail Info */}
            <Box sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <ImageIcon size={16} />
                <Typography variant="body2" fontWeight="medium">
                  Vorschaubild (Thumbnail)
                </Typography>
              </Box>
              {loadingMeta ? (
                <Skeleton variant="text" width="60%" />
              ) : thumbnailMeta ? (
                <>
                  <Typography variant="body2" color="text.secondary">
                    {thumbnailMeta.width} × {thumbnailMeta.height} px
                  </Typography>
                  {thumbnailMeta.size > 0 && (
                    <Typography variant="body2" color="text.secondary">
                      {formatFileSize(thumbnailMeta.size)}
                    </Typography>
                  )}
                </>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Metadaten nicht verfügbar
                </Typography>
              )}
              <Link
                href={image.thumbnailUrl}
                target="_blank"
                rel="noopener"
                sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}
                variant="caption"
              >
                Öffnen <ExternalLink size={12} />
              </Link>
            </Box>

            {/* Web Size Info */}
            <Box sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <ImageIcon size={16} />
                <Typography variant="body2" fontWeight="medium">
                  Webgrösse
                </Typography>
              </Box>
              {loadingMeta ? (
                <Skeleton variant="text" width="60%" />
              ) : webMeta ? (
                <>
                  <Typography variant="body2" color="text.secondary">
                    {webMeta.width} × {webMeta.height} px
                  </Typography>
                  {webMeta.size > 0 && (
                    <Typography variant="body2" color="text.secondary">
                      {formatFileSize(webMeta.size)}
                    </Typography>
                  )}
                </>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Metadaten nicht verfügbar
                </Typography>
              )}
              <Link
                href={image.webUrl}
                target="_blank"
                rel="noopener"
                sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}
                variant="caption"
              >
                Öffnen <ExternalLink size={12} />
              </Link>
            </Box>

            {/* Full Size Info */}
            {image.fullUrl && image.fullUrl !== image.webUrl && (
              <Box sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <ImageIcon size={16} />
                  <Typography variant="body2" fontWeight="medium">
                    Vollgrösse (High-Res)
                  </Typography>
                </Box>
                {loadingMeta ? (
                  <Skeleton variant="text" width="60%" />
                ) : fullMeta ? (
                  <>
                    <Typography variant="body2" color="text.secondary">
                      {fullMeta.width} × {fullMeta.height} px
                    </Typography>
                    {fullMeta.size > 0 && (
                      <Typography variant="body2" color="text.secondary">
                        {formatFileSize(fullMeta.size)}
                      </Typography>
                    )}
                  </>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Metadaten nicht verfügbar
                  </Typography>
                )}
                <Link
                  href={image.fullUrl}
                  target="_blank"
                  rel="noopener"
                  sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}
                  variant="caption"
                >
                  Öffnen <ExternalLink size={12} />
                </Link>
              </Box>
            )}

            <Typography variant="caption" color="text.secondary">
              Hochgeladen am {image.uploadedAt.toLocaleDateString('de-CH')}
            </Typography>
          </Grid>

          {/* Form Fields */}
          <Grid size={12}>
            <Divider sx={{ my: 1 }} />
            <TextField
              label="Alt-Text"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              fullWidth
              size="small"
              sx={{ mb: 2, mt: 2 }}
              helperText="Kurze Beschreibung für Barrierefreiheit und SEO"
            />
            <TextField
              label="Beschreibung"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              rows={3}
              size="small"
              helperText="Optionale ausführliche Beschreibung des Bildes"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Abbrechen</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={saving || !hasChanges}
        >
          {saving ? 'Speichern...' : 'Speichern'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
