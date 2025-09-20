import type { Service, ContactInfo, TeamMember } from '../types'

export const services: Service[] = [
  {
    id: 'blumen-abo',
    title: 'Blumen-Abo',
    description: 'Weekly or monthly flower delivery service with fresh, seasonal blooms delivered to your door.',
    icon: '/images/imgi_19_Avec-Plaisir-Zuerich-Blumenabo.png',
  },
  {
    id: 'trauerfloristik',
    title: 'Trauerfloristik',
    description: 'Compassionate funeral floristry services to honor and remember your loved ones.',
    icon: '/images/imgi_20_Avec-Plaisir-Zuerich-Trauerfloristik.png',
  },
  {
    id: 'hauslieferdienst',
    title: 'Hauslieferdienst',
    description: 'Convenient home delivery service for all your floral needs throughout Zürich.',
    icon: '/images/imgi_21_Avec-Plaisir-Zuerich-Blumenlieferdienst.png',
  },
  {
    id: 'events',
    title: 'Events',
    description: 'Professional floral decoration and arrangements for weddings, parties, and special events.',
    icon: '/images/imgi_22_Avec-Plaisir-Zuerich-Blumendeko.png',
  },
]

export const contactInfo: ContactInfo = {
  address: 'Aemtlerstrasse 205, 8003 Zürich',
  phone: '+41 (0)44 492 21 18',
  email: 'salut@avecplaisir-zuerich.ch',
  instagram: '@avecplaisirzuerich',
  hours: {
    weekdays: 'Monday to Friday: 9 – 18 Uhr',
    saturday: 'Saturday: 9 – 15 Uhr',
    sunday: 'Sunday: Closed',
  },
}

export const teamMembers: TeamMember[] = [
  {
    name: 'Monika Fähndrich',
    role: 'Founder & Florist',
    bio: 'Ein ganzes Meer an Blumen sind in den letzten 30 Jahren durch meine Floristenhände geflossen.',
  },
]

export const content = {
  hero: {
    greeting: 'Bonjour im neuen Blumenladen im Kreis 3',
    title: 'avec plaisir zürich',
    subtitle: 'avec plaisir!',
    intro: 'Saisonale und lokale Blumen, Pflanzentöpfe, Accessoires und Vintage-Produkte für jeden Anlass.',
    ownerQuote: 'Ein ganzes Meer an Blumen sind in den letzten 30 Jahren durch meine Floristenhände geflossen.',
    ownerName: '- Monika Fähndrich',
  },
  contact: {
    title: 'Brauchen Sie blumige Beratung? Wir freuen uns auf Ihre Kontaktaufnahme!',
    newsletter: 'Interessiert an floralen News?',
  },
}