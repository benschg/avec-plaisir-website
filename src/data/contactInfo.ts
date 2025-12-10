import type { ContactInfo } from '../types'

export const contactInfo: ContactInfo = {
  address: 'Aemtlerstrasse 205\n8003 Zürich',
  phone: '+41 44 492 21 18',
  email: 'salut@avecplaisir-zuerich.ch',
  instagram: '@avecplaisirzuerich',
  hours: {
    weekdays: 'Montag bis Freitag 9 – 18 Uhr',
    saturday: 'Samstag 9 – 15 Uhr',
    sunday: 'Sonntag geschlossen',
  },
  holidayClosure: {
    dates: '26. Dezember 25 – 3. Januar 26 geschlossen',
    reopening: 'Wieder offen ab 5. Januar',
  },
}
