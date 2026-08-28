import { Home, Shirt, Layers, Droplets, Calendar } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems = [
    { icon: Home, label: 'Home', id: 'home' },
    { icon: Shirt, label: 'Wardrobe', id: 'wardrobe' },
    { icon: Layers, label: 'Builder', id: 'builder' },
    { icon: Calendar, label: 'Calendar', id: 'calendar' },
    { icon: Droplets, label: 'Laundry', id: 'laundry' },
  ];

  return (
    <aside 
      className={`hidden md:flex flex-col bg-[#C9C1B1] h-screen transition-all duration-300 ${isExpanded ? 'w-64' : 'w-20'} fixed left-0 top-0 z-50 overflow-hidden border-r border-white/10`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="p-6 flex items-center h-20">
        <div className="w-8 h-8 rounded-full bg-[#1B2632] flex-shrink-0 flex items-center justify-center text-[#EEE9DF] font-bold">
          C
        </div>
        <span className={`ml-4 font-semibold text-[#1B2632] whitespace-nowrap transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
          Closet App
        </span>
      </div>
      
      <nav className="flex-1 px-4 py-8 space-y-4">
        {navItems.map((item, index) => (
          <button 
            key={index}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center p-3 rounded-xl transition-colors ${currentView === item.id ? 'bg-[#EEE9DF] text-[#A35139]' : 'text-[#1B2632] hover:bg-[#EEE9DF]/50'}`}
          >
            <item.icon className="w-6 h-6 flex-shrink-0" />
            <span className={`ml-4 font-medium whitespace-nowrap transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </aside>
  );
}