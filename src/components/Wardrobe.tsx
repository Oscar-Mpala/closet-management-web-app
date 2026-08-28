import { useState } from 'react';
import { ClothingItem, Category } from '../types';
import { WardrobeCard } from './WardrobeCard';
import { AddItemModal } from './AddItemModal';
import { ItemDetailsModal } from './ItemDetailsModal';
import { Plus } from 'lucide-react';

interface WardrobeProps {
  items: ClothingItem[];
  setItems: React.Dispatch<React.SetStateAction<ClothingItem[]>>;
}

const filters: { label: string; value: Category | 'All' }[] = [
  { label: 'All', value: 'All' },
  { label: 'Tops', value: 'Tops' },
  { label: 'Bottoms', value: 'Bottoms' },
  { label: 'Outerwear', value: 'Outerwear' },
  { label: 'Footwear', value: 'Footwear' },
];

export function Wardrobe({ items, setItems }: WardrobeProps) {
  const [activeFilter, setActiveFilter] = useState<Category | 'All'>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);

  const filteredItems = activeFilter === 'All' 
    ? items 
    : items.filter(item => item.category === activeFilter);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header & Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-[#1B2632]">Wardrobe.</h1>
          <p className="text-[#1B2632]/70 mt-1">{items.length} items total</p>
        </div>

        {/* Minimal Add Button */}
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="p-3 rounded-full bg-[#A35139] text-[#EEE9DF] hover:bg-[#A35139]/90 transition-colors shadow-sm shrink-0"
          aria-label="Add New Item"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Filters (Horizontally Scrollable) */}
      <div className="flex flex-nowrap overflow-x-auto whitespace-nowrap gap-2 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {filters.map(filter => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors shrink-0 ${
              activeFilter === filter.value 
                ? 'bg-[#1B2632] text-[#EEE9DF]' 
                : 'bg-[#C9C1B1]/20 text-[#1B2632] hover:bg-[#C9C1B1]/40 border border-[#1B2632]/10'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Dense Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[2px]">
        {filteredItems.map(item => (
          <WardrobeCard 
            key={item.id} 
            item={item} 
            onClick={() => setSelectedItem(item)} 
          />
        ))}
      </div>

      {/* Modals */}
      <AddItemModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} setItems={setItems} />
      <ItemDetailsModal 
  item={selectedItem} 
  isOpen={!!selectedItem} 
  onClose={() => setSelectedItem(null)} 
  setItems={setItems} 
/>
    </div>
  );
}