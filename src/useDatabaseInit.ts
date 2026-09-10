import { useEffect, useState } from 'react';
import { db } from './db';
import { mockItems, mockOutfits, mockEvents } from './data';

// Helper function to fetch a web/local image and convert it to a Base64 string
const convertUrlToBase64 = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error(`Failed to convert ${url} to Base64`, error);
    return url; // Fallback to original URL if the fetch fails
  }
};

export function useDatabaseInit() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initDb = async () => {
      try {
        const itemCount = await db.items.count();
        
        if (itemCount === 0) {
          console.log('Database empty. Converting mock images to Base64 and seeding...');
          
          // 1. Process all Clothing Items
          const itemsWithBase64 = await Promise.all(
            mockItems.map(async (item) => {
              if (item.images && item.images.length > 0) {
                const base64Image = await convertUrlToBase64(item.images[0]);
                return { ...item, images: [base64Image] };
              }
              return item;
            })
          );
          
          // 2. Process all Outfits
          const outfitsWithBase64 = await Promise.all(
            mockOutfits.map(async (outfit) => {
              if (outfit.outfitImageUrl) {
                const base64Image = await convertUrlToBase64(outfit.outfitImageUrl);
                return { ...outfit, outfitImageUrl: base64Image };
              }
              return outfit;
            })
          );

          // 3. Bulk add the fully converted Base64 data into Dexie
          await db.items.bulkAdd(itemsWithBase64);
          await db.outfits.bulkAdd(outfitsWithBase64);
          
          // Only add events if you actually exported mockEvents from data.ts
          if (mockEvents && mockEvents.length > 0) {
            await db.events.bulkAdd(mockEvents);
          }
          
          console.log('Offline database successfully seeded with Base64 images!');
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