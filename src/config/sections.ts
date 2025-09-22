export interface SectionConfig {
  id: string
  title: string
  displayName: string
}

export const sectionsConfig: SectionConfig[] = [
  {
    id: 'hero',
    title: 'Start',
    displayName: 'Hero Section',
  },
  {
    id: 'kontakt',
    title: 'Kontakt',
    displayName: 'Contact Section',
  },
  {
    id: 'gallery',
    title: 'Galerie',
    displayName: 'Gallery Section',
  },
  {
    id: 'angebot',
    title: 'Angebot',
    displayName: 'Services Section',
  },
  {
    id: 'team',
    title: 'Team',
    displayName: 'Team Section',
  },
]

// Helper function to get section by id
export const getSectionById = (id: string) =>
  sectionsConfig.find((section) => section.id === id)

// Helper function to get section index
export const getSectionIndex = (id: string) =>
  sectionsConfig.findIndex((section) => section.id === id)
