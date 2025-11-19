export interface TextStyle {
  id: string;
  name: string;
  fontFamily: string;
  fontSize: number;
  fill: string;
  stroke?: string;
  strokeWidth?: number;
  fontWeight?: string | number;
  fontStyle?: string;
  textTransform?: string;
  shadow?: string;
  category: 'handwritten' | 'bold' | 'elegant' | 'playful' | 'minimal' | 'vintage';
}

export const textStyles: TextStyle[] = [
  // Handwritten & Casual
  {
    id: 'indie-flower',
    name: 'Indie Flower',
    fontFamily: 'Indie Flower',
    fontSize: 48,
    fill: '#ffffff',
    stroke: '#000000',
    strokeWidth: 1,
    category: 'handwritten',
  },
  {
    id: 'permanent-marker',
    name: 'Permanent Marker',
    fontFamily: 'Permanent Marker',
    fontSize: 52,
    fill: '#ffffff',
    shadow: '2px 2px 4px rgba(0,0,0,0.4)',
    category: 'handwritten',
  },
  {
    id: 'caveat',
    name: 'Caveat',
    fontFamily: 'Caveat',
    fontSize: 56,
    fill: '#ffffff',
    fontWeight: 600,
    category: 'handwritten',
  },
  {
    id: 'dancing-script',
    name: 'Dancing Script',
    fontFamily: 'Dancing Script',
    fontSize: 50,
    fill: '#ffffff',
    fontWeight: 500,
    category: 'handwritten',
  },
  {
    id: 'shadows-into-light',
    name: 'Shadows Into Light',
    fontFamily: 'Shadows Into Light',
    fontSize: 48,
    fill: '#ffffff',
    stroke: '#333333',
    strokeWidth: 0.5,
    category: 'handwritten',
  },

  // Bold & Impact
  {
    id: 'bebas-neue',
    name: 'Bebas Neue',
    fontFamily: 'Bebas Neue',
    fontSize: 64,
    fill: '#ffffff',
    stroke: '#000000',
    strokeWidth: 2,
    shadow: '3px 3px 6px rgba(0,0,0,0.5)',
    category: 'bold',
  },
  {
    id: 'anton',
    name: 'Anton',
    fontFamily: 'Anton',
    fontSize: 60,
    fill: '#ff6b6b',
    stroke: '#ffffff',
    strokeWidth: 3,
    category: 'bold',
  },
  {
    id: 'black-ops-one',
    name: 'Black Ops One',
    fontFamily: 'Black Ops One',
    fontSize: 48,
    fill: '#ffd93d',
    stroke: '#000000',
    strokeWidth: 2,
    category: 'bold',
  },
  {
    id: 'archivo-black',
    name: 'Archivo Black',
    fontFamily: 'Archivo Black',
    fontSize: 54,
    fill: '#4d9eff',
    stroke: '#000000',
    strokeWidth: 1.5,
    category: 'bold',
  },

  // Elegant & Serif
  {
    id: 'playfair-display',
    name: 'Playfair Display',
    fontFamily: 'Playfair Display',
    fontSize: 52,
    fill: '#ffffff',
    fontWeight: 700,
    fontStyle: 'italic',
    category: 'elegant',
  },
  {
    id: 'cormorant-garamond',
    name: 'Cormorant Garamond',
    fontFamily: 'Cormorant Garamond',
    fontSize: 56,
    fill: '#f8f8f8',
    fontWeight: 600,
    category: 'elegant',
  },
  {
    id: 'cinzel',
    name: 'Cinzel',
    fontFamily: 'Cinzel',
    fontSize: 44,
    fill: '#ffffff',
    fontWeight: 700,
    category: 'elegant',
  },
  {
    id: 'libre-baskerville',
    name: 'Libre Baskerville',
    fontFamily: 'Libre Baskerville',
    fontSize: 46,
    fill: '#ffffff',
    fontWeight: 700,
    fontStyle: 'italic',
    category: 'elegant',
  },

  // Playful & Fun
  {
    id: 'fredoka-one',
    name: 'Fredoka One',
    fontFamily: 'Fredoka One',
    fontSize: 54,
    fill: '#ff6b9d',
    shadow: '3px 3px 0px #ffffff',
    category: 'playful',
  },
  {
    id: 'pacifico',
    name: 'Pacifico',
    fontFamily: 'Pacifico',
    fontSize: 50,
    fill: '#ffd93d',
    stroke: '#ff6b6b',
    strokeWidth: 1,
    category: 'playful',
  },
  {
    id: 'righteous',
    name: 'Righteous',
    fontFamily: 'Righteous',
    fontSize: 52,
    fill: '#4d9eff',
    shadow: '2px 2px 8px rgba(0,0,0,0.3)',
    category: 'playful',
  },
  {
    id: 'lobster',
    name: 'Lobster',
    fontFamily: 'Lobster',
    fontSize: 56,
    fill: '#ff6b6b',
    shadow: '2px 2px 6px rgba(0,0,0,0.4)',
    category: 'playful',
  },

  // Minimal & Modern
  {
    id: 'montserrat',
    name: 'Montserrat',
    fontFamily: 'Montserrat',
    fontSize: 48,
    fill: '#ffffff',
    fontWeight: 800,
    category: 'minimal',
  },
  {
    id: 'poppins',
    name: 'Poppins',
    fontFamily: 'Poppins',
    fontSize: 50,
    fill: '#ffffff',
    fontWeight: 700,
    category: 'minimal',
  },
  {
    id: 'raleway',
    name: 'Raleway',
    fontFamily: 'Raleway',
    fontSize: 48,
    fill: '#ffffff',
    fontWeight: 900,
    category: 'minimal',
  },
  {
    id: 'work-sans',
    name: 'Work Sans',
    fontFamily: 'Work Sans',
    fontSize: 52,
    fill: '#ffffff',
    fontWeight: 800,
    category: 'minimal',
  },

  // Vintage & Retro
  {
    id: 'special-elite',
    name: 'Special Elite',
    fontFamily: 'Special Elite',
    fontSize: 44,
    fill: '#f8f8f8',
    category: 'vintage',
  },
  {
    id: 'creepster',
    name: 'Creepster',
    fontFamily: 'Creepster',
    fontSize: 52,
    fill: '#ff6b6b',
    stroke: '#000000',
    strokeWidth: 1,
    category: 'vintage',
  },
  {
    id: 'concert-one',
    name: 'Concert One',
    fontFamily: 'Concert One',
    fontSize: 54,
    fill: '#ffd93d',
    stroke: '#000000',
    strokeWidth: 2,
    category: 'vintage',
  },
  {
    id: 'alfa-slab-one',
    name: 'Alfa Slab One',
    fontFamily: 'Alfa Slab One',
    fontSize: 50,
    fill: '#4d9eff',
    stroke: '#ffffff',
    strokeWidth: 2,
    shadow: '4px 4px 0px #000000',
    category: 'vintage',
  },
];

export const textStyleCategories = [
  { id: 'handwritten', name: 'Handwritten', icon: '✍️' },
  { id: 'bold', name: 'Bold', icon: '💪' },
  { id: 'elegant', name: 'Elegant', icon: '✨' },
  { id: 'playful', name: 'Playful', icon: '🎨' },
  { id: 'minimal', name: 'Minimal', icon: '⚪' },
  { id: 'vintage', name: 'Vintage', icon: '📻' },
];
