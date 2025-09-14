import React, { useState, useRef, useEffect, useCallback } from "react";
import { Message, Sender, GameMode, Character } from "../types";
import { startChatSession } from "../services/geminiService";
import { getDailyChallenge, MENU_OPTIONS } from "../constants";
import ChatMessage from "./ChatMessage";
import MenuOptions from "./MenuOptions";
import CharacterSelector from "./CharacterSelector";
import { Chat } from "@google/genai";

interface ChatInterfaceProps {
  onChatStart: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onChatStart }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentMode, setCurrentMode] = useState<GameMode>(GameMode.MENU);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
    setMessages([
      {
        id: Date.now(),
        text: `أهلاً بكِ في مغامرتنا! أنا مرشدك. اختاري نشاطًا من القائمة لنبدأ رحلتنا!`,
        sender: Sender.BOT,
      },
    ]);
    onChatStart();
  };

  const initiateBotConversation = useCallback(
    async (session: Chat, mode: GameMode, character: Character) => {
      setIsLoading(true);
      const botMessageId = Date.now();
      setMessages((prev) => [
        ...prev,
        { id: botMessageId, text: "", sender: Sender.BOT },
      ]);

      try {
        let initialPrompt = "ابدأ الحوار الآن.";
        if (mode === GameMode.CHALLENGE) {
          const challenge = getDailyChallenge();
          initialPrompt = `ابدأ حوار تحدي اليوم عن "${challenge.title}".`;
        }
        const stream = await session.sendMessageStream({
          message: initialPrompt,
        });

        let fullResponse = "";
        for await (const chunk of stream) {
          fullResponse += chunk.text ?? "";
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === botMessageId ? { ...msg, text: fullResponse } : msg
            )
          );
        }
      } catch (error) {
        console.error("Error initiating conversation:", error);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId
              ? { ...msg, text: "حدث خطأ في النظام. حاول إعادة تشغيل الوضع." }
              : msg
          )
        );
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleModeSelect = useCallback(
    (mode: GameMode) => {
      if (!selectedCharacter) return;

      setCurrentMode(mode);
      const newSession = startChatSession(mode, selectedCharacter);
      setChatSession(newSession);

      if (newSession) {
        initiateBotConversation(newSession, mode, selectedCharacter);
      }
    },
    [selectedCharacter, initiateBotConversation]
  );

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading || !chatSession || !selectedCharacter)
      return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: Sender.USER,
      character: selectedCharacter,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    const botMessageId = Date.now() + 1;
    setMessages((prev) => [
      ...prev,
      { id: botMessageId, text: "", sender: Sender.BOT },
    ]);

    try {
      const stream = await chatSession.sendMessageStream({
        message: userMessage.text,
      });
      let fullResponse = "";
      for await (const chunk of stream) {
        fullResponse += chunk.text ?? "";
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId ? { ...msg, text: fullResponse } : msg
          )
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? { ...msg, text: "حدث خطأ في الإرسال." }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    if (!selectedCharacter) {
      return <CharacterSelector onSelect={handleCharacterSelect} />;
    }
    if (currentMode === GameMode.MENU) {
      const availableOptions =
        selectedCharacter === Character.Both
          ? MENU_OPTIONS
          : MENU_OPTIONS.filter(
              (option) => option.mode !== GameMode.SPEED_CHALLENGE
            );

      return (
        <div className="flex flex-col gap-6">
          <MenuOptions onSelect={handleModeSelect} options={availableOptions} />
        </div>
      );
    }
    return (
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`اكتب رسالتك كـ "${selectedCharacter}"...`}
          className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-slate-600 transition-all duration-200 text-white placeholder-slate-400 text-sm"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-full w-11 h-11 flex items-center justify-center hover:bg-blue-600 active:scale-95 disabled:opacity-50 disabled:bg-slate-400 transition-all duration-200 shadow-sm"
          disabled={isLoading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </button>
      </form>
    );
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-pattern-bubbles min-h-0">
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3 overscroll-contain">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            activeCharacter={selectedCharacter}
          />
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="shrink-0 p-4 pb-safe-bottom bg-white border-t border-slate-100">
        <div className="shrink-0 p-4 pb-safe-bottom bg-slate-800 border-t border-slate-700">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
