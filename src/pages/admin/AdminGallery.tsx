import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
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
  Checkbox,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material'
import { Trash2, GripVertical, LayoutGrid, List } from 'lucide-react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
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
import ImageDetailDialog from '../../components/admin/ImageDetailDialog'
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
  onActiveChange: (id: string, active: boolean) => void
  onDelete: (image: GalleryImage) => void
  onClick: (image: GalleryImage) => void
  selected: boolean
  onSelectChange: (id: string, selected: boolean) => void
  selectMode: boolean
  viewMode: 'grid' | 'row'
}

function SortableImageCard({
  image,
  onActiveChange,
  onDelete,
  onClick,
  selected,
  onSelectChange,
  selectMode,
  viewMode,
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

  if (viewMode === 'row') {
    return (
      <Card
        ref={setNodeRef}
        style={style}
        sx={{
          display: 'flex',
          outline: selected ? '2px solid' : 'none',
          outlineColor: 'primary.main',
          mb: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            px: 1,
            bgcolor: selected ? 'primary.light' : 'grey.100',
          }}
        >
          {selectMode && (
            <Checkbox
              size="small"
              checked={selected}
              onChange={(e) => onSelectChange(image.id, e.target.checked)}
              sx={{ p: 0 }}
            />
          )}
          <Box
            sx={{
              cursor: 'grab',
              display: 'flex',
              alignItems: 'center',
              touchAction: 'none',
            }}
            {...attributes}
            {...listeners}
          >
            <GripVertical size={18} style={{ color: '#9e9e9e' }} />
          </Box>
        </Box>
        <CardMedia
          component="img"
          image={image.thumbnailUrl}
          alt={image.alt}
          onClick={() => onClick(image)}
          sx={{
            width: 120,
            height: 80,
            objectFit: 'cover',
            opacity: image.active ? 1 : 0.4,
            cursor: 'pointer',
            '&:hover': {
              opacity: image.active ? 0.9 : 0.5,
            },
          }}
        />
        <CardContent
          sx={{
            flex: 1,
            p: 1.5,
            display: 'flex',
            alignItems: 'center',
            '&:last-child': { pb: 1.5 },
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              flex: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {image.description || 'Keine Beschreibung'}
          </Typography>
        </CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 2,
            bgcolor: selected ? 'primary.light' : 'grey.100',
          }}
        >
          <Switch
            size="small"
            checked={image.active}
            onChange={(e) => onActiveChange(image.id, e.target.checked)}
          />
          <IconButton
            size="small"
            color="error"
            onClick={() => onDelete(image)}
            sx={{ p: 0.5 }}
          >
            <Trash2 size={16} />
          </IconButton>
        </Box>
      </Card>
    )
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      sx={{
        height: '100%',
        outline: selected ? '2px solid' : 'none',
        outlineColor: 'primary.main',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 1,
          py: 0.5,
          bgcolor: selected ? 'primary.light' : 'grey.100',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {selectMode && (
            <Checkbox
              size="small"
              checked={selected}
              onChange={(e) => onSelectChange(image.id, e.target.checked)}
              sx={{ p: 0 }}
            />
          )}
          <Box
            sx={{
              cursor: 'grab',
              display: 'flex',
              alignItems: 'center',
              touchAction: 'none'
            }}
            {...attributes}
            {...listeners}
          >
            <GripVertical size={18} style={{ color: '#9e9e9e' }} />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Switch
            size="small"
            checked={image.active}
            onChange={(e) => onActiveChange(image.id, e.target.checked)}
          />
          <IconButton
            size="small"
            color="error"
            onClick={() => onDelete(image)}
            sx={{ p: 0.5 }}
          >
            <Trash2 size={16} />
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        image={image.thumbnailUrl}
        alt={image.alt}
        onClick={() => onClick(image)}
        sx={{
          height: 150,
          objectFit: 'cover',
          opacity: image.active ? 1 : 0.4,
          cursor: 'pointer',
          '&:hover': {
            opacity: image.active ? 0.9 : 0.5,
          },
        }}
      />
      <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {image.description || 'Keine Beschreibung'}
        </Typography>
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
  const [detailImage, setDetailImage] = useState<GalleryImage | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [batchDeleteDialog, setBatchDeleteDialog] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'row'>('grid')
  const [snackbar, setSnackbar] = useState<{
    open: boolean
    message: string
    severity: 'success' | 'error'
  }>({ open: false, message: '', severity: 'success' })

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 8,
      },
    }),
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
    setSelectedIds(new Set()) // Clear selection when switching galleries
  }

  const handleSelectChange = (id: string, selected: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (selected) {
        next.add(id)
      } else {
        next.delete(id)
      }
      return next
    })
  }

  const handleSelectAll = () => {
    if (selectedIds.size === images.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(images.map((img) => img.id)))
    }
  }

  const handleBatchDelete = async () => {
    if (selectedIds.size === 0) return

    setDeleting(true)
    const toDelete = images.filter((img) => selectedIds.has(img.id))
    let deletedCount = 0

    for (const image of toDelete) {
      try {
        await deleteGalleryImage(image)
        deletedCount++
      } catch (error) {
        console.error('Error deleting image:', error)
      }
    }

    setImages((prev) => prev.filter((img) => !selectedIds.has(img.id)))
    setSelectedIds(new Set())
    setBatchDeleteDialog(false)
    setDeleting(false)

    setSnackbar({
      open: true,
      message: `${deletedCount} Bild${deletedCount !== 1 ? 'er' : ''} gelöscht`,
      severity: 'success',
    })
  }

  const handleUpload = async (
    file: File,
    onProgress: (progress: number) => void
  ) => {
    try {
      setUploading(true)
      const maxOrder = images.reduce((max, img) => Math.max(max, img.order), 0)
      const newImage = await addGalleryImage(
        activeGallery,
        file,
        '',
        maxOrder + 1,
        onProgress
      )
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

  const handleDetailSave = async (
    id: string,
    data: { alt: string; description: string }
  ) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, ...data } : img))
    )

    try {
      await updateGalleryImage(id, data)
      setSnackbar({
        open: true,
        message: 'Änderungen gespeichert',
        severity: 'success',
      })
    } catch (error) {
      console.error('Error updating image:', error)
      setSnackbar({
        open: true,
        message: 'Fehler beim Speichern',
        severity: 'error',
      })
      throw error
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
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '1.75rem', sm: '2.125rem' } }}>
        Galerie
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={2}>
        Verwalte die Bilder der Galerien. Ziehe Bilder um die Reihenfolge zu
        ändern.
      </Typography>

      <Tabs
        value={activeGallery}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
      >
        {galleryIds.map((id) => (
          <Tab key={id} label={GALLERIES[id].name} value={id} />
        ))}
      </Tabs>

      <Box mb={{ xs: 3, sm: 4 }}>
        <ImageUploader onUpload={handleUpload} disabled={uploading} />
      </Box>

      {/* Selection controls and view toggle */}
      {images.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'stretch', sm: 'center' },
            gap: 2,
            mb: 2,
            p: { xs: 1.5, sm: 1.5 },
            bgcolor: selectedIds.size > 0 ? 'primary.50' : 'grey.50',
            borderRadius: 1,
          }}
        >
          <Button
            size="small"
            variant="outlined"
            onClick={handleSelectAll}
          >
            {selectedIds.size === images.length ? 'Keine auswählen' : 'Alle auswählen'}
          </Button>
          {selectedIds.size > 0 && (
            <>
              <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
                {selectedIds.size} ausgewählt
              </Typography>
              <Button
                size="small"
                variant="contained"
                color="error"
                startIcon={<Trash2 size={16} />}
                onClick={() => setBatchDeleteDialog(true)}
              >
                {selectedIds.size} {selectedIds.size === 1 ? 'Bild' : 'Bilder'} löschen
              </Button>
            </>
          )}
          <Box sx={{ marginLeft: 'auto' }}>
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={(_, newMode) => newMode && setViewMode(newMode)}
              size="small"
            >
              <ToggleButton value="grid" aria-label="grid view">
                <LayoutGrid size={16} />
              </ToggleButton>
              <ToggleButton value="row" aria-label="row view">
                <List size={16} />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
      )}

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
            strategy={viewMode === 'grid' ? rectSortingStrategy : undefined}
          >
            {viewMode === 'row' ? (
              <Box>
                {images.map((image) => (
                  <SortableImageCard
                    key={image.id}
                    image={image}
                    onActiveChange={handleActiveChange}
                    onDelete={setDeleteDialog}
                    onClick={setDetailImage}
                    selected={selectedIds.has(image.id)}
                    onSelectChange={handleSelectChange}
                    selectMode={selectedIds.size > 0}
                    viewMode={viewMode}
                  />
                ))}
              </Box>
            ) : (
              <Grid container spacing={2}>
                {images.map((image) => (
                  <Grid size={{ xs: 6, sm: 4, md: 3 }} key={image.id}>
                    <SortableImageCard
                      image={image}
                      onActiveChange={handleActiveChange}
                      onDelete={setDeleteDialog}
                      onClick={setDetailImage}
                      selected={selectedIds.has(image.id)}
                      onSelectChange={handleSelectChange}
                      selectMode={selectedIds.size > 0}
                      viewMode={viewMode}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
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

      {/* Batch delete confirmation dialog */}
      <Dialog
        open={batchDeleteDialog}
        onClose={() => !deleting && setBatchDeleteDialog(false)}
      >
        <DialogTitle>{selectedIds.size} Bilder löschen?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Möchtest du {selectedIds.size} Bild{selectedIds.size !== 1 ? 'er' : ''}{' '}
            wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBatchDeleteDialog(false)} disabled={deleting}>
            Abbrechen
          </Button>
          <Button onClick={handleBatchDelete} color="error" disabled={deleting}>
            {deleting ? 'Lösche...' : 'Alle löschen'}
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

      {/* Image detail dialog */}
      <ImageDetailDialog
        image={detailImage}
        open={!!detailImage}
        onClose={() => setDetailImage(null)}
        onSave={handleDetailSave}
        onNext={() => {
          if (!detailImage) return
          const currentIndex = images.findIndex((img) => img.id === detailImage.id)
          if (currentIndex < images.length - 1) {
            setDetailImage(images[currentIndex + 1])
          }
        }}
        onPrevious={() => {
          if (!detailImage) return
          const currentIndex = images.findIndex((img) => img.id === detailImage.id)
          if (currentIndex > 0) {
            setDetailImage(images[currentIndex - 1])
          }
        }}
        onDelete={setDeleteDialog}
        onActiveChange={handleActiveChange}
        hasNext={detailImage ? images.findIndex((img) => img.id === detailImage.id) < images.length - 1 : false}
        hasPrevious={detailImage ? images.findIndex((img) => img.id === detailImage.id) > 0 : false}
        currentIndex={detailImage ? images.findIndex((img) => img.id === detailImage.id) : undefined}
        totalImages={images.length}
      />
    </Box>
  )
}
