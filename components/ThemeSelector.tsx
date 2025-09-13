import React from 'react';
import { Theme } from '../types';

interface ThemeSelectorProps {
  themes: Theme[];
  onSelect: (themeStyle: string) => void;
  onClose: () => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ themes, onSelect, onClose }) => {
  const handleSelect = (style: string) => {
    onSelect(style);
    onClose();
  };

  return (
    <div 
      className="absolute top-full left-0 mt-3 w-56 theme-selector p-4 z-10 fade-in"
      aria-label="Theme Selector"
      role="menu"
    >
      <ul className="space-y-3">
        {themes.map(theme => (
          <li key={theme.id}>
            <button
              onClick={() => handleSelect(theme.style)}
              className="w-full text-right flex items-center gap-4 px-4 py-3 text-gray-700 rounded-xl transition-all duration-300 active:bg-gray-100"
              role="menuitem"
            >
              <span className={`w-6 h-6 rounded-full block ${theme.style} border-2 border-gray-300`}></span>
              <span className="font-medium">{theme.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSelector;
