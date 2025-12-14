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
import { db, storage } from '../config/firebase'
import type { GalleryImage, GalleryId } from '../types/admin'

const GALLERY_COLLECTION = 'gallery'

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
        alt: data.alt,
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
    onProgress?.(10)

    // Compress to thumbnail (300px)
    const thumbnailOptions = {
      maxWidthOrHeight: 300,
      initialQuality: 0.8,
      useWebWorker: true,
    }
    const thumbnailFile = await imageCompression(file, thumbnailOptions)
    onProgress?.(30)

    // Compress to web size (800px)
    const webOptions = {
      maxWidthOrHeight: 800,
      initialQuality: 0.85,
      useWebWorker: true,
    }
    const webFile = await imageCompression(file, webOptions)
    onProgress?.(50)

    // Generate unique filename
    const timestamp = Date.now()
    const cleanName = file.name.replace(/[^a-zA-Z0-9.]/g, '-')
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
    onProgress?.(90)

    // Create Firestore document
    const docRef = await addDoc(collection(db, GALLERY_COLLECTION), {
      galleryId,
      thumbnailUrl,
      webUrl,
      alt,
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
      alt,
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
  data: Partial<Pick<GalleryImage, 'alt' | 'order' | 'active'>>
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
    } catch (storageError) {
      // Log but don't fail if storage deletion fails
      console.warn('Could not delete storage files:', storageError)
    }
  } catch (error) {
    console.error('Error deleting gallery image:', error)
    throw error
  }
}
