import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';

const App: React.FC = () => {
  const [chatKey, setChatKey] = useState(0);
  const [isChatActive, setIsChatActive] = useState(false);

  const handleNewChat = () => {
    setIsChatActive(false);
    setChatKey(prevKey => prevKey + 1);
  };

  const handleChatStart = () => {
    setIsChatActive(true);
  };

  return (
    <div className="h-full w-full bg-slate-900 flex flex-col overflow-hidden safe-area">
      <div className="flex-1 flex flex-col bg-slate-900">
        <header className="relative px-4 py-safe-3 pt-safe-top shrink-0 border-b border-slate-700 bg-slate-800 flex items-center justify-between shadow-sm z-10">
          <div className="w-20 flex justify-start">
            {isChatActive && (
              <button
                onClick={handleNewChat}
                className="px-3 py-1.5 bg-blue-500 text-white rounded-full active:bg-blue-600 transition-colors text-sm font-medium touch-manipulation"
              >
                محادثة جديدة
              </button>
            )}
          </div>
          <h1 className="text-lg font-bold text-white absolute left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-sm">
            مغامرات حبيبة وأروي
          </h1>
          <div className="w-20"></div>
        </header>
        <ChatInterface 
          key={chatKey} 
          onChatStart={handleChatStart}
        />
      </div>
    </div>
  );
};

export default App;