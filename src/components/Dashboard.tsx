import { Sun, Droplets, Check } from 'lucide-react';
import { ClothingItem, Outfit } from '../types';

interface DashboardProps {
  items: ClothingItem[];
  outfitOfDay: Outfit | null;
  isOutfitLogged: boolean;
  onLogOutfit: (outfitId: string) => void;
}

export function Dashboard({ items, outfitOfDay, isOutfitLogged, onLogOutfit }: DashboardProps) {
  const dirtyItemsCount = items.filter(item => item.status === 'dirty').length;
  
  // Safely find most dirty item (will be null if items array is empty)
  const mostdirtyItem = items.length > 0 ? [...items].sort((a, b) => b.wearCount - a.wearCount)[0] : null;

  const glassyCard = "bg-[#C9C1B1]/20 backdrop-blur-md border border-[#1B2632]/10 rounded-3xl";

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-[#1B2632]">Morning, Oscar.</h1>
        <p className="text-[#1B2632]/70 mt-1">Ready for the day?</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* OOTD Card */}
        <section className={`md:col-span-8 ${glassyCard} flex flex-col md:flex-row overflow-hidden p-2`}>
          {outfitOfDay ? (
            <>
              <div className="w-full md:w-1/2 aspect-square rounded-2xl overflow-hidden shrink-0">
                <img 
                  src={outfitOfDay.outfitImageUrl} 
                  alt={outfitOfDay.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#A35139] mb-2">Today's Fit</h2>
                <h3 className="text-2xl font-semibold text-[#1B2632] mb-3">{outfitOfDay.name}</h3>
                <p className="text-[#1B2632]/80 mb-6 leading-relaxed">
                  A laid-back combo that works perfectly for your classes and grabbing coffee later.
                </p>
                {/* Dynamic Button State */}
                {isOutfitLogged ? (
                  <button disabled className="bg-[#A35139] text-[#EEE9DF] px-6 py-2.5 rounded-full font-medium flex items-center gap-2 w-fit text-sm cursor-default shadow-inner">
                    <Check className="w-4 h-4" />
                    Wearing Today
                  </button>
                ) : (
                  <button 
                    onClick={() => onLogOutfit(outfitOfDay.id)}
                    className="bg-[#1B2632] text-[#EEE9DF] px-6 py-2.5 rounded-full font-medium hover:bg-[#1B2632]/90 transition-colors w-fit text-sm shadow-sm"
                  >
                    Wear This
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="w-full p-6 md:p-8 flex flex-col justify-center items-center text-center min-h-[250px]">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#A35139] mb-2">Today's Fit</h2>
              <h3 className="text-2xl font-semibold text-[#1B2632] mb-3">No Outfit Logged</h3>
              <p className="text-[#1B2632]/80 mb-6 leading-relaxed max-w-sm mx-auto">
                You haven't selected an outfit for today, and we couldn't find a fully clean suggestion.
              </p>
              <button className="bg-[#1B2632] text-[#EEE9DF] px-6 py-2.5 rounded-full font-medium hover:bg-[#1B2632]/90 transition-colors w-fit text-sm">
                Head to Canvas
              </button>
            </div>
          )}
        </section>

        <div className="md:col-span-4 flex flex-col gap-6">
          {/* Weather Widget */}
          <section className={`${glassyCard} p-6 flex items-center justify-between`}>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#1B2632]/50 mb-1">Bulawayo</h2>
              <p className="text-xl font-medium text-[#1B2632]">Sunny, 24°C</p>
            </div>
            <Sun className="w-8 h-8 text-[#A35139]" strokeWidth={1.5} />
          </section>

          {/* Laundry Alert */}
          <section className={`${glassyCard} p-6 flex-1 flex flex-col justify-center`}>
            <div className="flex items-center gap-3 mb-3">
              <Droplets className="w-6 h-6 text-[#A35139]" strokeWidth={1.5} />
              <h2 className="text-sm font-semibold text-[#1B2632]">Laundry</h2>
            </div>
            {dirtyItemsCount > 0 ? (
              <>
                <p className="text-4xl font-bold text-[#1B2632] mb-1">{dirtyItemsCount}</p>
                <p className="text-[#1B2632]/70 text-sm leading-relaxed">
                  pieces waiting to be washed. Might be time to run a load.
                </p>
              </>
            ) : (
              <p className="text-[#1B2632]/70 text-sm leading-relaxed">
                All caught up! Nothing to wash today.
              </p>
            )}
          </section>
        </div>

        {/* Safely Render Most Dirty Item */}
        {mostdirtyItem && (
          <section className={`md:col-span-12 ${glassyCard} overflow-hidden p-2 flex flex-col sm:flex-row items-center gap-6`}>
            <div className="w-full sm:w-48 md:w-64 aspect-square rounded-2xl overflow-hidden shrink-0">
              <img 
                src={mostdirtyItem.images[0]} 
                alt={mostdirtyItem.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 sm:p-6 sm:pl-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-widest text-[#A35139] mb-2">Heavy Rotation</p>
              <h3 className="text-xl font-semibold text-[#1B2632] mb-2">{mostdirtyItem.name}</h3>
              <p className="text-[#1B2632]/70 text-sm max-w-md leading-relaxed">
                You've reached for this {mostdirtyItem.wearCount} times this month. It's definitely a wardrobe staple.
              </p>
            </div>
          </section>
        )}

      </div>
    </div>
  );
}