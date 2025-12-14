import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  TextField,
  Switch,
  IconButton,
  Grid,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Tabs,
  Tab,
} from '@mui/material'
import { Trash2, GripVertical } from 'lucide-react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import ImageUploader from '../../components/admin/ImageUploader'
import {
  getGalleryImages,
  addGalleryImage,
  updateGalleryImage,
  updateGalleryOrder,
  deleteGalleryImage,
} from '../../services/gallery.service'
import { GALLERIES, type GalleryImage, type GalleryId } from '../../types/admin'

interface SortableImageCardProps {
  image: GalleryImage
  onAltChange: (id: string, alt: string) => void
  onActiveChange: (id: string, active: boolean) => void
  onDelete: (image: GalleryImage) => void
}

function SortableImageCard({
  image,
  onAltChange,
  onActiveChange,
  onDelete,
}: SortableImageCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <Card ref={setNodeRef} style={style} sx={{ height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 1,
          py: 0.5,
          bgcolor: 'grey.100',
          cursor: 'grab',
        }}
        {...attributes}
        {...listeners}
      >
        <GripVertical size={18} style={{ color: '#9e9e9e' }} />
        <Switch
          size="small"
          checked={image.active}
          onChange={(e) => onActiveChange(image.id, e.target.checked)}
          onClick={(e) => e.stopPropagation()}
        />
      </Box>
      <CardMedia
        component="img"
        image={image.thumbnailUrl}
        alt={image.alt}
        sx={{
          height: 150,
          objectFit: 'cover',
          opacity: image.active ? 1 : 0.4,
        }}
      />
      <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
        <TextField
          size="small"
          placeholder="Alt-Text"
          value={image.alt}
          onChange={(e) => onAltChange(image.id, e.target.value)}
          fullWidth
          sx={{ mb: 1 }}
        />
        <IconButton
          size="small"
          color="error"
          onClick={() => onDelete(image)}
          sx={{ float: 'right' }}
        >
          <Trash2 size={16} />
        </IconButton>
      </CardContent>
    </Card>
  )
}

const galleryIds = Object.keys(GALLERIES) as GalleryId[]

export default function AdminGallery() {
  const [activeGallery, setActiveGallery] = useState<GalleryId>(galleryIds[0])
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState<GalleryImage | null>(null)
  const [snackbar, setSnackbar] = useState<{
    open: boolean
    message: string
    severity: 'success' | 'error'
  }>({ open: false, message: '', severity: 'success' })

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    loadImages()
  }, [activeGallery])

  const loadImages = async () => {
    try {
      setLoading(true)
      const data = await getGalleryImages(activeGallery)
      setImages(data)
    } catch (error) {
      console.error('Error loading images:', error)
      setSnackbar({
        open: true,
        message: 'Fehler beim Laden der Bilder',
        severity: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleTabChange = (_: React.SyntheticEvent, newValue: GalleryId) => {
    setActiveGallery(newValue)
  }

  const handleUpload = async (file: File) => {
    try {
      setUploading(true)
      const maxOrder = images.reduce((max, img) => Math.max(max, img.order), 0)
      const newImage = await addGalleryImage(activeGallery, file, '', maxOrder + 1)
      setImages((prev) => [...prev, newImage])
      setSnackbar({
        open: true,
        message: 'Bild hochgeladen',
        severity: 'success',
      })
    } catch (error) {
      console.error('Upload error:', error)
      setSnackbar({
        open: true,
        message: 'Fehler beim Hochladen',
        severity: 'error',
      })
    } finally {
      setUploading(false)
    }
  }

  const handleAltChange = async (id: string, alt: string) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, alt } : img))
    )

    try {
      await updateGalleryImage(id, { alt })
    } catch (error) {
      console.error('Error updating alt:', error)
    }
  }

  const handleActiveChange = async (id: string, active: boolean) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, active } : img))
    )

    try {
      await updateGalleryImage(id, { active })
    } catch (error) {
      console.error('Error updating active:', error)
    }
  }

  const handleDelete = async () => {
    if (!deleteDialog) return

    try {
      await deleteGalleryImage(deleteDialog)
      setImages((prev) => prev.filter((img) => img.id !== deleteDialog.id))
      setSnackbar({
        open: true,
        message: 'Bild gelöscht',
        severity: 'success',
      })
    } catch (error) {
      console.error('Error deleting:', error)
      setSnackbar({
        open: true,
        message: 'Fehler beim Löschen',
        severity: 'error',
      })
    } finally {
      setDeleteDialog(null)
    }
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = images.findIndex((img) => img.id === active.id)
      const newIndex = images.findIndex((img) => img.id === over.id)

      const newImages = arrayMove(images, oldIndex, newIndex).map(
        (img, index) => ({
          ...img,
          order: index,
        })
      )

      setImages(newImages)

      try {
        await updateGalleryOrder(
          newImages.map((img) => ({ id: img.id, order: img.order }))
        )
      } catch (error) {
        console.error('Error updating order:', error)
        loadImages() // Reload on error
      }
    }
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Galerie
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={2}>
        Verwalte die Bilder der Galerien. Ziehe Bilder um die Reihenfolge zu
        ändern.
      </Typography>

      <Tabs
        value={activeGallery}
        onChange={handleTabChange}
        sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
      >
        {galleryIds.map((id) => (
          <Tab key={id} label={GALLERIES[id].name} value={id} />
        ))}
      </Tabs>

      <Box mb={4}>
        <ImageUploader onUpload={handleUpload} disabled={uploading} />
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : images.length === 0 ? (
        <Typography color="text.secondary" textAlign="center" py={4}>
          Noch keine Bilder in dieser Galerie
        </Typography>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={images.map((img) => img.id)}
            strategy={rectSortingStrategy}
          >
            <Grid container spacing={2}>
              {images.map((image) => (
                <Grid size={{ xs: 6, sm: 4, md: 3 }} key={image.id}>
                  <SortableImageCard
                    image={image}
                    onAltChange={handleAltChange}
                    onActiveChange={handleActiveChange}
                    onDelete={setDeleteDialog}
                  />
                </Grid>
              ))}
            </Grid>
          </SortableContext>
        </DndContext>
      )}

      {/* Delete confirmation dialog */}
      <Dialog open={!!deleteDialog} onClose={() => setDeleteDialog(null)}>
        <DialogTitle>Bild löschen?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Möchtest du dieses Bild wirklich löschen? Diese Aktion kann nicht
            rückgängig gemacht werden.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(null)}>Abbrechen</Button>
          <Button onClick={handleDelete} color="error">
            Löschen
          </Button>
        </DialogActions>
      </Dialog>

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
