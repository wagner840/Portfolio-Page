'use client';

import { useState, createContext, useContext } from 'react';
import { Button } from '@/components/ui/button';

// 1. Create a Context for Emo Mode
interface EmoModeContextType {
  isEmoMode: boolean;
  setIsEmoMode: (value: boolean) => void;
}

const EmoModeContext = createContext<EmoModeContextType | undefined>(undefined);

// Hook for using the EmoModeContext
export function useEmoMode() {
  const context = useContext(EmoModeContext);
  if (!context) {
    throw new Error('useEmoMode must be used within a EmoModeProvider');
  }
  return context;
}

// 2. Create a Provider Component
interface EmoModeProviderProps {
  children: React.ReactNode;
}

export function EmoModeProvider({ children }: EmoModeProviderProps) {
  const [isEmoMode, setIsEmoMode] = useState(false);

  return (
    <EmoModeContext.Provider value={{ isEmoMode, setIsEmoMode }}>
      {children}
    </EmoModeContext.Provider>
  );
}

// 3. Create the Emo Toggle Button Component
export function EmoToggleButton() {
  const { isEmoMode, setIsEmoMode } = useEmoMode();

  return (
    <Button 
      variant={isEmoMode ? 'destructive' : 'secondary'} 
      onClick={() => setIsEmoMode(!isEmoMode)}
      className={isEmoMode ? 'font-bold gothic-text' : ''}
    >
      {isEmoMode ? 'NORMAL' : 'EMO'}
    </Button>
  );
}

