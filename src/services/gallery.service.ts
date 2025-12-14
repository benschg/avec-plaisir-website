import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
  Timestamp,
  writeBatch,
} from 'firebase/firestore'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import imageCompression from 'browser-image-compression'
import heic2any from 'heic2any'
import { db, storage } from '../config/firebase'
import type { GalleryImage, GalleryId } from '../types/admin'

const GALLERY_COLLECTION = 'gallery'

// Convert HEIC/HEIF to JPEG
async function convertHeicToJpeg(file: File): Promise<File> {
  const isHeic =
    file.type === 'image/heic' ||
    file.type === 'image/heif' ||
    file.name.toLowerCase().endsWith('.heic') ||
    file.name.toLowerCase().endsWith('.heif')

  if (!isHeic) {
    return file
  }

  const blob = await heic2any({
    blob: file,
    toType: 'image/jpeg',
    quality: 0.92,
  })

  const jpegBlob = Array.isArray(blob) ? blob[0] : blob
  const newName = file.name.replace(/\.heic$/i, '.jpg').replace(/\.heif$/i, '.jpg')

  // Create a new File object with lastModified to avoid browser-image-compression issues
  return new File([jpegBlob], newName, {
    type: 'image/jpeg',
    lastModified: Date.now(),
  })
}

export async function getGalleryImages(
  galleryId: GalleryId
): Promise<GalleryImage[]> {
  try {
    const q = query(
      collection(db, GALLERY_COLLECTION),
      where('galleryId', '==', galleryId),
      orderBy('order', 'asc')
    )
    const snapshot = await getDocs(q)

    return snapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        galleryId: data.galleryId,
        thumbnailUrl: data.thumbnailUrl,
        webUrl: data.webUrl,
        fullUrl: data.fullUrl || data.webUrl, // Fallback to webUrl for older images
        alt: data.alt || '',
        description: data.description || '',
        order: data.order,
        active: data.active,
        uploadedAt:
          data.uploadedAt instanceof Timestamp
            ? data.uploadedAt.toDate()
            : new Date(),
      }
    })
  } catch (error) {
    console.error('Error fetching gallery images:', error)
    throw error
  }
}

export async function addGalleryImage(
  galleryId: GalleryId,
  file: File,
  alt: string,
  order: number,
  onProgress?: (progress: number) => void
): Promise<GalleryImage> {
  try {
    onProgress?.(5)

    // Convert HEIC to JPEG if needed
    const processedFile = await convertHeicToJpeg(file)
    onProgress?.(15)

    // Compress to thumbnail (300px) - for grid previews
    const thumbnailOptions = {
      maxWidthOrHeight: 300,
      initialQuality: 0.8,
      useWebWorker: true,
    }
    const thumbnailFile = await imageCompression(processedFile, thumbnailOptions)
    onProgress?.(25)

    // Compress to web size (800px) - for lightbox/modal
    const webOptions = {
      maxWidthOrHeight: 800,
      initialQuality: 0.85,
      useWebWorker: true,
    }
    const webFile = await imageCompression(processedFile, webOptions)
    onProgress?.(40)

    // Compress to full size (1600px) - for high-res viewing
    const fullOptions = {
      maxWidthOrHeight: 1600,
      initialQuality: 0.9,
      useWebWorker: true,
    }
    const fullFile = await imageCompression(processedFile, fullOptions)
    onProgress?.(55)

    // Generate unique filename (use processedFile.name which has .jpg for converted HEIC)
    const timestamp = Date.now()
    const cleanName = processedFile.name.replace(/[^a-zA-Z0-9.]/g, '-')
    const baseName = `${timestamp}-${cleanName}`

    // Upload thumbnail
    const thumbnailRef = ref(
      storage,
      `gallery/${galleryId}/thumbnails/${baseName}`
    )
    await uploadBytes(thumbnailRef, thumbnailFile)
    const thumbnailUrl = await getDownloadURL(thumbnailRef)
    onProgress?.(70)

    // Upload web version
    const webRef = ref(storage, `gallery/${galleryId}/web/${baseName}`)
    await uploadBytes(webRef, webFile)
    const webUrl = await getDownloadURL(webRef)
    onProgress?.(80)

    // Upload full version
    const fullRef = ref(storage, `gallery/${galleryId}/full/${baseName}`)
    await uploadBytes(fullRef, fullFile)
    const fullUrl = await getDownloadURL(fullRef)
    onProgress?.(90)

    // Create Firestore document
    const docRef = await addDoc(collection(db, GALLERY_COLLECTION), {
      galleryId,
      thumbnailUrl,
      webUrl,
      fullUrl,
      alt,
      description: '',
      order,
      active: true,
      uploadedAt: serverTimestamp(),
    })
    onProgress?.(100)

    return {
      id: docRef.id,
      galleryId,
      thumbnailUrl,
      webUrl,
      fullUrl,
      alt,
      description: '',
      order,
      active: true,
      uploadedAt: new Date(),
    }
  } catch (error) {
    console.error('Error adding gallery image:', error)
    throw error
  }
}

export async function updateGalleryImage(
  id: string,
  data: Partial<Pick<GalleryImage, 'alt' | 'description' | 'order' | 'active'>>
): Promise<void> {
  try {
    const docRef = doc(db, GALLERY_COLLECTION, id)
    await updateDoc(docRef, data)
  } catch (error) {
    console.error('Error updating gallery image:', error)
    throw error
  }
}

export async function updateGalleryOrder(
  images: { id: string; order: number }[]
): Promise<void> {
  try {
    const batch = writeBatch(db)

    images.forEach(({ id, order }) => {
      const docRef = doc(db, GALLERY_COLLECTION, id)
      batch.update(docRef, { order })
    })

    await batch.commit()
  } catch (error) {
    console.error('Error updating gallery order:', error)
    throw error
  }
}

export async function deleteGalleryImage(image: GalleryImage): Promise<void> {
  try {
    // Delete from Firestore
    const docRef = doc(db, GALLERY_COLLECTION, image.id)
    await deleteDoc(docRef)

    // Extract filename from URL and delete from Storage
    // URLs look like: https://firebasestorage.googleapis.com/.../gallery%2F...%2Ffilename?...
    try {
      const thumbnailPath = decodeURIComponent(
        image.thumbnailUrl.split('/o/')[1].split('?')[0]
      )
      const webPath = decodeURIComponent(
        image.webUrl.split('/o/')[1].split('?')[0]
      )

      await deleteObject(ref(storage, thumbnailPath))
      await deleteObject(ref(storage, webPath))

      // Delete full-size image if it exists (may not exist for older images)
      if (image.fullUrl && image.fullUrl !== image.webUrl) {
        const fullPath = decodeURIComponent(
          image.fullUrl.split('/o/')[1].split('?')[0]
        )
        await deleteObject(ref(storage, fullPath))
      }
    } catch (storageError) {
      // Log but don't fail if storage deletion fails
      console.warn('Could not delete storage files:', storageError)
    }
  } catch (error) {
    console.error('Error deleting gallery image:', error)
    throw error
  }
}
