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
    <div className="flex flex-col items-center justify-center p-4 h-full animate-fade-in">
        <h2 className="text-xl font-bold mb-2 text-slate-700 text-center">اختر شخصيتك</h2>
        <p className="text-slate-500 mb-8 text-center">من ستقود مغامرة اليوم؟</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-lg">
            {characterOptions.map(option => (
                <button 
                    key={option.char} 
                    onClick={() => onSelect(option.char)}
                    className="p-6 bg-white border border-slate-200 rounded-2xl text-slate-700 text-center transition-all duration-300 hover:shadow-xl hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    <div className={`w-16 h-16 ${option.avatarColor} rounded-full flex items-center justify-center text-3xl font-bold text-white mx-auto mb-4`}>
                        {option.name === 'كلاهما' ? 'حأ' : option.name.charAt(0)}
                    </div>
                    <h3 className="text-xl font-bold">{option.name}</h3>
                    <p className="text-sm text-slate-500 mt-1">{option.description}</p>
                </button>
            ))}
        </div>
    </div>
  );
};

export default CharacterSelector;