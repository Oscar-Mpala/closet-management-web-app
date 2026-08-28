export type Category = 'Tops' | 'Bottoms' | 'Outerwear' | 'Footwear' | 'Accessories';
export type Status = 'clean' | 'dirty';



export interface ClothingItem {
  id: string;
  name: string;
  category: Category;
  status: Status;
  wearCount: number;
  images: string[];
  colorHex: string;
  description: string;
  size?: string;
  season?: string[];
  fitProfile?: string;
  stance?: string;
}

export interface Outfit {
  id: string;
  name: string;
  rating: number; // 0-5
  outfitImageUrl: string;
  itemIds: string[];
  topId?: string;
  bottomId?: string;
  footwearId?: string;
  outerwearId?: string;
}

export interface CalendarEvent {
  id: string;
  date: string; // Format: YYYY-MM-DD
  outfitId: string;
}
