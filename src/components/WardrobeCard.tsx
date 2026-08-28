import { Sparkles, Droplets } from 'lucide-react';
import React from 'react';
import { ClothingItem } from '../types';

interface WardrobeCardProps {
  key?: string | number;
  item: ClothingItem;
  onClick: () => void;
}

export function WardrobeCard({ item, onClick }: WardrobeCardProps) {
  return (
    <div 
      onClick={onClick}
      className="relative w-full aspect-square rounded-none overflow-hidden cursor-pointer active:scale-95 hover:opacity-90 transition-all bg-[#C9C1B1]/10"
    >
      <img 
        src={item.images[0]} 
        alt={item.name} 
        className="w-full h-full object-cover" 
      />
      
      {/* Visual Indicators - Tucked Tightly */}
      <div className="absolute bottom-1 left-1 flex items-center z-10">
        <div 
          className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border border-black/10 shadow-sm" 
          style={{ backgroundColor: item.colorHex }} 
          title={`Color: ${item.colorHex}`}
        />
      </div>
      
      <div className="absolute bottom-1 right-1 z-10">
        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#EEE9DF]/90 backdrop-blur-md flex items-center justify-center text-[#1B2632] shadow-sm">
          {item.status === 'clean' ? (
            <Sparkles className="w-2.5 h-2.5 md:w-3 md:h-3" strokeWidth={2} />
          ) : (
            <Droplets className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#A35139]" strokeWidth={2} />
          )}
        </div>
      </div>
    </div>
  );
}
