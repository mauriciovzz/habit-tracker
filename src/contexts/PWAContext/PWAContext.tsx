import { createContext, useContext } from "react";

interface PWAContextType {
  updateAvailable: boolean;
  updateApp: () => Promise<void>;
  checkForUpdate: () => Promise<void>;
}

export const PWAContext = createContext<PWAContextType | null>(null);

export const usePWA = () => {
  const context = useContext(PWAContext);

  if (!context) {
    throw new Error("usePWA must be used inside PWAProvider");
  }

  return context;
};
