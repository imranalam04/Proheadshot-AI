
export enum HeadshotStyle {
  CORPORATE = 'Corporate',
  STARTUP = 'Modern Startup',
  CREATIVE = 'Creative Studio',
  OUTDOOR = 'Natural Outdoor',
  BW = 'Black & White'
}

export enum OutfitType {
  SUIT = 'Business Suit',
  TUXEDO = 'Tuxedo',
  BUSINESS_CASUAL = 'Business Casual',
  CASUAL = 'Smart Casual',
  DOCTOR = 'Medical Coat',
}

export interface RetouchingConfig {
  smoothSkin: boolean;
  whitenTeeth: boolean;
  brightenEyes: boolean;
}

export interface GenerationConfig {
  style: HeadshotStyle;
  outfit: OutfitType;
  highQuality: boolean;
  brandColor: string;
  retouching: RetouchingConfig;
}

export interface GeneratedImage {
  id: string;
  originalUrl: string;
  generatedUrl: string;
  createdAt: number;
  style: HeadshotStyle;
}
