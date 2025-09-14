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
      className="absolute top-full right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-slate-200 p-2 z-10 animate-slide-down"
      aria-label="Theme Selector"
      role="menu"
    >
      <ul className="space-y-1">
        {themes.map(theme => (
          <li key={theme.id}>
            <button
              onClick={() => handleSelect(theme.style)}
              className="w-full text-right flex items-center gap-3 px-3 py-2 text-sm text-slate-700 rounded-lg hover:bg-slate-100 active:bg-slate-200 transition-colors"
              role="menuitem"
            >
              <span className={`w-4 h-4 rounded-full block ${theme.style} border border-slate-300`}></span>
              <span>{theme.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSelector;
