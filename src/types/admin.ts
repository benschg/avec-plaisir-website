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
  thumbnailUrl: string
  webUrl: string
  alt: string
  order: number
  active: boolean
  uploadedAt: Date
}
