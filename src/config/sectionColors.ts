export interface SectionColorConfig {
  background: string
  textColor?: string
  headingColor?: string
  secondaryTextColor?: string
}

/**
 * Section Color Configuration
 *
 * You can customize colors for each section:
 * - background: The background color for the section
 * - textColor: Override automatic text color (optional)
 * - headingColor: Override automatic heading color (optional)
 * - secondaryTextColor: Override automatic secondary text color (optional)
 *
 * If text colors are not specified, they will be automatically calculated
 * based on the background color for optimal contrast.
 */
export const sectionColorConfigs: Record<string, SectionColorConfig> = {
  hero: {
    background: '#f1938d',
    // textColor: '#ffffff',        // Uncomment to override auto-calculation
    // headingColor: '#ffffff',     // Uncomment to override auto-calculation
    // secondaryTextColor: 'rgba(255, 255, 255, 0.8)', // Uncomment to override auto-calculation
  },
  angebot: {
    background: '#5e747a',
    // textColor: '#ffffff',
    // headingColor: '#ffffff',
    // secondaryTextColor: 'rgba(255, 255, 255, 0.8)',
  },
  team: {
    background: '#ffffff',
    // textColor: '#333333',
    // headingColor: '#333333',
    // secondaryTextColor: 'rgba(0, 0, 0, 0.7)',
  },
  gallery: {
    background: '#9ba7aa',
    // textColor: '#ffffff',
    // headingColor: '#ffffff',
    // secondaryTextColor: 'rgba(255, 255, 255, 0.8)',
  },
  kontakt: {
    background: '#ffc5bf',
    // textColor: '#333333',
    // headingColor: '#333333',
    // secondaryTextColor: 'rgba(0, 0, 0, 0.7)',
  },
}