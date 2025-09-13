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
    <div className="grid grid-cols-2 gap-4">
      {options.map(({ label, mode }) => (
        <button
          key={mode}
          onClick={() => onSelect(mode)}
          className="button-secondary text-center text-lg font-semibold min-h-[80px] flex items-center justify-center"
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default MenuOptions;