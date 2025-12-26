export interface AdminUser {
  emails: string[]
}

export const HOLIDAY_ICONS = {
  christmas: { id: 'christmas', label: 'Weihnachten', icon: 'TreePine' },
  skiing: { id: 'skiing', label: 'Skiferien', icon: 'CableCar' },
  easter: { id: 'easter', label: 'Ostern', icon: 'Egg' },
  summer: { id: 'summer', label: 'Sommerferien', icon: 'Glasses' },
  snowflake: { id: 'snowflake', label: 'Winterferien', icon: 'Snowflake' },
  palmtree: { id: 'palmtree', label: 'Strandferien', icon: 'Palmtree' },
} as const

export type HolidayIconId = keyof typeof HOLIDAY_ICONS

export interface ContactInfoData {
  hours: {
    weekdays: string
    saturday: string
    sunday: string
  }
  holidayClosure: {
    text: string
    enabled: boolean
    icon?: HolidayIconId
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
