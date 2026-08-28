import { X, Sparkles, Droplets, Edit2, Trash2, Check, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ClothingItem } from '../types';

interface ItemDetailsModalProps {
  item: ClothingItem | null;
  isOpen: boolean;
  onClose: () => void;
  setItems: React.Dispatch<React.SetStateAction<ClothingItem[]>>;
}

export function ItemDetailsModal({ item, isOpen, onClose, setItems }: ItemDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState<ClothingItem | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (item) {
      setEditedItem(item);
      setIsEditing(false);
      setShowDeleteConfirm(false);
    }
  }, [item]);

  if (!isOpen || !item || !editedItem) return null;

  const handleConfirmDelete = () => {
    setItems(prev => prev.filter(i => i.id !== item.id));
    setShowDeleteConfirm(false);
    onClose();
  };

  const handleSave = () => {
    setItems(prev => prev.map(i => (i.id === editedItem.id ? editedItem : i)));
    setIsEditing(false);
  };

  const handleSeasonToggle = (s: string) => {
    setEditedItem(prev => {
      if (!prev) return prev;
      const currentSeasons = prev.season || [];
      const newSeasons = currentSeasons.includes(s) 
        ? currentSeasons.filter(x => x !== s) 
        : [...currentSeasons, s];
      return { ...prev, season: newSeasons };
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-[#EEE9DF]/80 backdrop-blur-md transition-opacity" 
        onClick={() => {
          setIsEditing(false);
          setShowDeleteConfirm(false);
          onClose();
        }} 
      />
      
      <div className="relative w-full max-w-sm sm:max-w-md bg-[#C9C1B1]/40 backdrop-blur-xl border border-[#1B2632]/10 rounded-3xl overflow-y-auto shadow-2xl max-h-[90vh] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        
        {/* Custom Delete Confirmation Overlay */}
        {showDeleteConfirm && (
          <div className="absolute inset-0 z-[110] flex items-center justify-center p-6 bg-[#EEE9DF]/95 backdrop-blur-xl animate-in fade-in duration-200">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-[#A35139]/10 flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-[#A35139]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1B2632] mb-2">Delete Item?</h3>
              <p className="text-[#1B2632]/70 text-sm mb-8">
                Are you sure you want to remove <span className="font-semibold">{item.name}</span> from your wardrobe? This cannot be undone.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-3 rounded-xl bg-[#1B2632]/10 hover:bg-[#1B2632]/20 text-[#1B2632] font-medium transition-colors text-sm"
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

        <button 
          onClick={() => {
            setIsEditing(false);
            setShowDeleteConfirm(false);
            onClose();
          }}
          className="absolute right-4 top-4 p-2 rounded-full bg-[#EEE9DF]/80 backdrop-blur-md hover:bg-[#EEE9DF] text-[#1B2632] transition-colors z-20 shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-full h-64 sm:h-72 shrink-0 relative bg-[#1B2632]/5">
          <img 
            src={item.images[0]} 
            alt={item.name} 
            className="w-full h-full object-cover" 
          />
          {!isEditing && (
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#1B2632] bg-[#EEE9DF]/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                {item.status === 'clean' ? <Sparkles className="w-3.5 h-3.5" /> : <Droplets className="w-3.5 h-3.5 text-[#A35139]" />}
                {item.status === 'clean' ? 'Clean' : 'Needs Wash'}
              </span>
            </div>
          )}
        </div>

        <div className="p-5 sm:p-6">
          {isEditing ? (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1B2632]/60 mb-1">Name</label>
                <input 
                  type="text" 
                  value={editedItem.name}
                  onChange={e => setEditedItem({...editedItem, name: e.target.value})}
                  className="w-full bg-[#EEE9DF]/50 border border-[#1B2632]/10 rounded-xl px-3 py-2 text-[#1B2632] focus:outline-none focus:ring-2 focus:ring-[#A35139]/50 text-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1B2632]/60 mb-1">Description</label>
                <textarea 
                  value={editedItem.description || ''}
                  onChange={e => setEditedItem({...editedItem, description: e.target.value})}
                  rows={2}
                  className="w-full bg-[#EEE9DF]/50 border border-[#1B2632]/10 rounded-xl px-3 py-2 text-[#1B2632] focus:outline-none focus:ring-2 focus:ring-[#A35139]/50 text-sm resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1B2632]/60 mb-1">Size</label>
                  <select 
                    value={editedItem.size || ''}
                    onChange={e => setEditedItem({...editedItem, size: e.target.value})}
                    className="w-full bg-[#EEE9DF]/50 border border-[#1B2632]/10 rounded-xl px-3 py-2 text-[#1B2632] focus:outline-none focus:ring-2 focus:ring-[#A35139]/50 text-sm appearance-none"
                  >
                    <option value="">None</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                    <option value="OS">OS</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1B2632]/60 mb-1">Color</label>
                  <div className="flex items-center gap-2 bg-[#EEE9DF]/50 border border-[#1B2632]/10 rounded-xl px-2 py-1 focus-within:ring-2 focus-within:ring-[#A35139]/50 h-[38px]">
                    <input 
                      type="color" 
                      value={editedItem.colorHex}
                      onChange={e => setEditedItem({...editedItem, colorHex: e.target.value})}
                      className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent shrink-0" 
                    />
                    <input 
                      type="text" 
                      value={editedItem.colorHex}
                      onChange={e => setEditedItem({...editedItem, colorHex: e.target.value})}
                      className="w-full bg-transparent text-[#1B2632] border-none focus:outline-none text-xs uppercase" 
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1B2632]/60 mb-2">Season</label>
                <div className="flex flex-wrap gap-3">
                  {['Summer', 'Winter', 'All'].map(s => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={(editedItem.season || []).includes(s)}
                        onChange={() => handleSeasonToggle(s)} 
                      />
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${(editedItem.season || []).includes(s) ? 'bg-[#A35139] border-[#A35139]' : 'border-[#1B2632]/30 bg-[#EEE9DF]/50'}`}>
                         {(editedItem.season || []).includes(s) && <div className="w-2 h-2 bg-[#EEE9DF] rounded-sm" />}
                      </div>
                      <span className="text-xs font-medium text-[#1B2632]">{s}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-6 border-t border-[#1B2632]/10 mt-2">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#1B2632]/10 hover:bg-[#1B2632]/20 text-[#1B2632] px-4 py-3 rounded-xl font-medium transition-colors text-sm"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#1B2632] hover:bg-[#1B2632]/90 text-[#EEE9DF] px-4 py-3 rounded-xl font-medium transition-colors text-sm"
                >
                  <Check className="w-4 h-4" />
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in duration-300">
              <div className="flex justify-between items-start gap-4 mb-3">
                <h2 className="text-xl sm:text-2xl font-semibold text-[#1B2632] leading-tight">{item.name}</h2>
                <div 
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full shrink-0 border border-[#1B2632]/10 shadow-sm mt-0.5" 
                  style={{ backgroundColor: item.colorHex }} 
                  title={`Color: ${item.colorHex}`}
                />
              </div>
              
              <p className="text-[#1B2632]/70 text-sm leading-relaxed mb-6">
                {item.description || 'No description available for this item.'}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A35139] bg-[#A35139]/10 px-3 py-1.5 rounded-full">
                  Worn {item.wearCount}x
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#1B2632] bg-[#1B2632]/5 px-3 py-1.5 rounded-full">
                  {item.category}
                </span>
                {item.size && (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#1B2632] bg-[#1B2632]/5 px-3 py-1.5 rounded-full">
                    Size {item.size}
                  </span>
                )}
                {item.fitProfile && (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#1B2632] bg-[#1B2632]/5 px-3 py-1.5 rounded-full">
                    {item.fitProfile} Fit
                  </span>
                )}
                {item.stance && (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#1B2632] bg-[#1B2632]/5 px-3 py-1.5 rounded-full">
                    {item.stance} Stance
                  </span>
                )}
                {item.season && item.season.map(s => (
                  <span key={s} className="text-[10px] font-bold uppercase tracking-widest text-[#1B2632] bg-[#1B2632]/5 px-3 py-1.5 rounded-full">
                    {s} Season
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-6 border-t border-[#1B2632]/10">
                <button 
                  onClick={() => setIsEditing(true)}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#1B2632]/5 hover:bg-[#1B2632]/10 text-[#1B2632] px-4 py-3 rounded-xl font-medium transition-colors text-sm"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button 
                  onClick={() => setShowDeleteConfirm(true)}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#A35139]/10 hover:bg-[#A35139]/20 text-[#A35139] px-4 py-3 rounded-xl font-medium transition-colors text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}