import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';
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
      id: `event_${Date.now()}`,
      date: selectedDate,
      outfitId,
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

  // Fixed height classes so it fits perfectly on all screens without aspect-ratio blowout
  const cellHeight = "h-14 sm:h-20 lg:h-24 xl:h-28"; 

  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => (
    <div key={`blank-${i}`} className={`${cellHeight} rounded-lg sm:rounded-2xl bg-transparent`} />
  ));
  
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
        className={`relative ${cellHeight} border border-[#1B2632]/5 rounded-lg sm:rounded-2xl cursor-pointer hover:border-[#1B2632]/30 transition-all flex flex-col overflow-hidden group ${
          isToday ? 'bg-[#C9C1B1]/40 ring-1 ring-[#A35139]/30' : 'bg-[#C9C1B1]/10'
        }`}
      >
        {/* Date Number in top-left corner */}
        <span 
          className={`absolute top-1 left-1 sm:top-2 sm:left-2 text-[10px] sm:text-xs font-bold z-10 
          ${isToday ? 'text-[#A35139]' : 'text-[#1B2632]/70'} 
          ${wornOutfit ? 'bg-[#EEE9DF]/80 backdrop-blur-md px-1.5 py-0.5 rounded-md shadow-sm' : ''}`}
        >
          {day}
        </span>
        
        {/* Full-bleed Outfit Image */}
        {wornOutfit && (
          <div className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity">
            {wornOutfit.outfitImageUrl ? (
              <img src={wornOutfit.outfitImageUrl} alt="Worn outfit" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#1B2632]/10 flex items-center justify-center">
                 <span className="text-[10px] font-medium text-[#1B2632]/50 mt-4">Logged</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  });

  return (
    <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
      
      {/* Responsive Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#1B2632]">Calendar.</h1>
        
        <div className="flex items-center justify-between w-full sm:w-auto gap-2 sm:gap-4 bg-[#C9C1B1]/20 backdrop-blur-md px-2 sm:px-4 py-2 rounded-full border border-[#1B2632]/10">
          <button onClick={handlePrevMonth} className="p-2 hover:bg-[#1B2632]/10 rounded-full transition-colors">
            <ChevronLeft className="w-5 h-5 text-[#1B2632]" />
          </button>
          <span className="font-medium text-[#1B2632] min-w-[120px] text-center text-sm sm:text-base">
            {monthNames[month]} {year}
          </span>
          <button onClick={handleNextMonth} className="p-2 hover:bg-[#1B2632]/10 rounded-full transition-colors">
            <ChevronRight className="w-5 h-5 text-[#1B2632]" />
          </button>
        </div>
      </header>

      {/* Grid Container */}
      <div className="bg-[#C9C1B1]/20 backdrop-blur-md border border-[#1B2632]/10 rounded-2xl sm:rounded-3xl p-3 sm:p-6">
        <div className="grid grid-cols-7 mb-2 sm:mb-4">
          {daysOfWeek.map(day => (
            <div key={day} className="text-center text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#1B2632]/50">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {blanks}
          {days}
        </div>
      </div>

      {/* Log Outfit Modal */}
      {isModalOpen && selectedDate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#EEE9DF]/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-2xl bg-[#EEE9DF]/95 backdrop-blur-xl border border-[#1B2632]/10 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between mb-4 sm:mb-6 shrink-0">
              <h2 className="text-lg sm:text-xl font-semibold text-[#1B2632]">
                Log Outfit for {selectedDate}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-[#1B2632]/5 text-[#1B2632]">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pb-4">
                {outfits.map(outfit => (
                  <div 
                    key={outfit.id}
                    onClick={() => handleLogOutfit(outfit.id)}
                    className="aspect-square rounded-2xl overflow-hidden cursor-pointer relative group border border-[#1B2632]/10 hover:border-[#A35139] transition-all shadow-sm hover:shadow-md"
                  >
                    {outfit.outfitImageUrl ? (
                      <img src={outfit.outfitImageUrl} alt={outfit.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-[#C9C1B1]/30 flex items-center justify-center">
                         <span className="text-xs font-medium text-[#1B2632]/50 text-center px-2">{outfit.name}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 bg-[#A35139] text-[#EEE9DF] rounded-full p-2 sm:p-3 transform scale-75 group-hover:scale-100 transition-all shadow-lg">
                        <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
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