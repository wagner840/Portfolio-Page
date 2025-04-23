'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface EmoModeContextType {
  isEmoMode: boolean;
  toggleEmoMode: () => void;
}

const EmoModeContext = createContext<EmoModeContextType | undefined>(undefined);

export const EmoModeProvider = ({ children }: { children: ReactNode }) => {
  const [isEmoMode, setIsEmoMode] = useState(false);

  const toggleEmoMode = () => {
    setIsEmoMode(prevMode => !prevMode);
  };

  return (
    <EmoModeContext.Provider value={{ isEmoMode, toggleEmoMode }}>
      {children}
    </EmoModeContext.Provider>
  );
};

export const useEmoMode = () => {
  const context = useContext(EmoModeContext);
  if (context === undefined) {
    throw new Error('useEmoMode must be used within an EmoModeProvider');
  }
  return context;
};
