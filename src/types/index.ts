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
}

export interface TeamMember {
  name: string
  role: string
  bio: string
  image?: string
}