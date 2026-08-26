import { useCallback, type ReactNode } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

import { PWAContext } from "./PWAContext";

export const PWAProvider = ({ children }: { children: ReactNode }) => {
  const {
    needRefresh: [updateAvailable],
    updateServiceWorker,
  } = useRegisterSW();

  const checkForUpdate = useCallback(async () => {
    const registration = await navigator.serviceWorker.getRegistration();

    if (registration) {
      await registration.update();
    }
  }, []);

  const updateApp = useCallback(async () => {
    await updateServiceWorker(true);
  }, [updateServiceWorker]);

  return (
    <PWAContext.Provider
      value={{
        updateAvailable,
        checkForUpdate,
        updateApp,
      }}
    >
      {children}
    </PWAContext.Provider>
  );
};
