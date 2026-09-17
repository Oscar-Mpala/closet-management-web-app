import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Trash2 } from 'lucide-react';
import { Outfit, CalendarEvent } from '../types';

interface CalendarProps {
  outfits: Outfit[];
  events: CalendarEvent[];
  setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
}

export function Calendar({ outfits, events, setEvents }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const handleDayClick = (dayString: string) => {
    setSelectedDate(dayString);
    setIsModalOpen(true);
  };

  const handleLogOutfit = (outfitId: string) => {
    if (!selectedDate) return;
    
    const existingEventIndex = events.findIndex(e => e.date === selectedDate);
    const newEvent: CalendarEvent = {
      // Reuse ID so Firebase updates the exact same document instead of making duplicates
      id: existingEventIndex >= 0 ? events[existingEventIndex].id : `event_${Date.now()}`,
      date: selectedDate,
      outfitId,
      lastUpdated: Date.now(), // Fixed: Timestamp added for syncing
    };

    if (existingEventIndex >= 0) {
      const updatedEvents = [...events];
      updatedEvents[existingEventIndex] = newEvent;
      setEvents(updatedEvents);
    } else {
      setEvents([...events, newEvent]);
    }
    setIsModalOpen(false);
  };

  // NEW: Function to clear a logged day entirely
  const handleClearDate = () => {
    if (!selectedDate) return;
    setEvents((prev) => prev.filter(e => e.date !== selectedDate));
    setIsModalOpen(false);
  };

  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => <div key={`blank-${i}`} className="p-4" />);
  
  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayEvent = events.find(e => e.date === dateString);
    const wornOutfit = dayEvent ? outfits.find(o => o.id === dayEvent.outfitId) : null;
    
    const isToday = dateString === new Date().toISOString().split('T')[0];

    return (
      <div 
        key={day} 
        onClick={() => handleDayClick(dateString)}
        className={`relative aspect-square p-2 border border-[#1B2632]/5 rounded-2xl cursor-pointer hover:bg-[#1B2632]/5 transition-colors flex flex-col items-center justify-center group ${isToday ? 'bg-[#C9C1B1]/30' : 'bg-[#C9C1B1]/10'}`}
      >
        <span className={`text-sm font-medium z-10 ${isToday ? 'text-[#A35139]' : 'text-[#1B2632]'}`}>{day}</span>
        
        {wornOutfit && (
          <div className="absolute inset-0 p-1 opacity-40 group-hover:opacity-100 transition-opacity">
            <div className="w-full h-full rounded-xl overflow-hidden">
              {wornOutfit.outfitImageUrl ? (
                <img src={wornOutfit.outfitImageUrl} alt="Worn outfit" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-[#1B2632]/10" /> 
              )}
            </div>
          </div>
        )}
      </div>
    );
  });

  // Check if the currently opened modal's date already has an event
  const currentEvent = selectedDate ? events.find(e => e.date === selectedDate) : null;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-[#1B2632]">Calendar.</h1>
        
        <div className="flex items-center gap-4 bg-[#C9C1B1]/20 backdrop-blur-md px-4 py-2 rounded-full border border-[#1B2632]/10">
          <button onClick={handlePrevMonth} className="p-1 hover:bg-[#1B2632]/10 rounded-full transition-colors">
            <ChevronLeft className="w-5 h-5 text-[#1B2632]" />
          </button>
          <span className="font-medium text-[#1B2632] min-w-[120px] text-center">
            {monthNames[month]} {year}
          </span>
          <button onClick={handleNextMonth} className="p-1 hover:bg-[#1B2632]/10 rounded-full transition-colors">
            <ChevronRight className="w-5 h-5 text-[#1B2632]" />
          </button>
        </div>
      </header>

      <div className="bg-[#C9C1B1]/20 backdrop-blur-md border border-[#1B2632]/10 rounded-3xl p-6">
        <div className="grid grid-cols-7 mb-4">
          {daysOfWeek.map(day => (
            <div key={day} className="text-center text-xs font-bold uppercase tracking-widest text-[#1B2632]/50">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {blanks}
          {days}
        </div>
      </div>

      {isModalOpen && selectedDate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#EEE9DF]/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-2xl bg-[#EEE9DF]/90 backdrop-blur-xl border border-[#1B2632]/10 rounded-3xl p-6 shadow-2xl flex flex-col max-h-[80vh]">
            
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-xl font-semibold text-[#1B2632]">
                Log Outfit for {selectedDate}
              </h2>
              
              <div className="flex items-center gap-2">
                {/* NEW: Clear Day Button */}
                {currentEvent && (
                  <button 
                    onClick={handleClearDate}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-[#A35139] bg-[#A35139]/10 hover:bg-[#A35139]/20 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear Day
                  </button>
                )}
                
                <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-[#1B2632]/5 text-[#1B2632]">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {outfits.map(outfit => (
                  <div 
                    key={outfit.id}
                    onClick={() => handleLogOutfit(outfit.id)}
                    className={`aspect-square rounded-2xl overflow-hidden cursor-pointer relative group border transition-colors ${
                      currentEvent?.outfitId === outfit.id 
                        ? 'border-[#A35139] ring-2 ring-[#A35139]/20' // Highlight currently selected outfit
                        : 'border-[#1B2632]/10 hover:border-[#A35139]'
                    }`}
                  >
                    {outfit.outfitImageUrl ? (
                      <img src={outfit.outfitImageUrl} alt={outfit.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-[#C9C1B1]/30 flex items-center justify-center">
                         <span className="text-xs font-medium text-[#1B2632]/50 text-center px-2">{outfit.name}</span>
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 bg-[#A35139] text-[#EEE9DF] rounded-full p-2 transform scale-75 group-hover:scale-100 transition-all shadow-md">
                        <Plus className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}