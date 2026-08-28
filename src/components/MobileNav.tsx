import { Home, Shirt, Layers, Droplets, Calendar } from 'lucide-react';

interface MobileNavProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export function MobileNav({ currentView, onViewChange }: MobileNavProps) {
  const navItems = [
    { icon: Home, label: 'Home', id: 'home' },
    { icon: Shirt, label: 'Wardrobe', id: 'wardrobe' },
    { icon: Layers, label: 'Builder', id: 'builder' },
    { icon: Calendar, label: 'Calendar', id: 'calendar' },
    { icon: Droplets, label: 'Laundry', id: 'laundry' },
  ];

  return (
    <nav className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-sm rounded-full backdrop-blur-md bg-[#C9C1B1]/70 border border-white/20 z-50 flex justify-around items-center p-3 shadow-lg">
      {navItems.map((item, index) => (
        <button 
          key={index}
          onClick={() => onViewChange(item.id)}
          className={`p-3 rounded-full transition-colors ${currentView === item.id ? 'bg-[#A35139] text-[#EEE9DF]' : 'text-[#1B2632]'}`}
          aria-label={item.label}
        >
          <item.icon className="w-6 h-6" />
        </button>
      ))}
    </nav>
  );
}