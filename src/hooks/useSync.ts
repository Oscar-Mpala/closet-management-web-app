import { useState } from 'react';
import { collection, getDocs, writeBatch, doc } from 'firebase/firestore';
import { dbCloud } from '../firebase'; // Adjust path to your firebase.ts
import { db } from '../db'; // Adjust path to your Dexie setup

export function useSync() {
  const [isSyncing, setIsSyncing] = useState(false);

  const syncDatabase = async () => {
    // Abort immediately if the device has no network connection
    if (!navigator.onLine) return;

    setIsSyncing(true);
    try {
      await syncTable('items', 'clothingItems');
      await syncTable('outfits', 'outfits');
      await syncTable('events', 'events');
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  const syncTable = async (
    dexieTable: 'items' | 'outfits' | 'events', 
    firestoreCollection: string
  ) => {
    // 1. Fetch Local Dexie Data
    const localRecords = await db[dexieTable].toArray();
    const localMap = new Map(localRecords.map(r => [r.id, r]));

    // 2. Fetch Cloud Firestore Data
    const cloudSnapshot = await getDocs(collection(dbCloud, firestoreCollection));
    const cloudRecords = cloudSnapshot.docs.map(d => d.data() as any);
    const cloudMap = new Map(cloudRecords.map(r => [r.id, r]));

    // 3. Initialize Firebase Batch Write
    const batch = writeBatch(dbCloud);
    let hasCloudWrites = false;
    const localPuts = [];

    // 4. Compare Local -> Cloud
    for (const local of localRecords) {
      const cloud = cloudMap.get(local.id);
      if (!cloud || local.lastUpdated > cloud.lastUpdated) {
        const docRef = doc(dbCloud, firestoreCollection, local.id);
        batch.set(docRef, local);
        hasCloudWrites = true;
      }
    }

    // 5. Compare Cloud -> Local
    for (const cloud of cloudRecords) {
      const local = localMap.get(cloud.id);
      if (!local || cloud.lastUpdated > local.lastUpdated) {
        localPuts.push(cloud);
      }
    }

    // 6. Execute Atomic Writes
    if (hasCloudWrites) await batch.commit();
    if (localPuts.length > 0) await (db[dexieTable] as any).bulkPut(localPuts);
  };

  return { syncDatabase, isSyncing };
}