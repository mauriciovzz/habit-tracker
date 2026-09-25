import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createTheme, MantineProvider } from "@mantine/core";
import "./i18n";

import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/carousel/styles.css";
import "./main.css";

import { HabitsProvider } from "./contexts/HabitsContext";
import { PWAProvider } from "./contexts/PWAContext";

import { MainLayout } from "./layouts/MainLayout.tsx";
import { App } from "./App.tsx";

const theme = createTheme({
  primaryColor: "gray",
});

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <MantineProvider theme={theme}>
        <MainLayout>
          <HabitsProvider>
            <PWAProvider>
              <App />
            </PWAProvider>
          </HabitsProvider>
        </MainLayout>
      </MantineProvider>
    </StrictMode>,
  );
}
