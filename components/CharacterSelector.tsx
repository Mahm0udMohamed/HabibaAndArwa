import React from 'react';
import { Character } from '../types';

interface CharacterSelectorProps {
  onSelect: (character: Character) => void;
}

const characterOptions = [
  { 
    char: Character.Habiba, 
    name: 'حبيبة', 
    description: 'شخصية كوميدية ومرحة.',
    avatarColor: 'bg-pink-500',
  },
  { 
    char: Character.Arwa, 
    name: 'أروي', 
    description: 'شخصية مغامرة وحكيمة.',
    avatarColor: 'bg-amber-500',
  },
  { 
    char: Character.Both, 
    name: 'كلاهما', 
    description: 'العب بالثنائي الديناميكي.',
    avatarColor: 'bg-teal-500',
  },
];

const CharacterSelector: React.FC<CharacterSelectorProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 animate-fade-in">
        <h2 className="text-lg font-bold mb-2 text-white text-center">اختر شخصيتك</h2>
        <p className="text-slate-400 mb-6 text-center text-sm">من ستقود مغامرة اليوم؟</p>
        <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
            {characterOptions.map(option => (
                <button 
                    key={option.char} 
                    onClick={() => onSelect(option.char)}
                    className="p-4 bg-slate-700 border border-slate-600 rounded-xl text-white text-center transition-all duration-200 hover:bg-slate-600 hover:border-blue-400 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    <div className={`w-12 h-12 ${option.avatarColor} rounded-full flex items-center justify-center text-xl font-bold text-white mx-auto mb-3`}>
                        {option.name === 'كلاهما' ? 'ح/أ' : option.name.charAt(0)}
                    </div>
                    <h3 className="text-lg font-bold">{option.name}</h3>
                    <p className="text-xs text-slate-400 mt-1">{option.description}</p>
                </button>
            ))}
        </div>
    </div>
  );
};

export default CharacterSelector;