"use client";

import { useEmoMode } from "@/components/emo-toggle-button";

interface EmoModeWrapperProps {
  children: React.ReactNode;
}

export default function EmoModeWrapper({ children }: EmoModeWrapperProps) {
  const { isEmoMode } = useEmoMode();

  return (
    <div className={isEmoMode ? "emo-mode-active" : ""}>
      {children}
    </div>
  );
}
