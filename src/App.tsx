/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from './db';
import { useDatabaseInit } from './useDatabaseInit';

import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { Dashboard } from './components/Dashboard';
import { Wardrobe } from './components/Wardrobe';
import { Canvas } from './components/Canvas';
import { Laundry } from './components/Laundry';
import { Calendar } from './components/Calendar';

import { ClothingItem, Outfit, CalendarEvent } from './types';

export default function App() {
  const isDbReady = useDatabaseInit();
  const [currentView, setCurrentView] = useState('home');

  const items = useLiveQuery(() => db.items.toArray()) || [];
  const outfits = useLiveQuery(() => db.outfits.toArray()) || [];
  const events = useLiveQuery(() => db.events.toArray()) || [];

  const setItems = (action: React.SetStateAction<ClothingItem[]>) => {
    const updated = typeof action === 'function' ? (action as (prevState: ClothingItem[]) => ClothingItem[])(items) : action;
    db.transaction('rw', db.items, async () => {
      await db.items.clear();
      await db.items.bulkAdd(updated);
    });
  };

  const setOutfits = (action: React.SetStateAction<Outfit[]>) => {
    const updated = typeof action === 'function' ? (action as (prevState: Outfit[]) => Outfit[])(outfits) : action;
    db.transaction('rw', db.outfits, async () => {
      await db.outfits.clear();
      await db.outfits.bulkAdd(updated);
    });
  };

  const setEvents = (action: React.SetStateAction<CalendarEvent[]>) => {
    const updated = typeof action === 'function' ? (action as (prevState: CalendarEvent[]) => CalendarEvent[])(events) : action;
    db.transaction('rw', db.events, async () => {
      await db.events.clear();
      await db.events.bulkAdd(updated);
    });
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const todaysEvent = events.find(e => e.date === todayStr);
  
  const suggestedOutfit = useMemo(() => {
    if (outfits.length === 0) return null;
    
    const cleanItemIds = new Set(items.filter(i => i.status === 'clean').map(i => i.id));
    const cleanOutfits = outfits.filter(outfit => 
      outfit.itemIds.every(id => cleanItemIds.has(id))
    );
    
    const pool = cleanOutfits.length > 0 ? cleanOutfits : outfits;
    return pool[Math.floor(Math.random() * pool.length)];
  }, [items.length, outfits.length]); 

  const dynamicOutfitOfDay = todaysEvent 
    ? outfits.find(o => o.id === todaysEvent.outfitId) || null
    : suggestedOutfit;

  const handleLogToday = (outfitId: string) => {
    const newEvent: CalendarEvent = {
      id: `event_${Date.now()}`,
      date: todayStr,
      outfitId,
    };
    
    setEvents((prev: CalendarEvent[]) => {
      const existingIndex = prev.findIndex(e => e.date === todayStr);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = newEvent;
        return updated;
      }
      return [...prev, newEvent];
    });
  };

  // NEW: Function to safely clear today's logged outfit
  const handleRemoveLogToday = () => {
    setEvents((prev: CalendarEvent[]) => prev.filter(e => e.date !== todayStr));
  };

  if (!isDbReady) {
    return (
      <div className="min-h-screen bg-[#EEE9DF] flex items-center justify-center text-[#1B2632]">
        <p className="font-semibold animate-pulse tracking-widest uppercase text-sm">Loading Wardrobe...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EEE9DF] text-[#1B2632] font-sans selection:bg-[#A35139] selection:text-[#EEE9DF]">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="md:ml-20 transition-all duration-300 p-6 md:p-10 pb-24 md:pb-10 min-h-screen">
        {currentView === 'home' && (
          <Dashboard 
            items={items} 
            outfitOfDay={dynamicOutfitOfDay} 
            isOutfitLogged={!!todaysEvent}
            onLogOutfit={handleLogToday}
            onRemoveOutfit={handleRemoveLogToday}
          />
        )}
        {currentView === 'wardrobe' && <Wardrobe items={items} setItems={setItems} />}
        {currentView === 'builder' && <Canvas items={items} outfits={outfits} setOutfits={setOutfits} />}
        {currentView === 'calendar' && <Calendar outfits={outfits} events={events} setEvents={setEvents} />}
        {currentView === 'laundry' && <Laundry items={items} setItems={setItems} />}
      </main>
      <MobileNav currentView={currentView} onViewChange={setCurrentView} />
    </div>
  );
}