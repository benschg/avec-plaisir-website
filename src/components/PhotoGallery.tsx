import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'
import { GlobalStyles } from '@mui/material'
import type { GalleryImage } from '../types/admin'

interface PhotoGalleryProps {
  open: boolean
  onClose: () => void
  images: GalleryImage[]
  initialIndex?: number
}

const PhotoGallery = ({
  open,
  onClose,
  images,
  initialIndex = 0,
}: PhotoGalleryProps) => {
  // Convert GalleryImage[] to Lightbox slides format
  const slides = images.map((image) => ({
    src: image.fullUrl,
    alt: image.alt || '',
    description: image.description || undefined,
  }))

  return (
    <>
      <GlobalStyles
        styles={{
          '.yarl__button svg g': {
            fill: 'white !important',
          },
          '.yarl__icon svg g': {
            fill: 'white !important',
          },
          '.yarl__navigation_prev svg g, .yarl__navigation_next svg g': {
            fill: 'white !important',
          },
        }}
      />
      <Lightbox
        open={open}
        close={onClose}
        slides={slides}
        index={initialIndex}
        plugins={[Captions]}
        captions={{ descriptionTextAlign: 'center' }}
        styles={{
          container: {
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
          },
          button: {
            filter: 'none',
            color: 'white',
          },
          icon: {
            color: 'white',
          },
          navigationPrev: {
            color: 'white',
          },
          navigationNext: {
            color: 'white',
          },
        }}
        controller={{
          closeOnBackdropClick: true,
        }}
      />
    </>
  )
}

export default PhotoGallery
