import { X, UploadCloud, Image as ImageIcon } from 'lucide-react';
import { useState, useRef } from 'react';
import { ClothingItem } from '../types';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  setItems: React.Dispatch<React.SetStateAction<ClothingItem[]>>;
}

const CATEGORY_MAP: Record<string, string[]> = {
  'Tops': ['T-Shirt', 'Shirt', 'Polo', 'Sweater', 'Tank', 'Hoodie'],
  'Bottoms': ['Jeans', 'Trousers', 'Shorts', 'Skirt', 'Sweatpants'],
  'Outerwear': ['Jacket', 'Coat', 'Blazer', 'Vest'],
  'Footwear': ['Sneakers', 'Boots', 'Formal Shoes', 'Sandals'],
  'Accessories': ['Hat', 'Belt', 'Watch', 'Bag', 'Sunglasses'],
};

export function AddItemModal({ isOpen, onClose, setItems }: AddItemModalProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [colorHex, setColorHex] = useState('#FFFFFF');
  const [size, setSize] = useState('');
  const [seasons, setSeasons] = useState<string[]>([]);
  const [fitProfile, setFitProfile] = useState('');
  const [stance, setStance] = useState('');
  
  // New state for the Base64 image string
  const [imageBase64, setImageBase64] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleSeasonToggle = (s: string) => {
    setSeasons(prev => 
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    );
  };

  // The Base64 Converter Function
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string); // Saves the image as a giant text string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!name || !type) return;

    const newItem: ClothingItem = {
      id: Date.now().toString(),
      name,
      category: type as any, 
      status: 'clean',
      wearCount: 0,
      // If no image is uploaded, use a sleek placeholder instead of an Unsplash link
      images: [imageBase64 || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop'], 
      colorHex,
      description: category,
      size,
      season: seasons,
      fitProfile: fitProfile || undefined,
    };

    setItems(prev => [...prev, newItem]);
    
    // Reset form and close
    setName('');
    setType('');
    setCategory('');
    setColorHex('#FFFFFF');
    setSize('');
    setSeasons([]);
    setFitProfile('');
    setStance('');
    setImageBase64(''); // Clear the image
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-[#EEE9DF]/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-xl bg-[#EEE9DF]/80 backdrop-blur-xl border border-[#1B2632]/10 rounded-3xl p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 p-2 rounded-full hover:bg-[#1B2632]/5 text-[#1B2632] transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-semibold text-[#1B2632] mb-6">Add New Item</h2>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          
          {/* Interactive Dropzone */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-[#1B2632]/20 rounded-2xl h-48 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#1B2632]/5 transition-colors group relative overflow-hidden"
          >
            {/* Hidden File Input */}
            <input 
              type="file" 
              accept="image/png, image/jpeg, image/webp" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleImageUpload}
            />

            {imageBase64 ? (
               <div className="absolute inset-0 w-full h-full">
                 <img src={imageBase64} alt="Preview" className="w-full h-full object-cover" />
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
                <p className="font-medium text-[#1B2632]">Tap to upload an image</p>
                <p className="text-sm text-[#1B2632]/50 mt-1">PNG, JPG, or WEBP</p>
              </>
            )}
          </div>

          {/* Standard Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-[#1B2632]/60 mb-2">Item Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Classic White Oxford" 
                className="w-full bg-[#C9C1B1]/30 border border-[#1B2632]/10 rounded-xl px-4 py-3 text-[#1B2632] placeholder:text-[#1B2632]/40 focus:outline-none focus:ring-2 focus:ring-[#A35139]/50 transition-shadow"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#1B2632]/60 mb-2">Type</label>
              <select 
                className="w-full bg-[#C9C1B1]/30 border border-[#1B2632]/10 rounded-xl px-4 py-3 text-[#1B2632] focus:outline-none focus:ring-2 focus:ring-[#A35139]/50 transition-shadow appearance-none"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  setCategory('');
                }}
                required
              >
                <option value="" disabled>Select type...</option>
                <option value="Tops">Tops</option>
                <option value="Bottoms">Bottoms</option>
                <option value="Outerwear">Outerwear</option>
                <option value="Footwear">Footwear</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#1B2632]/60 mb-2">Category</label>
              <select 
                className="w-full bg-[#C9C1B1]/30 border border-[#1B2632]/10 rounded-xl px-4 py-3 text-[#1B2632] focus:outline-none focus:ring-2 focus:ring-[#A35139]/50 transition-shadow appearance-none disabled:opacity-50"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={!type}
              >
                <option value="" disabled>Select category...</option>
                {type && CATEGORY_MAP[type]?.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#1B2632]/60 mb-2">Primary Color</label>
              <div className="flex items-center gap-2 bg-[#C9C1B1]/30 border border-[#1B2632]/10 rounded-xl px-2 py-1.5 focus-within:ring-2 focus-within:ring-[#A35139]/50 transition-shadow h-[50px]">
                <input 
                  type="color" 
                  value={colorHex}
                  onChange={(e) => setColorHex(e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent shrink-0" 
                />
                <input 
                  type="text" 
                  value={colorHex}
                  onChange={(e) => setColorHex(e.target.value)}
                  placeholder="#FFFFFF" 
                  className="w-full bg-transparent text-[#1B2632] border-none focus:outline-none px-2 text-sm uppercase" 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#1B2632]/60 mb-2">Size</label>
              <select 
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full h-[50px] bg-[#C9C1B1]/30 border border-[#1B2632]/10 rounded-xl px-4 text-[#1B2632] focus:outline-none focus:ring-2 focus:ring-[#A35139]/50 transition-shadow appearance-none"
              >
                <option value="">Select size...</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
                <option value="OS">One Size</option>
              </select>
            </div>
          </div>

          {/* Season Checkboxes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#1B2632]/60 mb-3">Season</label>
            <div className="flex flex-wrap gap-5">
              {['Summer', 'Winter', 'All'].map(s => (
                <label key={s} className="flex items-center gap-2.5 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={seasons.includes(s)}
                    onChange={() => handleSeasonToggle(s)} 
                  />
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${seasons.includes(s) ? 'bg-[#A35139] border-[#A35139]' : 'border-[#1B2632]/30 bg-[#C9C1B1]/10 group-hover:border-[#1B2632]/60'}`}>
                     {seasons.includes(s) && <div className="w-2.5 h-2.5 bg-[#EEE9DF] rounded-sm" />}
                  </div>
                  <span className="text-sm font-medium text-[#1B2632]">{s}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Dynamic Conditional Fields */}
          <div className="pt-2">
            {(type === 'Tops' || type === 'Bottoms') && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-xs font-bold uppercase tracking-widest text-[#1B2632]/60 mb-2">Fit Profile</label>
                <select 
                  value={fitProfile}
                  onChange={(e) => setFitProfile(e.target.value)}
                  className="w-full bg-[#C9C1B1]/30 border border-[#1B2632]/10 rounded-xl px-4 py-3 text-[#1B2632] focus:outline-none focus:ring-2 focus:ring-[#A35139]/50 transition-shadow appearance-none"
                >
                  <option value="" disabled>Select fit...</option>
                  <option value="Slim">Slim</option>
                  <option value="Regular">Regular</option>
                  <option value="Oversized">Oversized</option>
                  <option value="Baggy">Baggy</option>
                </select>
              </div>
            )}

            {type === 'Footwear' && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-xs font-bold uppercase tracking-widest text-[#1B2632]/60 mb-2">Stance</label>
                <select 
                  value={stance}
                  onChange={(e) => setStance(e.target.value)}
                  className="w-full bg-[#C9C1B1]/30 border border-[#1B2632]/10 rounded-xl px-4 py-3 text-[#1B2632] focus:outline-none focus:ring-2 focus:ring-[#A35139]/50 transition-shadow appearance-none"
                >
                  <option value="" disabled>Select stance...</option>
                  <option value="Chunky">Chunky</option>
                  <option value="Sleek">Sleek</option>
                  <option value="Formal">Formal</option>
                </select>
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-[#1B2632]/10">
            <button 
              type="submit"
              className="w-full bg-[#1B2632] text-[#EEE9DF] px-6 py-3.5 rounded-xl font-medium hover:bg-[#1B2632]/90 transition-colors disabled:opacity-50"
              disabled={!name || !type}
            >
              Add to Wardrobe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}