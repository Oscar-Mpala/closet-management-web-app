import Dexie, { Table } from 'dexie';
import { ClothingItem, Outfit, CalendarEvent } from './types';

export class ClosetDatabase extends Dexie {
  items!: Table<ClothingItem, string>;
  outfits!: Table<Outfit, string>;
  events!: Table<CalendarEvent, string>;

  constructor() {
    super('ClosetDB');
    
    // The first string is the primary key, the rest are indexed for fast searching
    this.version(1).stores({
      items: 'id, category, status, wearCount',
      outfits: 'id, rating, topId, bottomId, footwearId',
      events: 'id, date, outfitId' 
    });
  }
}

export const db = new ClosetDatabase();