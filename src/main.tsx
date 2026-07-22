import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { registerSW } from "virtual:pwa-register";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/dates/styles.css";
import "./i18n";
import { HabitsProvider } from "./contexts/HabitsContext";
import { App } from "./App.tsx";

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New version available.")) {
      void updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("app ready to work offline");
  },
});

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <MantineProvider>
        <HabitsProvider>
          <App />
        </HabitsProvider>
      </MantineProvider>
    </StrictMode>,
  );
}
