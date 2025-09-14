import React from 'react';
import { GameMode } from '../types';

interface MenuOption {
  label: string;
  mode: GameMode;
}

interface MenuOptionsProps {
  onSelect: (mode: GameMode) => void;
  options: MenuOption[];
}

const MenuOptions: React.FC<MenuOptionsProps> = ({ onSelect, options }) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map(({ label, mode }) => (
        <button
          key={mode}
          onClick={() => onSelect(mode)}
          className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium text-center transition-all duration-200 hover:bg-slate-100 hover:border-blue-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 text-sm"
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default MenuOptions;