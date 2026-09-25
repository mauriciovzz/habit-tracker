import { useEffect, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Group, Paper, Stack, Text } from "@mantine/core";
import {
  IconDeviceMobileRotated,
  IconArrowNarrowRightDashed,
  IconDeviceMobile,
  IconArrowAutofitHeight,
} from "@tabler/icons-react";

const RotateDeviceOverlay = () => {
  const { t } = useTranslation();

  return (
    <Paper
      pos="fixed"
      bdrs={0}
      style={{
        zIndex: 99999,
        display: "none",
        flexDirection: "column",
        gap: 12,
        alignItems: "center",
        justifyContent: "center",
        inset: 0,
      }}
      className="rotate-device-overlay"
    >
      <Group gap="md">
        <IconDeviceMobileRotated size={32} />
        <IconArrowNarrowRightDashed />
        <IconDeviceMobile size={32} />
      </Group>

      <Stack gap={0}>
        <Text flex={1} ta="center" fw={700}>
          {t("rotate")}
        </Text>
        <Text flex={1} ta="center">
          {t("rotateDesc")}
        </Text>
      </Stack>
    </Paper>
  );
};

const ResizeWindowOverlay = () => {
  const { t } = useTranslation();

  return (
    <Paper
      pos="fixed"
      bdrs={0}
      style={{
        zIndex: 99999,
        display: "none",
        flexDirection: "column",
        gap: 12,
        alignItems: "center",
        justifyContent: "center",
        inset: 0,
      }}
      className="resize-window-overlay"
    >
      <IconArrowAutofitHeight size={32} />

      <Stack gap={0}>
        <Text flex={1} ta="center" fw={700}>
          {t("windowHeight")}
        </Text>
        <Text flex={1} ta="center">
          {t("windowHeightDesc")}
        </Text>
      </Stack>
    </Paper>
  );
};

const TARGET_WIDTH = 500;
const TARGET_HEIGHT = 630;
const TOLERANCE = 2;

const initializeDesktopWindow = () => {
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches;

  if (!isStandalone) {
    console.log("not standalone");
    return;
  }

  const isDesktop = window.matchMedia("(min-width: 481px)").matches;

  if (!isDesktop) {
    return;
  }

  if (localStorage.getItem("ht-window-initialized") === "true") {
    return;
  }

  const widthDifference = TARGET_WIDTH - window.innerWidth;
  const heightDifference = TARGET_HEIGHT - window.innerHeight;

  if (widthDifference !== 0 || heightDifference !== 0) {
    window.resizeBy(widthDifference, heightDifference);
  }

  requestAnimationFrame(() => {
    const widthCorrect =
      Math.abs(window.innerWidth - TARGET_WIDTH) <= TOLERANCE;

    const heightCorrect =
      Math.abs(window.innerHeight - TARGET_HEIGHT) <= TOLERANCE;

    if (widthCorrect && heightCorrect) {
      localStorage.setItem("ht-window-initialized", "true");
    }
  });
};

interface Props {
  children: ReactNode;
}

export const MainLayout = ({ children }: Props) => {
  useEffect(() => {
    initializeDesktopWindow();
  }, []);

  return (
    <Stack
      w="100%"
      h="100dvh"
      gap={0}
      justify="center"
      align="center"
      pos="relative"
      style={{ overflow: "hidden" }}
      className="mobile-padding"
    >
      <Stack
        h="100%"
        mah={{ base: "none", xs: 550 }}
        w="100%"
        maw={{ base: "none", xs: 400 }}
        gap="sm"
        p={{ base: 0, xs: "sm" }}
        bd={{
          base: "none",
          xs: "1px solid var(--mantine-color-default-border)",
        }}
        bdrs={{ base: 0, xs: "lg" }}
        pos="relative"
        style={{
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        <Stack flex={1} mih={0} gap="sm" className="app-content">
          {children}
        </Stack>

        <RotateDeviceOverlay />

        <ResizeWindowOverlay />
      </Stack>
    </Stack>
  );
};
