import { X, UploadCloud, Image as ImageIcon, Star } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Outfit } from '../types';

interface SaveOutfitModalProps {
  isOpen: boolean;
  onClose: () => void;
  setOutfits: React.Dispatch<React.SetStateAction<Outfit[]>>;
  // If editing, we pass the existing outfit. If creating, this is null.
  existingOutfit: Outfit | null; 
  // If creating a new one, we need the IDs of the clothes currently on the canvas
  currentCanvasItems: { topId?: string; bottomId?: string; footwearId?: string };
}

export function SaveOutfitModal({ isOpen, onClose, setOutfits, existingOutfit, currentCanvasItems }: SaveOutfitModalProps) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(3);
  const [imageBase64, setImageBase64] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-fill the form if we are editing an existing outfit
  useEffect(() => {
    if (existingOutfit) {
      setName(existingOutfit.name);
      setRating(existingOutfit.rating);
      setImageBase64(existingOutfit.outfitImageUrl || '');
    } else {
      // Reset if it's a brand new outfit
      setName('');
      setRating(3);
      setImageBase64('');
    }
  }, [existingOutfit, isOpen]);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!name) return;

    if (existingOutfit) {
      // UPDATE existing outfit
      setOutfits(prev => prev.map(o => 
        o.id === existingOutfit.id 
          ? { ...o, name, rating, outfitImageUrl: imageBase64 } 
          : o
      ));
    } else {
      // CREATE new outfit
      // Combine all valid IDs from the canvas into the itemIds array
      const itemIds = [currentCanvasItems.topId, currentCanvasItems.bottomId, currentCanvasItems.footwearId].filter(Boolean) as string[];
      
      const newOutfit: Outfit = {
        id: `outfit_${Date.now()}`,
        name,
        rating,
        itemIds,
        outfitImageUrl: imageBase64,
        topId: currentCanvasItems.topId,
        bottomId: currentCanvasItems.bottomId,
        footwearId: currentCanvasItems.footwearId
      };
      setOutfits(prev => [newOutfit, ...prev]);
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-[#EEE9DF]/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-md bg-[#EEE9DF]/90 backdrop-blur-xl border border-[#1B2632]/10 rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-[#1B2632]/5 text-[#1B2632] transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-[#1B2632] mb-6">
          {existingOutfit ? 'Edit Outfit' : 'Save New Outfit'}
        </h2>

        <div className="space-y-6">
          {/* Image Upload Dropzone */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-[#1B2632]/20 rounded-2xl h-48 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#1B2632]/5 transition-colors group relative overflow-hidden bg-[#C9C1B1]/20"
          >
            <input 
              type="file" 
              accept="image/png, image/jpeg, image/webp" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleImageUpload}
            />

            {imageBase64 ? (
               <div className="absolute inset-0 w-full h-full">
                 <img src={imageBase64} alt="Outfit Preview" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ImageIcon className="w-8 h-8 text-white mb-2" />
                    <span className="text-white font-medium text-sm">Change Photo</span>
                 </div>
               </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-[#1B2632]/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-6 h-6 text-[#1B2632]" />
                </div>
                <p className="font-medium text-[#1B2632]">Upload an outfit fit pic</p>
                <p className="text-xs text-[#1B2632]/50 mt-1">This will show on your Dashboard</p>
              </>
            )}
          </div>

          {/* Outfit Name */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1B2632]/60 mb-2">Outfit Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Charles V or Campus Fit" 
              className="w-full bg-[#C9C1B1]/30 border border-[#1B2632]/10 rounded-xl px-4 py-3 text-[#1B2632] placeholder:text-[#1B2632]/40 focus:outline-none focus:ring-2 focus:ring-[#A35139]/50 transition-shadow text-sm"
              required
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1B2632]/60 mb-2">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 focus:outline-none hover:scale-110 transition-transform"
                >
                  <Star 
                    className={`w-8 h-8 ${rating >= star ? 'fill-[#A35139] text-[#A35139]' : 'text-[#1B2632]/20'}`} 
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button 
            onClick={handleSubmit}
            disabled={!name}
            className="w-full bg-[#1B2632] text-[#EEE9DF] px-6 py-3.5 rounded-xl font-medium hover:bg-[#1B2632]/90 transition-colors disabled:opacity-50 mt-2"
          >
            {existingOutfit ? 'Save Changes' : 'Save to Wardrobe'}
          </button>
        </div>
      </div>
    </div>
  );
}