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
  IconButton,
  Switch,
} from '@mui/material'
import { ExternalLink, Image as ImageIcon, ChevronLeft, ChevronRight, Trash2, X } from 'lucide-react'
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
  onNext?: () => void
  onPrevious?: () => void
  onDelete?: (image: GalleryImage) => void
  onActiveChange?: (id: string, active: boolean) => void
  hasNext?: boolean
  hasPrevious?: boolean
  currentIndex?: number
  totalImages?: number
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
  onNext,
  onPrevious,
  onDelete,
  onActiveChange,
  hasNext = false,
  hasPrevious = false,
  currentIndex,
  totalImages,
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
      // Immediately update form fields and reset metadata
      setAlt(image.alt)
      setDescription(image.description)
      setThumbnailMeta(null)
      setWebMeta(null)
      setFullMeta(null)
      setLoadingMeta(true)

      // Small delay to ensure state is updated before fetching
      const timeoutId = setTimeout(() => {
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
      }, 50)

      return () => clearTimeout(timeoutId)
    }
  }, [image, open])

  // Auto-save when alt or description changes
  useEffect(() => {
    if (!image || !open) return

    const hasChanges = alt !== image.alt || description !== image.description
    if (!hasChanges) return

    const timeoutId = setTimeout(() => {
      setSaving(true)
      onSave(image.id, { alt, description })
        .catch((error) => {
          console.error('Error auto-saving:', error)
        })
        .finally(() => {
          setSaving(false)
        })
    }, 1000) // Debounce for 1 second

    return () => clearTimeout(timeoutId)
  }, [alt, description, image, open, onSave])

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
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth fullScreen={window.innerWidth < 600}>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
            <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
              Bilddetails
            </Typography>
            {currentIndex !== undefined && totalImages !== undefined && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <IconButton
                  size="small"
                  onClick={onPrevious}
                  disabled={!hasPrevious}
                  sx={{
                    p: 0.25,
                    visibility: hasPrevious ? 'visible' : 'hidden',
                    fontSize: '1rem',
                  }}
                >
                  &lt;
                </IconButton>
                <Typography variant="h6" sx={{ whiteSpace: 'nowrap', fontSize: '1rem' }}>
                  {currentIndex + 1}/{totalImages}
                </Typography>
                <IconButton
                  size="small"
                  onClick={onNext}
                  disabled={!hasNext}
                  sx={{
                    p: 0.25,
                    visibility: hasNext ? 'visible' : 'hidden',
                    fontSize: '1rem',
                  }}
                >
                  &gt;
                </IconButton>
              </Box>
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
            {onActiveChange && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
                  Aktiv
                </Typography>
                <Switch
                  size="small"
                  checked={image.active}
                  onChange={(e) => onActiveChange(image.id, e.target.checked)}
                />
              </Box>
            )}
            {onDelete && (
              <IconButton
                size="small"
                color="error"
                onClick={() => {
                  onDelete(image)
                  onClose()
                }}
                sx={{ p: 0.5 }}
              >
                <Trash2 size={18} />
              </IconButton>
            )}
            <IconButton
              size="small"
              onClick={onClose}
              sx={{ p: 0.5 }}
            >
              <X size={20} />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ pt: { xs: 2, sm: 3 } }}>
        {/* Image Preview */}
        <Box
          sx={{
            width: '100%',
            height: 400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 1,
            bgcolor: 'grey.100',
            mb: 3,
            overflow: 'hidden',
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <Box
            key={image.id}
            component="img"
            src={image.webUrl}
            alt={image.alt}
            sx={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              transition: 'all 0.3s ease-in-out',
              opacity: loadingMeta ? 0.7 : (image.active ? 1 : 0.6),
              filter: image.active ? 'none' : 'grayscale(100%)',
            }}
          />
        </Box>

        {/* Form Fields */}
        <Box sx={{ position: 'relative' }}>
          <TextField
            label="Beschreibung"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={3}
            size="small"
            sx={{ mb: 2 }}
            helperText="Optionale ausführliche Beschreibung des Bildes"
          />
          <TextField
            label="Alt-Text"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            fullWidth
            size="small"
            sx={{ mb: 1 }}
            helperText="Kurze Beschreibung für Barrierefreiheit und SEO"
          />
          {saving && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2, fontStyle: 'italic' }}>
              Speichern...
            </Typography>
          )}
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Image Sizes - Compact */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Bildgrössen
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {/* Thumbnail */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Vorschaubild:
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {loadingMeta ? (
                  <Skeleton variant="text" width={100} />
                ) : thumbnailMeta ? (
                  <Typography variant="body2" color="text.secondary">
                    {thumbnailMeta.width} × {thumbnailMeta.height} px
                    {thumbnailMeta.size > 0 && ` · ${formatFileSize(thumbnailMeta.size)}`}
                  </Typography>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    N/A
                  </Typography>
                )}
                <Link
                  href={image.thumbnailUrl}
                  target="_blank"
                  rel="noopener"
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <ExternalLink size={14} />
                </Link>
              </Box>
            </Box>

            {/* Web */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Webgrösse:
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {loadingMeta ? (
                  <Skeleton variant="text" width={100} />
                ) : webMeta ? (
                  <Typography variant="body2" color="text.secondary">
                    {webMeta.width} × {webMeta.height} px
                    {webMeta.size > 0 && ` · ${formatFileSize(webMeta.size)}`}
                  </Typography>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    N/A
                  </Typography>
                )}
                <Link
                  href={image.webUrl}
                  target="_blank"
                  rel="noopener"
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <ExternalLink size={14} />
                </Link>
              </Box>
            </Box>

            {/* Full */}
            {image.fullUrl && image.fullUrl !== image.webUrl && (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Vollgrösse:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {loadingMeta ? (
                    <Skeleton variant="text" width={100} />
                  ) : fullMeta ? (
                    <Typography variant="body2" color="text.secondary">
                      {fullMeta.width} × {fullMeta.height} px
                      {fullMeta.size > 0 && ` · ${formatFileSize(fullMeta.size)}`}
                    </Typography>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      N/A
                    </Typography>
                  )}
                  <Link
                    href={image.fullUrl}
                    target="_blank"
                    rel="noopener"
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <ExternalLink size={14} />
                  </Link>
                </Box>
              </Box>
            )}
          </Box>
        </Box>

        <Typography variant="caption" color="text.secondary">
          Hochgeladen am {image.uploadedAt.toLocaleDateString('de-CH')}
        </Typography>
      </DialogContent>
    </Dialog>
  )
}
