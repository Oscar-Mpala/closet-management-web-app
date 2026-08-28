import { useEffect, useState } from 'react';
import { db } from './db';
import { mockItems, mockOutfits, mockEvents } from './data';

export function useDatabaseInit() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initDb = async () => {
      try {
        const itemCount = await db.items.count();
        if (itemCount === 0) {
          console.log('Database empty. Seeding your initial data...');
          await db.items.bulkAdd(mockItems);
          await db.outfits.bulkAdd(mockOutfits);
          
          // Only add events if you actually exported mockEvents from data.ts
          if (mockEvents && mockEvents.length > 0) {
            await db.events.bulkAdd(mockEvents);
          }
        }
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize database:', error);
        setIsInitialized(true); 
      }
    };

    initDb();
  }, []);

  return isInitialized;
}