import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import ThemeSelector from './components/ThemeSelector';
import { THEMES } from './constants';

const App: React.FC = () => {
  const [chatKey, setChatKey] = useState(0);
  const [isChatActive, setIsChatActive] = useState(false);
  const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<string>(THEMES[0].style);

  const handleNewChat = () => {
    setIsChatActive(false);
    setIsThemeSelectorOpen(false);
    setChatKey(prevKey => prevKey + 1);
  };

  const handleChatStart = () => {
    setIsChatActive(true);
  };

  const handleThemeSelect = (themeStyle: string) => {
    setCurrentTheme(themeStyle);
  };

  return (
    <div className="h-full w-full bg-slate-50 flex flex-col overflow-hidden safe-area">
      <div className="flex-1 flex flex-col bg-white">
        <header className="relative px-4 py-safe-3 pt-safe-top shrink-0 border-b border-slate-200 bg-white grid grid-cols-3 items-center shadow-sm z-10">
          <div className="justify-self-start">
            {isChatActive && (
              <button
                onClick={handleNewChat}
                className="px-3 py-1.5 bg-blue-500 text-white rounded-full active:bg-blue-600 transition-colors text-sm font-medium touch-manipulation"
              >
                محادثة جديدة
              </button>
            )}
          </div>
          <h1 className="text-lg text-center font-bold text-slate-800 justify-self-center truncate">
            مغامرات حبيبة وأروي
          </h1>
          <div className="relative justify-self-end">
            <button
              onClick={() => setIsThemeSelectorOpen(prev => !prev)}
              className="p-2 rounded-full active:bg-slate-200 transition-colors touch-manipulation"
              aria-label="Change theme"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-slate-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-6.364-.386 1.591-1.591M3 12h2.25m.386-6.364 1.591 1.591M12 12a2.25 2.25 0 0 0-2.25 2.25 2.25 2.25 0 0 0 2.25 2.25c.132 0 .263-.012.39-.035a2.25 2.25 0 0 0 1.86-2.215A2.25 2.25 0 0 0 12 12Z" />
              </svg>
            </button>
            {isThemeSelectorOpen && (
              <ThemeSelector 
                themes={THEMES} 
                onSelect={handleThemeSelect} 
                onClose={() => setIsThemeSelectorOpen(false)}
              />
            )}
          </div>
        </header>
        <ChatInterface 
          key={chatKey} 
          onChatStart={handleChatStart}
          backgroundClass={currentTheme}
        />
      </div>
    </div>
  );
};

export default App;