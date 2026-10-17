/**
 * Theta Theta Telugu — Gallery Data Types & Items
 * Canonical single source of truth for the 6 restaurant photographs.
 * 
 * Replaceable image locations:
 *   - 'assets/theta-theta-telugu/gallery/{1..6}.png' (primary directory)
 *   - or 'assets/{1..6}.png' (root assets directory)
 */

export interface GalleryItem {
  id: string;
  image: string;
  fallbackImage?: string;
  category: string;
  title: string;
  alt: string;
}

export const GALLERY_IMAGE_BASE = 'assets/theta-theta-telugu/gallery';

export const galleryItems: GalleryItem[] = [
  {
    id: 'gallery-1',
    image: `${GALLERY_IMAGE_BASE}/1.png`,
    fallbackImage: 'assets/1.png',
    category: 'Entrance & Exterior',
    title: 'Grand Entrance & Signboard',
    alt: 'Theta Theta Telugu restaurant entrance facade with official illuminated signboard'
  },
  {
    id: 'gallery-2',
    image: `${GALLERY_IMAGE_BASE}/2.png`,
    fallbackImage: 'assets/2.png',
    category: 'Interior Architecture',
    title: 'Main Dining Hall & Ambient Murals',
    alt: 'Warm terracotta textured walls with glowing flowing murals and teak dining tables'
  },
  {
    id: 'gallery-3',
    image: `${GALLERY_IMAGE_BASE}/3.png`,
    fallbackImage: 'assets/3.png',
    category: 'Dining Experience',
    title: 'Lively Evening Gastronomy',
    alt: 'Guests enjoying dinner in the hospitable ambient dining room with traditional artwork'
  },
  {
    id: 'gallery-4',
    image: `${GALLERY_IMAGE_BASE}/4.png`,
    fallbackImage: 'assets/4.png',
    category: 'Night Ambiance',
    title: 'Twilight at Coffee Sangam',
    alt: 'Evening twilight view with stone entryway and glowing neon Coffee Sangam sign'
  },
  {
    id: 'gallery-5',
    image: `${GALLERY_IMAGE_BASE}/5.png`,
    fallbackImage: 'assets/5.png',
    category: 'Architectural Elegance',
    title: 'Illuminated Stone Pathway',
    alt: 'Dramatic night view of the illuminated steps and lush canopy leading to the restaurant'
  },
  {
    id: 'gallery-6',
    image: `${GALLERY_IMAGE_BASE}/6.png`,
    fallbackImage: 'assets/6.png',
    category: 'Artisanal Seating',
    title: 'Teak & Cane Dining Chamber',
    alt: 'Coffered ceiling hall with rattan cane chairs, teak tables and garden view windows'
  }
];
