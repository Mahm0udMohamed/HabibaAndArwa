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
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-2">
      {options.map(({ label, mode }) => (
        <button
          key={mode}
          onClick={() => onSelect(mode)}
          className="p-4 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold text-center transition-all duration-300 hover:shadow-lg hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default MenuOptions;