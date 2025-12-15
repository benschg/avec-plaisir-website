export interface AdminUser {
  emails: string[]
}

export interface ContactInfoData {
  hours: {
    weekdays: string
    saturday: string
    sunday: string
  }
  holidayClosure: {
    text: string
    enabled: boolean
  }
  updatedAt?: Date
}

export interface GalleryImage {
  id: string
  galleryId: string
  thumbnailUrl: string
  webUrl: string
  fullUrl: string
  alt: string
  description: string
  order: number
  active: boolean
  uploadedAt: Date
}

// Hardcoded gallery definitions
export const GALLERIES = {
  trauerfloristik: {
    id: 'trauerfloristik',
    name: 'Trauerfloristik',
  },
  events: {
    id: 'events',
    name: 'Events',
  },
} as const

export type GalleryId = keyof typeof GALLERIES
