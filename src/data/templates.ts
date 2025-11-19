export interface TemplateElement {
  type: 'photo' | 'text' | 'sticker' | 'tape';
  x: number; // percentage
  y: number; // percentage
  width: number; // percentage
  height: number; // percentage
  rotation: number; // degrees
  zIndex: number;
  content?: string;
  style?: {
    border?: string;
    shadow?: string;
    opacity?: number;
  };
}

export interface Template {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
  elements: TemplateElement[];
}

export const scrapbookTemplates: Template[] = [
  {
    id: 'polaroid-collage',
    name: 'Polaroid Collage',
    thumbnail: '/templates/polaroid-collage.jpg',
    description: 'Classic polaroid-style photo arrangement with tape and hearts',
    elements: [
      // Large polaroid - top right
      {
        type: 'photo',
        x: 45,
        y: 10,
        width: 40,
        height: 45,
        rotation: 3,
        zIndex: 3,
        style: {
          border: '12px solid white',
          shadow: '0 8px 24px rgba(0,0,0,0.15)',
        },
      },
      // Tape on large polaroid
      {
        type: 'tape',
        x: 52,
        y: 8,
        width: 25,
        height: 4,
        rotation: 2,
        zIndex: 4,
      },
      // Medium polaroid - bottom left
      {
        type: 'photo',
        x: 8,
        y: 30,
        width: 32,
        height: 38,
        rotation: -5,
        zIndex: 2,
        style: {
          border: '12px solid white',
          shadow: '0 6px 20px rgba(0,0,0,0.12)',
        },
      },
      // Small polaroid - bottom right
      {
        type: 'photo',
        x: 50,
        y: 58,
        width: 28,
        height: 32,
        rotation: 8,
        zIndex: 1,
        style: {
          border: '12px solid white',
          shadow: '0 4px 16px rgba(0,0,0,0.1)',
        },
      },
      // Heart stickers
      {
        type: 'sticker',
        x: 12,
        y: 15,
        width: 6,
        height: 6,
        rotation: -15,
        zIndex: 5,
        content: '❤️',
      },
      {
        type: 'sticker',
        x: 18,
        y: 22,
        width: 4,
        height: 4,
        rotation: 10,
        zIndex: 5,
        content: '💛',
      },
    ],
  },
  {
    id: 'beach-grid',
    name: 'Beach Vibes Grid',
    thumbnail: '/templates/beach-grid.jpg',
    description: 'Clean grid layout with tape accents, perfect for summer memories',
    elements: [
      // Top left photo
      {
        type: 'photo',
        x: 5,
        y: 5,
        width: 44,
        height: 30,
        rotation: 0,
        zIndex: 1,
        style: {
          border: '8px solid white',
          shadow: '0 4px 12px rgba(0,0,0,0.08)',
        },
      },
      // Top right photo
      {
        type: 'photo',
        x: 51,
        y: 5,
        width: 44,
        height: 30,
        rotation: 0,
        zIndex: 1,
        style: {
          border: '8px solid white',
          shadow: '0 4px 12px rgba(0,0,0,0.08)',
        },
      },
      // Middle left photo
      {
        type: 'photo',
        x: 5,
        y: 37,
        width: 44,
        height: 28,
        rotation: 0,
        zIndex: 1,
        style: {
          border: '8px solid white',
          shadow: '0 4px 12px rgba(0,0,0,0.08)',
        },
      },
      // Middle right photo
      {
        type: 'photo',
        x: 51,
        y: 37,
        width: 44,
        height: 28,
        rotation: 0,
        zIndex: 1,
        style: {
          border: '8px solid white',
          shadow: '0 4px 12px rgba(0,0,0,0.08)',
        },
      },
      // Bottom photo
      {
        type: 'photo',
        x: 5,
        y: 67,
        width: 90,
        height: 28,
        rotation: 0,
        zIndex: 1,
        style: {
          border: '8px solid white',
          shadow: '0 4px 12px rgba(0,0,0,0.08)',
        },
      },
      // Tape accent - top right
      {
        type: 'tape',
        x: 65,
        y: 35,
        width: 15,
        height: 3,
        rotation: 45,
        zIndex: 2,
      },
    ],
  },
  {
    id: 'travel-diary',
    name: 'Travel Diary',
    thumbnail: '/templates/travel-diary.jpg',
    description: 'Scrapbook layout with photos and handwritten text overlay',
    elements: [
      // Top small photo
      {
        type: 'photo',
        x: 8,
        y: 8,
        width: 28,
        height: 32,
        rotation: -3,
        zIndex: 2,
        style: {
          border: '10px solid white',
          shadow: '0 6px 18px rgba(0,0,0,0.12)',
        },
      },
      // Middle photo
      {
        type: 'photo',
        x: 8,
        y: 42,
        width: 30,
        height: 26,
        rotation: 2,
        zIndex: 2,
        style: {
          border: '10px solid white',
          shadow: '0 6px 18px rgba(0,0,0,0.12)',
        },
      },
      // Bottom photo
      {
        type: 'photo',
        x: 8,
        y: 70,
        width: 26,
        height: 24,
        rotation: -4,
        zIndex: 2,
        style: {
          border: '10px solid white',
          shadow: '0 6px 18px rgba(0,0,0,0.12)',
        },
      },
      // Text overlay - handwritten style
      {
        type: 'text',
        x: 48,
        y: 45,
        width: 40,
        height: 15,
        rotation: -2,
        zIndex: 3,
        content: 'My trip\nto Spain',
        style: {
          opacity: 0.95,
        },
      },
    ],
  },
  {
    id: 'film-strip',
    name: 'Film Strip',
    thumbnail: '/templates/film-strip.jpg',
    description: 'Vintage film-style layout with gradient overlay and date stamp',
    elements: [
      // Main large photo with gradient overlay
      {
        type: 'photo',
        x: 15,
        y: 25,
        width: 35,
        height: 50,
        rotation: -2,
        zIndex: 2,
        style: {
          border: '6px solid white',
          shadow: '0 8px 24px rgba(0,0,0,0.2)',
        },
      },
      // Tape on top
      {
        type: 'tape',
        x: 22,
        y: 23,
        width: 20,
        height: 4,
        rotation: -1,
        zIndex: 3,
      },
      // Tape on bottom
      {
        type: 'tape',
        x: 18,
        y: 73,
        width: 18,
        height: 4,
        rotation: 3,
        zIndex: 3,
      },
      // Date stamp text
      {
        type: 'text',
        x: 20,
        y: 82,
        width: 30,
        height: 8,
        rotation: 0,
        zIndex: 4,
        content: 'NOVEMBER 25, 2027\nWEEKEND VIBES',
      },
    ],
  },
  {
    id: 'minimalist-double',
    name: 'Minimalist Double',
    thumbnail: '/templates/minimalist-double.jpg',
    description: 'Clean and modern two-photo layout with geometric frames',
    elements: [
      // Top photo - larger
      {
        type: 'photo',
        x: 10,
        y: 8,
        width: 80,
        height: 38,
        rotation: 0,
        zIndex: 1,
        style: {
          border: '0',
          shadow: '0 2px 8px rgba(0,0,0,0.06)',
        },
      },
      // Bottom photo - larger
      {
        type: 'photo',
        x: 10,
        y: 50,
        width: 80,
        height: 42,
        rotation: 0,
        zIndex: 1,
        style: {
          border: '0',
          shadow: '0 2px 8px rgba(0,0,0,0.06)',
        },
      },
      // Geometric accent lines
      {
        type: 'sticker',
        x: 5,
        y: 48,
        width: 2,
        height: 45,
        rotation: 0,
        zIndex: 2,
        content: '▮',
      },
    ],
  },
  {
    id: 'scattered-memories',
    name: 'Scattered Memories',
    thumbnail: '/templates/scattered-memories.jpg',
    description: 'Playful scattered polaroids with various rotations',
    elements: [
      // Top left
      {
        type: 'photo',
        x: 5,
        y: 5,
        width: 28,
        height: 32,
        rotation: -8,
        zIndex: 1,
        style: {
          border: '12px solid white',
          shadow: '0 6px 20px rgba(0,0,0,0.12)',
        },
      },
      // Top right
      {
        type: 'photo',
        x: 38,
        y: 8,
        width: 32,
        height: 36,
        rotation: 4,
        zIndex: 2,
        style: {
          border: '12px solid white',
          shadow: '0 8px 24px rgba(0,0,0,0.15)',
        },
      },
      // Bottom left
      {
        type: 'photo',
        x: 12,
        y: 45,
        width: 26,
        height: 30,
        rotation: -12,
        zIndex: 3,
        style: {
          border: '12px solid white',
          shadow: '0 6px 20px rgba(0,0,0,0.12)',
        },
      },
      // Bottom center
      {
        type: 'photo',
        x: 42,
        y: 50,
        width: 30,
        height: 34,
        rotation: 6,
        zIndex: 1,
        style: {
          border: '12px solid white',
          shadow: '0 4px 16px rgba(0,0,0,0.1)',
        },
      },
      // Small accent
      {
        type: 'photo',
        x: 72,
        y: 25,
        width: 20,
        height: 24,
        rotation: -5,
        zIndex: 2,
        style: {
          border: '10px solid white',
          shadow: '0 4px 12px rgba(0,0,0,0.08)',
        },
      },
    ],
  },
  {
    id: 'birthday-celebration',
    name: 'Birthday Celebration',
    description: 'Perfect for birthday memories with cake and celebration photos',
    thumbnail: '/templates/birthday.jpg',
    elements: [
      {
        type: 'photo',
        x: 8,
        y: 5,
        width: 38,
        height: 42,
        rotation: -3,
        zIndex: 2,
        style: {
          border: '12px solid white',
          shadow: '0 6px 18px rgba(0,0,0,0.15)',
        },
      },
      {
        type: 'photo',
        x: 52,
        y: 3,
        width: 40,
        height: 45,
        rotation: 2,
        zIndex: 3,
        style: {
          border: '12px solid white',
          shadow: '0 8px 24px rgba(0,0,0,0.2)',
        },
      },
      {
        type: 'photo',
        x: 10,
        y: 52,
        width: 35,
        height: 40,
        rotation: -5,
        zIndex: 1,
        style: {
          border: '12px solid white',
          shadow: '0 4px 12px rgba(0,0,0,0.12)',
        },
      },
      {
        type: 'photo',
        x: 50,
        y: 55,
        width: 38,
        height: 38,
        rotation: 6,
        zIndex: 2,
        style: {
          border: '12px solid white',
          shadow: '0 6px 18px rgba(0,0,0,0.15)',
        },
      },
      {
        type: 'text',
        x: 52,
        y: 48,
        width: 35,
        height: 8,
        rotation: -2,
        zIndex: 5,
        content: 'Happy Birthday!',
        style: {
          opacity: 1,
        },
      },
    ],
  },
  {
    id: 'adventure-grid',
    name: 'Adventure Grid',
    description: 'Perfect for travel and outdoor adventure memories',
    thumbnail: '/templates/adventure.jpg',
    elements: [
      {
        type: 'photo',
        x: 3,
        y: 3,
        width: 30,
        height: 38,
        rotation: -2,
        zIndex: 1,
        style: {
          border: '10px solid white',
          shadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
      },
      {
        type: 'photo',
        x: 35,
        y: 5,
        width: 28,
        height: 35,
        rotation: 3,
        zIndex: 2,
        style: {
          border: '10px solid white',
          shadow: '0 6px 18px rgba(0,0,0,0.18)',
        },
      },
      {
        type: 'photo',
        x: 66,
        y: 3,
        width: 30,
        height: 38,
        rotation: -1,
        zIndex: 3,
        style: {
          border: '10px solid white',
          shadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
      },
      {
        type: 'photo',
        x: 5,
        y: 45,
        width: 42,
        height: 48,
        rotation: 2,
        zIndex: 4,
        style: {
          border: '10px solid white',
          shadow: '0 8px 24px rgba(0,0,0,0.2)',
        },
      },
      {
        type: 'photo',
        x: 50,
        y: 48,
        width: 45,
        height: 45,
        rotation: -3,
        zIndex: 5,
        style: {
          border: '10px solid white',
          shadow: '0 6px 18px rgba(0,0,0,0.18)',
        },
      },
    ],
  },
  {
    id: 'party-night',
    name: 'Party Night',
    description: 'Dynamic layout for celebration and party selfies',
    thumbnail: '/templates/party.jpg',
    elements: [
      {
        type: 'photo',
        x: 8,
        y: 5,
        width: 35,
        height: 28,
        rotation: -4,
        zIndex: 1,
        style: {
          border: '12px solid white',
          shadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
      },
      {
        type: 'photo',
        x: 50,
        y: 3,
        width: 38,
        height: 30,
        rotation: 5,
        zIndex: 2,
        style: {
          border: '12px solid white',
          shadow: '0 6px 18px rgba(0,0,0,0.18)',
        },
      },
      {
        type: 'photo',
        x: 5,
        y: 38,
        width: 40,
        height: 28,
        rotation: 3,
        zIndex: 3,
        style: {
          border: '12px solid white',
          shadow: '0 6px 18px rgba(0,0,0,0.18)',
        },
      },
      {
        type: 'photo',
        x: 50,
        y: 38,
        width: 35,
        height: 28,
        rotation: -2,
        zIndex: 4,
        style: {
          border: '12px solid white',
          shadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
      },
      {
        type: 'photo',
        x: 25,
        y: 70,
        width: 48,
        height: 25,
        rotation: -1,
        zIndex: 5,
        style: {
          border: '12px solid white',
          shadow: '0 8px 24px rgba(0,0,0,0.2)',
        },
      },
      {
        type: 'text',
        x: 35,
        y: 67,
        width: 28,
        height: 5,
        rotation: -1,
        zIndex: 6,
        content: 'Happy Birthday!',
        style: {
          opacity: 1,
        },
      },
    ],
  },
  {
    id: 'single-spotlight',
    name: 'Single Spotlight',
    description: 'One large photo with decorative elements and message',
    thumbnail: '/templates/spotlight.jpg',
    elements: [
      {
        type: 'photo',
        x: 15,
        y: 12,
        width: 70,
        height: 60,
        rotation: 1,
        zIndex: 1,
        style: {
          border: '15px solid white',
          shadow: '0 8px 24px rgba(0,0,0,0.2)',
        },
      },
      {
        type: 'tape',
        x: 35,
        y: 8,
        width: 30,
        height: 5,
        rotation: 0,
        zIndex: 2,
      },
      {
        type: 'text',
        x: 22,
        y: 78,
        width: 56,
        height: 12,
        rotation: -1,
        zIndex: 3,
        content: 'Have a good one!',
        style: {
          opacity: 1,
        },
      },
    ],
  },
  {
    id: 'magazine-style',
    name: 'Magazine Style',
    description: 'Editorial layout with varied photo sizes and clean lines',
    thumbnail: '/templates/magazine.jpg',
    elements: [
      {
        type: 'photo',
        x: 3,
        y: 3,
        width: 55,
        height: 58,
        rotation: 0,
        zIndex: 1,
        style: {
          border: '0',
          shadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
      {
        type: 'photo',
        x: 60,
        y: 3,
        width: 37,
        height: 27,
        rotation: 0,
        zIndex: 2,
        style: {
          border: '0',
          shadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
      {
        type: 'photo',
        x: 60,
        y: 32,
        width: 37,
        height: 29,
        rotation: 0,
        zIndex: 3,
        style: {
          border: '0',
          shadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
      {
        type: 'photo',
        x: 3,
        y: 63,
        width: 94,
        height: 32,
        rotation: 0,
        zIndex: 4,
        style: {
          border: '0',
          shadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
      {
        type: 'text',
        x: 5,
        y: 58,
        width: 50,
        height: 6,
        rotation: 0,
        zIndex: 5,
        content: 'LIFE IS FULL OF MAGICAL MOMENTS.',
        style: {
          opacity: 1,
        },
      },
    ],
  },
  {
    id: 'collage-cutout',
    name: 'Collage Cutout',
    description: 'Playful ransom note style with colorful letter cutouts',
    thumbnail: '/templates/cutout.jpg',
    elements: [
      {
        type: 'photo',
        x: 20,
        y: 10,
        width: 60,
        height: 52,
        rotation: 1,
        zIndex: 1,
        style: {
          border: '12px solid white',
          shadow: '0 6px 18px rgba(0,0,0,0.15)',
        },
      },
      {
        type: 'tape',
        x: 35,
        y: 6,
        width: 30,
        height: 5,
        rotation: -1,
        zIndex: 2,
      },
      {
        type: 'text',
        x: 25,
        y: 68,
        width: 50,
        height: 12,
        rotation: 0,
        zIndex: 3,
        content: 'Happy Birthday',
        style: {
          opacity: 1,
        },
      },
    ],
  },
  {
    id: 'vintage-scrapbook',
    name: 'Vintage Scrapbook',
    description: 'Classic scrapbook with overlapping photos and dates',
    thumbnail: '/templates/vintage.jpg',
    elements: [
      {
        type: 'photo',
        x: 5,
        y: 8,
        width: 35,
        height: 40,
        rotation: -6,
        zIndex: 1,
        style: {
          border: '12px solid white',
          shadow: '0 4px 12px rgba(0,0,0,0.12)',
        },
      },
      {
        type: 'photo',
        x: 28,
        y: 35,
        width: 38,
        height: 42,
        rotation: 4,
        zIndex: 3,
        style: {
          border: '12px solid white',
          shadow: '0 8px 24px rgba(0,0,0,0.18)',
        },
      },
      {
        type: 'photo',
        x: 60,
        y: 12,
        width: 32,
        height: 36,
        rotation: -3,
        zIndex: 2,
        style: {
          border: '12px solid white',
          shadow: '0 6px 18px rgba(0,0,0,0.15)',
        },
      },
      {
        type: 'text',
        x: 8,
        y: 82,
        width: 40,
        height: 8,
        rotation: -1,
        zIndex: 4,
        content: '19.04.25',
        style: {
          opacity: 0.9,
        },
      },
    ],
  },
];
