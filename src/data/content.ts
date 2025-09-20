import type { Service, ContactInfo, TeamMember } from '../types'

export const services: Service[] = [
  {
    id: 'blumen-abo',
    title: 'Blumen-Abo',
    description: 'Ob wöchentlich oder monatlich, mit einem Blumen-Abo beliefern wir Sie zuhause oder geschäftlich mit frischen Blumen nach Ihrem Budget und Gusto.',
    icon: '/images/imgi_19_Avec-Plaisir-Zuerich-Blumenabo.png',
  },
  {
    id: 'trauerfloristik',
    title: 'Trauerfloristik',
    description: 'Blumenkranz, Sargbouquets, Urnenschmuck oder Grabbepflanzung, wir nehmen uns viel Zeit, um Ihnen in schweren Stunden bestmöglich zur Seite zu stehen.',
    icon: '/images/imgi_20_Avec-Plaisir-Zuerich-Trauerfloristik.png',
  },
  {
    id: 'hauslieferdienst',
    title: 'Hauslieferdienst',
    description: 'Ihnen ist es nicht möglich, unseren Laden im Kreis 3 zu besuchen? Kein Problem, wir liefern Blumen und Pflanzen gemäss Abmachung auch gerne an die gewünschte Adresse.',
    icon: '/images/imgi_21_Avec-Plaisir-Zuerich-Blumenlieferdienst.png',
  },
  {
    id: 'events',
    title: 'Events',
    description: 'Ihr feierlicher Anlass ist unser floristischer Ansporn. Gerne beraten wir Sie und geben Ihrem Event mit unseren Blumenkreationen das florale i-Tüpfelchen.',
    icon: '/images/imgi_22_Avec-Plaisir-Zuerich-Blumendeko.png',
  },
]

export const contactInfo: ContactInfo = {
  address: 'Aemtlerstrasse 205, 8003 Zürich',
  phone: '+41 (0)44 492 21 18',
  email: 'salut@avecplaisir-zuerich.ch',
  instagram: '@avecplaisirzuerich',
  hours: {
    weekdays: 'Montag bis Freitag: 9 – 18 Uhr',
    saturday: 'Samstag: 9 – 15 Uhr',
    sunday: 'Sonntag: geschlossen',
  },
}

export const teamMembers: TeamMember[] = [
  {
    name: 'Monika Fähndrich',
    role: 'Inhaberin & Floristin',
    bio: 'Ein ganzes Meer an Blumen sind in den letzten 30 Jahren durch meine Floristenhände geflossen. Und es sind immer noch nicht genug. Nach tollen und lehrreichen zwei Jahrzehnten in einem renommierten Blumengeschäft im Zürcher Seefeld, betreibe ich seit August 2024 mit _avec plaisir_ meinen eigenen Blumenladen. Ein Herzensprojekt geht in Erfüllung und ich freue mich, das Quartier und meine Kundschaft mit Farben, Formen und Düften zu bereichern.',
  },
]

export const content = {
  hero: {
    greeting: 'Bonjour im neuen Blumenladen im Kreis 3',
    title: 'avec plaisir zürich',
    subtitle: 'avec plaisir!',
    intro: 'Bei uns finden Sie saisonale und lokale Blumen und Topfpflanzen. Ausserdem pflegen wir ein ausgewähltes Sortiment an Pflanzgefässen, Accessories und Vintageprodukten. Ihr Besuch ist unsere Freude!',
    ownerQuote: 'Ein ganzes Meer an Blumen sind in den letzten 30 Jahren durch meine Floristenhände geflossen.',
    ownerName: '- Monika Fähndrich',
  },
  contact: {
    title: 'Brauchen Sie blumige Beratung? Wir freuen uns auf Ihre Kontaktaufnahme!',
    newsletter: 'Interessiert an floralen News?',
  },
}