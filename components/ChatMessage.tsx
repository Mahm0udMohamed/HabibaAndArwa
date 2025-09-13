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
        avatarText = 'حأ';
        bgColor = 'bg-teal-500';
        break;
    }

    return (
      <div className={`avatar-circle ${bgColor} mr-4 shrink-0`}>
        {avatarText}
      </div>
    );
  };
  
  const botAvatarElement = () => {
    if (!activeCharacter) {
      return (
        <div className="avatar-circle bg-blue-500 ml-4 shrink-0">
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
        avatarText = 'حأ';
        bgColor = 'bg-teal-500';
        break;
    }

    return (
      <div className={`avatar-circle ${bgColor} ml-4 shrink-0`}>
        {avatarText}
      </div>
    );
  }

  return (
    <div className={`flex items-end ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot && botAvatarElement()}
      <div
        className={`max-w-[75%] px-6 py-4 whitespace-pre-wrap text-lg leading-relaxed ${
          isBot ? 'chat-bubble-bot' : 'chat-bubble-user'
        }`}
      >
        {isBot && !message.text ? <LoadingSpinner /> : message.text}
      </div>
      {!isBot && message.character && getCharacterAvatar(message.character)}
    </div>
  );
};

export default ChatMessage;