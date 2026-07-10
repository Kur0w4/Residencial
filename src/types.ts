export interface Hotspot {
  id: string;
  name: string;
  x: number; // percentage coordinate (0-100)
  y: number; // percentage coordinate (0-100)
  imageSrc: string;
  description: string;
}

export type ApartmentStatus = 'disponible' | 'reservado' | 'vendido';
export type FloorPlanType = 'garden' | 'loft' | 'family' | 'penthouse';

export interface Apartment {
  id: string;
  name: string;
  model: string;
  price: number;
  area: number; // in m²
  bedrooms: number;
  bathrooms: number;
  parking: number;
  floor: number;
  status: ApartmentStatus;
  mapCoords: { x: number; y: number }; // percentage coordinate on the residential map
  polygonPoints?: string; // SVG coordinates for hover highlights on the residential map
  highlights: string[];
  hotspots: Hotspot[];
  floorPlanType: FloorPlanType;
  description: string;
}

