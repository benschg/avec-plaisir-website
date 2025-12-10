export interface Service {
  id: string
  title: string
  description: string
  icon?: string
}

export interface ContactInfo {
  address: string
  phone: string
  email: string
  instagram: string
  hours: {
    weekdays: string
    saturday: string
    sunday: string
  }
  holidayClosure?: {
    dates: string
    reopening: string
  }
}

export interface TeamMember {
  name: string
  title: string
  role: string
  bio: string
  image?: string
}
