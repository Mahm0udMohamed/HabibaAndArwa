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
    <div className="flex flex-col items-center justify-center h-full fade-in">
        <h2 className="text-2xl font-bold mb-3 text-white text-center">اختر شخصيتك</h2>
        <p className="text-white text-opacity-80 mb-8 text-center text-lg">من ستقود مغامرة اليوم؟</p>
        <div className="grid grid-cols-1 gap-6 w-full">
            {characterOptions.map(option => (
                <button 
                    key={option.char} 
                    onClick={() => onSelect(option.char)}
                    className="glass-effect p-6 rounded-3xl text-white text-center transition-all duration-300 active:bg-white active:bg-opacity-30"
                >
                    <div className={`w-20 h-20 ${option.avatarColor} rounded-full flex items-center justify-center text-4xl font-bold text-white mx-auto mb-4 avatar-circle`}>
                        {option.name === 'كلاهما' ? 'حأ' : option.name.charAt(0)}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{option.name}</h3>
                    <p className="text-white text-opacity-80">{option.description}</p>
                </button>
            ))}
        </div>
    </div>
  );
};

export default CharacterSelector;