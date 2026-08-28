import React from 'react';
import { ClothingItem } from '../types';
import { Sparkles, Droplets, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface LaundryProps {
  items: ClothingItem[];
  setItems: React.Dispatch<React.SetStateAction<ClothingItem[]>>;
}

export function Laundry({ items, setItems }: LaundryProps) {
  const dirtyItems = items.filter(item => item.status === 'dirty');
  const cleanItemsCount = items.length - dirtyItems.length;
  const dirtyItemsCount = dirtyItems.length;

  const handleMarkClean = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status: 'clean' } : item));
  };

  const handleWashAll = () => {
    setItems(prev => prev.map(item => ({ ...item, status: 'clean' })));
  };

  const breakdown = {
    Tops: dirtyItems.filter(i => i.category === 'Tops').length,
    Bottoms: dirtyItems.filter(i => i.category === 'Bottoms').length,
    Outerwear: dirtyItems.filter(i => i.category === 'Outerwear').length,
    Footwear: dirtyItems.filter(i => i.category === 'Footwear').length,
  };

  const isLaundryDay = dirtyItemsCount > 4;
  const glassyPanel = "bg-[#C9C1B1]/20 backdrop-blur-md border border-[#1B2632]/10 rounded-3xl p-6 md:p-8";

  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-[#1B2632]">Laundry.</h1>
          <p className="text-[#1B2632]/70 mt-1">Manage your dirty clothes</p>
        </div>

        <button 
          onClick={handleWashAll}
          disabled={dirtyItemsCount === 0}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm shrink-0 ${
            dirtyItemsCount === 0 
              ? 'bg-[#1B2632]/10 text-[#1B2632]/40 cursor-not-allowed' 
              : 'bg-[#1B2632] text-[#EEE9DF] hover:bg-[#1B2632]/90'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Wash All
        </button>
      </div>

      {/* Dashboard Top Section */}
      <div className={`flex flex-col md:flex-row gap-6 ${glassyPanel}`}>
        
        {/* Status Summary */}
        <div className="flex-1 flex flex-col justify-center space-y-6">
          {isLaundryDay && (
            <div className="flex items-center gap-2 text-[#A35139] bg-[#A35139]/10 p-3 rounded-2xl w-max border border-[#A35139]/20">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-semibold text-sm tracking-wide">LAUNDRY DAY!</span>
            </div>
          )}
          
          <div className="flex items-center gap-8">
            <div>
              <p className="text-[#1B2632]/60 text-xs font-bold uppercase tracking-widest mb-1">Clean</p>
              <div className="text-4xl font-light text-[#1B2632] flex items-center gap-3">
                {cleanItemsCount}
                <Sparkles className="w-6 h-6 text-[#1B2632]/40" />
              </div>
            </div>
            <div className="w-px h-12 bg-[#1B2632]/10" />
            <div>
              <p className="text-[#A35139]/80 text-xs font-bold uppercase tracking-widest mb-1">Dirty</p>
              <div className="text-4xl font-light text-[#A35139] flex items-center gap-3">
                {dirtyItemsCount}
                <Droplets className="w-6 h-6 text-[#A35139]/60" />
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="flex-1 border-t md:border-t-0 md:border-l border-[#1B2632]/10 pt-6 md:pt-0 md:pl-8">
          <p className="text-[#1B2632]/60 text-xs font-bold uppercase tracking-widest mb-4">Dirty Breakdown</p>
          <div className="grid grid-cols-2 gap-y-4 gap-x-8">
            {Object.entries(breakdown).map(([category, count]) => (
              <div key={category} className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#1B2632]">{category}</span>
                <span className={`text-sm font-bold ${count > 0 ? 'text-[#A35139]' : 'text-[#1B2632]/40'}`}>
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dirty Grid */}
      {dirtyItemsCount > 0 ? (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[2px]">
          {dirtyItems.map(item => (
            <div 
              key={item.id}
              className="relative w-full aspect-square rounded-none overflow-hidden group bg-[#C9C1B1]/10"
            >
              <img 
                src={item.images[0]} 
                alt="Dirty Item" 
                className="w-full h-full object-cover" 
              />
              
              {/* Mark Clean Button Overlay */}
              <button
                onClick={() => handleMarkClean(item.id)}
                className="absolute bottom-1 right-1 w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#EEE9DF]/90 backdrop-blur-md flex items-center justify-center text-[#1B2632] shadow-sm hover:bg-[#1B2632] hover:text-[#EEE9DF] transition-colors active:scale-95 cursor-pointer z-10 border border-[#1B2632]/10"
                title="Mark Clean"
              >
                <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={2.5} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <div className="w-16 h-16 bg-[#C9C1B1]/20 rounded-full flex items-center justify-center mx-auto mb-4 text-[#1B2632]/40">
            <Sparkles className="w-8 h-8" />
          </div>
          <p className="text-[#1B2632]/60 font-medium">No dirty laundry right now. You're all caught up!</p>
        </div>
      )}
    </div>
  );
}
