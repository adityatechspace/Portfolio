import { createContext, useContext, useState, useCallback } from "react";

const AIAssistantContext = createContext(null);

export function AIAssistantProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openAI = useCallback(() => setIsOpen(true), []);
  const closeAI = useCallback(() => setIsOpen(false), []);
  const toggleAI = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <AIAssistantContext.Provider value={{ isOpen, openAI, closeAI, toggleAI }}>
      {children}
    </AIAssistantContext.Provider>
  );
}

export function useAIAssistant() {
  const ctx = useContext(AIAssistantContext);
  if (!ctx) {
    throw new Error("useAIAssistant must be used within an AIAssistantProvider");
  }
  return ctx;
}
