import React from 'react';
import { Message, Sender, Character } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface ChatMessageProps {
  message: Message;
  activeCharacter: Character | null;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, activeCharacter }) => {
  const isBot = message.sender === Sender.BOT;

  const getCharacterAvatar = (character: Character) => {
    let avatarText = '?';
    let bgColor = 'bg-sky-500';
    
    switch (character) {
      case Character.Habiba:
        avatarText = 'ح';
        bgColor = 'bg-pink-500';
        break;
      case Character.Arwa:
        avatarText = 'أ';
        bgColor = 'bg-amber-500';
        break;
      case Character.Both:
        avatarText = 'ح/أ';
        bgColor = 'bg-teal-500';
        break;
    }

    return (
      <div className={`w-10 h-10 ${bgColor} rounded-full flex items-center justify-center text-white font-bold text-lg mr-3 shrink-0`}>
        {avatarText}
      </div>
    );
  };
  
  const botAvatarElement = () => {
    if (!activeCharacter) {
      return (
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg ml-3 shrink-0">
          م
        </div>
      );
    }
    
    let avatarText = '?';
    let bgColor = 'bg-blue-500';
    
    switch (activeCharacter) {
      case Character.Habiba:
        avatarText = 'ح';
        bgColor = 'bg-pink-500';
        break;
      case Character.Arwa:
        avatarText = 'أ';
        bgColor = 'bg-amber-500';
        break;
      case Character.Both:
        avatarText = 'ح/أ';
        bgColor = 'bg-teal-500';
        break;
    }

    return (
      <div className={`w-10 h-10 ${bgColor} rounded-full flex items-center justify-center text-white font-bold text-lg ml-3 shrink-0`}>
        {avatarText}
      </div>
    );
  }

  return (
    <div className={`flex items-end gap-2 ${isBot ? 'justify-start' : 'justify-end'} px-1`}>
      {isBot && botAvatarElement()}
      <div
        className={`max-w-[85%] px-3 py-2 whitespace-pre-wrap text-sm leading-relaxed ${
          isBot ? 'bg-slate-700 text-white rounded-r-2xl rounded-bl-2xl rounded-tl-md' : 'bg-blue-500 text-white rounded-l-2xl rounded-br-2xl rounded-tr-md'
        }`}
      >
        {isBot && !message.text ? <LoadingSpinner /> : message.text}
      </div>
      {!isBot && message.character && getCharacterAvatar(message.character)}
    </div>
  );
};

export default ChatMessage;