import { useState, useEffect } from 'react'
import { getGalleryImages } from '../services/gallery.service'
import type { GalleryImage, GalleryId } from '../types/admin'

export const useGallery = (galleryId: GalleryId) => {
  const [isOpen, setIsOpen] = useState(false)
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(false)
  const [hasImages, setHasImages] = useState(false)

  // Check if gallery has images on mount
  useEffect(() => {
    const checkImages = async () => {
      try {
        const galleryImages = await getGalleryImages(galleryId)
        const activeImages = galleryImages.filter((img) => img.active)
        setHasImages(activeImages.length > 0)
      } catch (error) {
        console.error(`Error checking ${galleryId} gallery:`, error)
      }
    }

    checkImages()
  }, [galleryId])

  const openGallery = async () => {
    if (images.length === 0 && !loading) {
      setLoading(true)
      try {
        const galleryImages = await getGalleryImages(galleryId)
        setImages(galleryImages.filter((img) => img.active))
      } catch (error) {
        console.error(`Error loading ${galleryId} gallery:`, error)
      } finally {
        setLoading(false)
      }
    }
    setIsOpen(true)
  }

  const closeGallery = () => {
    setIsOpen(false)
  }

  return {
    isOpen,
    images,
    loading,
    hasImages,
    openGallery,
    closeGallery,
  }
}
