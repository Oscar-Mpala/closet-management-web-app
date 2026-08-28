import React, { useState } from 'react';
import { Search, Star, Dices, Save, Plus, X, Edit2, Trash2, AlertTriangle } from 'lucide-react';
import { ClothingItem, Outfit } from '../types';
import { WardrobeCard } from './WardrobeCard';
import { SaveOutfitModal } from './SaveOutfitModal';

interface CanvasProps {
  items: ClothingItem[];
  outfits: Outfit[];
  setOutfits: React.Dispatch<React.SetStateAction<Outfit[]>>;
}

type Slot = 'Tops' | 'Bottoms' | 'Footwear' | 'Outerwear';

export function Canvas({ items, outfits, setOutfits }: CanvasProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeOutfit, setActiveOutfit] = useState<Outfit | null>(outfits[0] || null);
  
  const [builderSlots, setBuilderSlots] = useState<{
    Tops?: string;
    Bottoms?: string;
    Footwear?: string;
    Outerwear?: string;
  }>({
    Tops: outfits[0]?.topId,
    Bottoms: outfits[0]?.bottomId,
    Footwear: outfits[0]?.footwearId,
    Outerwear: outfits[0]?.outerwearId,
  });
  
  const [builderRating, setBuilderRating] = useState<number>(outfits[0]?.rating || 0);
  const [selectingSlot, setSelectingSlot] = useState<Slot | null>(null);
  const [mobileView, setMobileView] = useState<'overview' | 'builder'>('overview');

  // Modal States
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [outfitToEdit, setOutfitToEdit] = useState<Outfit | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const filteredOutfits = outfits.filter(o => o.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const isDuplicate = outfits.some(o => 
    (o.topId || undefined) === (builderSlots.Tops || undefined) &&
    (o.bottomId || undefined) === (builderSlots.Bottoms || undefined) &&
    (o.footwearId || undefined) === (builderSlots.Footwear || undefined)
  );

  const evaluateMatch = (newSlots: any) => {
    const currentStillMatches = activeOutfit &&
      (activeOutfit.topId || undefined) === (newSlots.Tops || undefined) &&
      (activeOutfit.bottomId || undefined) === (newSlots.Bottoms || undefined) &&
      (activeOutfit.footwearId || undefined) === (newSlots.Footwear || undefined);

    if (currentStillMatches) return;

    const matchedOutfit = outfits.find(o => 
      (o.topId || undefined) === (newSlots.Tops || undefined) &&
      (o.bottomId || undefined) === (newSlots.Bottoms || undefined) &&
      (o.footwearId || undefined) === (newSlots.Footwear || undefined)
    );

    if (matchedOutfit) {
      setActiveOutfit(matchedOutfit);
      setBuilderRating(matchedOutfit.rating);
    } else {
      setActiveOutfit(null);
    }
  };

  const handleSelectOutfit = (outfit: Outfit) => {
    setActiveOutfit(outfit);
    setBuilderRating(outfit.rating);
    setBuilderSlots({
      Tops: outfit.topId,
      Bottoms: outfit.bottomId,
      Footwear: outfit.footwearId,
      Outerwear: outfit.outerwearId,
    });
    setMobileView('builder');
  };

  const handleSlotClick = (slot: Slot) => {
    setSelectingSlot(slot);
  };

  const handleItemSelect = (itemId: string) => {
    if (!selectingSlot) return;
    const newSlots = { ...builderSlots, [selectingSlot]: itemId };
    setBuilderSlots(newSlots);
    setSelectingSlot(null);
    evaluateMatch(newSlots);
  };

  const randomize = () => {
    const tops = items.filter(i => i.category === 'Tops');
    const bottoms = items.filter(i => i.category === 'Bottoms');
    const footwear = items.filter(i => i.category === 'Footwear');
    const outerwear = items.filter(i => i.category === 'Outerwear');
    
    const newSlots = {
      Tops: tops.length > 0 ? tops[Math.floor(Math.random() * tops.length)].id : undefined,
      Bottoms: bottoms.length > 0 ? bottoms[Math.floor(Math.random() * bottoms.length)].id : undefined,
      Footwear: footwear.length > 0 ? footwear[Math.floor(Math.random() * footwear.length)].id : undefined,
      Outerwear: (outerwear.length > 0 && Math.random() > 0.5) ? outerwear[Math.floor(Math.random() * outerwear.length)].id : undefined
    };

    setBuilderSlots(newSlots);
    evaluateMatch(newSlots);
  };

  const handleInitiateSave = () => {
    if (isDuplicate) return;
    setOutfitToEdit(null);
    setIsSaveModalOpen(true);
  };

  const handleInitiateEdit = () => {
    if (!activeOutfit) return;
    setOutfitToEdit(activeOutfit);
    setIsSaveModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!activeOutfit) return;
    setOutfits(prev => prev.filter(o => o.id !== activeOutfit.id));
    setActiveOutfit(null);
    setBuilderSlots({ Tops: undefined, Bottoms: undefined, Footwear: undefined, Outerwear: undefined });
    setShowDeleteConfirm(false);
  };

  const glassyPanel = "bg-[#C9C1B1]/20 backdrop-blur-md border border-[#1B2632]/10 rounded-3xl p-6";

  const renderSlot = (slotType: Slot) => {
    const itemId = builderSlots[slotType];
    const item = items.find(i => i.id === itemId);
    
    return (
      <div 
        key={slotType}
        onClick={() => handleSlotClick(slotType)}
        className="w-full aspect-square rounded-2xl overflow-hidden cursor-pointer relative group bg-[#C9C1B1]/10 border border-[#1B2632]/10 hover:border-[#1B2632]/30 transition-colors flex items-center justify-center"
      >
        {item ? (
          <img src={item.images[0]} alt={slotType} className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center text-[#1B2632]/40">
            <Plus className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-semibold tracking-wider uppercase">{slotType}</span>
            {slotType === 'Outerwear' && <span className="text-[8px] uppercase">(Optional)</span>}
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col h-[calc(100vh-2rem)] md:h-[calc(100vh-5rem)]">
      <header className="mb-6 shrink-0">
        <h1 className="text-3xl font-semibold text-[#1B2632]">The Canvas.</h1>
      </header>

      <div className="flex md:hidden bg-[#C9C1B1]/20 rounded-full p-1 mb-4 shrink-0">
        <button 
          onClick={() => setMobileView('overview')}
          className={`flex-1 py-2 rounded-full text-sm font-medium transition-colors ${mobileView === 'overview' ? 'bg-[#1B2632] text-[#EEE9DF]' : 'text-[#1B2632]'}`}
        >
          Overview
        </button>
        <button 
          onClick={() => setMobileView('builder')}
          className={`flex-1 py-2 rounded-full text-sm font-medium transition-colors ${mobileView === 'builder' ? 'bg-[#1B2632] text-[#EEE9DF]' : 'text-[#1B2632]'}`}
        >
          Builder
        </button>
      </div>

      <div className="flex-1 min-h-0 flex flex-col md:flex-row gap-6">
        
        <div className={`${mobileView === 'overview' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-1/3 xl:w-1/4 ${glassyPanel} h-full`}>
          <div className="relative mb-4 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1B2632]/50" />
            <input 
              type="text" 
              placeholder="Search outfits..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#EEE9DF]/50 border-none rounded-full py-2.5 pl-9 pr-4 text-sm text-[#1B2632] placeholder:text-[#1B2632]/50 focus:outline-none focus:ring-1 focus:ring-[#1B2632]/20"
            />
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {filteredOutfits.map(outfit => (
              <button 
                key={outfit.id}
                onClick={() => handleSelectOutfit(outfit)}
                className={`w-full flex items-center gap-4 p-2 rounded-2xl transition-colors ${
                  activeOutfit?.id === outfit.id ? 'bg-[#1B2632]/5 border border-[#1B2632]/10' : 'hover:bg-[#1B2632]/5 border border-transparent'
                }`}
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-[#C9C1B1]/20">
                  {outfit.outfitImageUrl && <img src={outfit.outfitImageUrl} alt={outfit.name} className="w-full h-full object-cover" />}
                </div>
                <div className="text-left flex-1 min-w-0">
                  <h3 className="font-semibold text-[#1B2632] text-sm truncate">{outfit.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star 
                        key={star} 
                        className={`w-3 h-3 ${star <= outfit.rating ? 'fill-[#A35139] text-[#A35139]' : 'text-[#1B2632]/20'}`} 
                      />
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className={`${mobileView === 'builder' ? 'flex' : 'hidden'} md:flex flex-col flex-1 ${glassyPanel} overflow-y-auto h-full`}>
          <div className="flex items-center justify-between mb-6 shrink-0">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button key={star} onClick={() => setBuilderRating(star)} className="focus:outline-none hover:scale-110 transition-transform disabled:opacity-100" disabled>
                  <Star 
                    className={`w-5 h-5 md:w-6 md:h-6 ${star <= builderRating ? 'fill-[#A35139] text-[#A35139]' : 'text-[#1B2632]/20'}`} 
                  />
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={randomize}
                className="p-2 md:px-4 md:py-2.5 rounded-full bg-[#1B2632]/5 hover:bg-[#1B2632]/10 text-[#1B2632] flex items-center gap-2 transition-colors font-medium text-sm"
              >
                <Dices className="w-5 h-5" />
                <span className="hidden md:inline">Randomize</span>
              </button>
              <button 
                onClick={handleInitiateSave}
                disabled={isDuplicate || !builderSlots.Tops || !builderSlots.Bottoms}
                className={`px-4 py-2.5 rounded-full flex items-center gap-2 font-medium text-sm transition-all ${
                  isDuplicate || !builderSlots.Tops || !builderSlots.Bottoms
                    ? 'bg-[#1B2632]/10 text-[#1B2632]/40 cursor-not-allowed' 
                    : 'bg-[#A35139] text-[#EEE9DF] shadow-sm hover:bg-[#A35139]/90'
                }`}
              >
                <Save className="w-4 h-4" />
                {isDuplicate ? 'Saved' : 'Save Outfit'}
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 flex-1 min-h-0">
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <div className="aspect-square rounded-3xl overflow-hidden shrink-0 bg-[#C9C1B1]/10 border border-[#1B2632]/5 relative flex items-center justify-center">
                {activeOutfit?.outfitImageUrl ? (
                  <img 
                    src={activeOutfit.outfitImageUrl} 
                    alt="Full Outfit Preview" 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="flex flex-col items-center text-[#1B2632]/40">
                    <span className="font-medium">No Preview Available</span>
                  </div>
                )}
              </div>
              
              {activeOutfit && isDuplicate && (
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleInitiateEdit}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#1B2632]/5 hover:bg-[#1B2632]/10 text-[#1B2632] px-4 py-3 rounded-xl font-medium transition-colors text-sm"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Details
                  </button>
                  <button 
                    onClick={() => setShowDeleteConfirm(true)}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#A35139]/10 hover:bg-[#A35139]/20 text-[#A35139] px-4 py-3 rounded-xl font-medium transition-colors text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col flex-1 justify-center">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#1B2632]/50 mb-4 hidden lg:block">Components</h3>
              <div className="grid grid-cols-4 lg:grid-cols-2 gap-2 sm:gap-4 lg:gap-6">
                {(['Tops', 'Bottoms', 'Outerwear', 'Footwear'] as Slot[]).map(slot => renderSlot(slot))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectingSlot && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#EEE9DF]/80 backdrop-blur-md" onClick={() => setSelectingSlot(null)} />
          <div className="relative w-full max-w-2xl bg-[#C9C1B1]/30 backdrop-blur-xl border border-[#1B2632]/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[80vh]">
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-[#1B2632]/10 shrink-0">
              <h2 className="text-xl font-semibold text-[#1B2632]">Select {selectingSlot}</h2>
              <button onClick={() => setSelectingSlot(null)} className="p-2 rounded-full hover:bg-[#1B2632]/5">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              <div className="grid grid-cols-3 md:grid-cols-4 gap-[2px]">
                {items.filter(i => i.category === selectingSlot).map(item => (
                  <WardrobeCard key={item.id} item={item} onClick={() => handleItemSelect(item.id)} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Outfit Delete Confirmation Overlay */}
      {showDeleteConfirm && activeOutfit && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#EEE9DF]/60 backdrop-blur-sm" onClick={() => setShowDeleteConfirm(false)} />
          <div className="relative w-full max-w-sm bg-[#EEE9DF]/95 backdrop-blur-xl border border-[#1B2632]/10 rounded-3xl p-6 shadow-2xl text-center animate-in zoom-in-95 duration-200">
            <div className="mx-auto w-12 h-12 rounded-full bg-[#A35139]/10 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-[#A35139]" />
            </div>
            <h3 className="text-xl font-semibold text-[#1B2632] mb-2">Delete {activeOutfit.name}?</h3>
            <p className="text-[#1B2632]/70 text-sm mb-6">
              Are you sure you want to delete this outfit? This action cannot be undone.
            </p>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowDeleteConfirm(false)} 
                className="flex-1 px-4 py-3 rounded-xl bg-[#1B2632]/5 hover:bg-[#1B2632]/10 text-[#1B2632] font-medium transition-colors text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmDelete} 
                className="flex-1 px-4 py-3 rounded-xl bg-[#A35139] hover:bg-[#A35139]/90 text-[#EEE9DF] font-medium transition-colors text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <SaveOutfitModal 
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        setOutfits={setOutfits}
        existingOutfit={outfitToEdit}
        currentCanvasItems={{
          topId: builderSlots.Tops,
          bottomId: builderSlots.Bottoms,
          footwearId: builderSlots.Footwear
        }}
      />
    </div>
  );
}