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
    <div className="min-h-screen w-full flex flex-col">
      <div className="w-full h-screen flex flex-col overflow-hidden">
        <header className="relative p-6 shrink-0 glass-effect grid grid-cols-3 items-center">
          <div className="justify-self-start flex items-center">
            {isChatActive && (
              <button
                onClick={handleNewChat}
                className="button-secondary text-sm"
              >
                محادثة جديدة
              </button>
            )}
          </div>
          <h1 className="text-2xl text-center font-bold text-white justify-self-center floating-animation">
            مغامرات حبيبة وأروي
          </h1>
          <div className="relative justify-self-end">
            <button
              onClick={() => setIsThemeSelectorOpen(prev => !prev)}
              className="p-3 rounded-full bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg transition-all duration-300"
              aria-label="Change theme"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
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