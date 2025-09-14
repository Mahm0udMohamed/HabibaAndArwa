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
          className="p-4 bg-slate-700 border border-slate-600 rounded-xl text-white font-medium text-center transition-all duration-200 hover:bg-slate-600 hover:border-blue-400 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 text-sm"
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default MenuOptions;