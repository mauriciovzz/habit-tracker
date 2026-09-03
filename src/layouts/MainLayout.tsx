import { useEffect, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Group, Paper, Stack, Text } from "@mantine/core";
import { useMediaQuery, useViewportSize } from "@mantine/hooks";
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
        display: "flex",
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
        display: "flex",
        flexDirection: "column",
        gap: 12,
        alignItems: "center",
        justifyContent: "center",
        inset: 0,
      }}
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

interface Props {
  children: ReactNode;
}

export const MainLayout = ({ children }: Props) => {
  const { width, height } = useViewportSize();

  const isMobile = useMediaQuery("(pointer: coarse)");
  const isLandscape = width > height;

  const shouldRotate = isMobile && isLandscape;
  const shouldResize = !isMobile && height < 630;

  useEffect(() => {
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)",
    ).matches;

    if (!isStandalone) {
      return;
    }

    const hasSetInitialSize = localStorage.getItem("habit-tracker-size-set");

    if (hasSetInitialSize) {
      return;
    }

    window.resizeTo(500, 642);

    localStorage.setItem("habit-tracker-size-set", "true");
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
        w="100%"
        mah={{ base: "none", xs: 550 }}
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
        <Stack flex={1} mih={0} gap="sm" hidden={shouldRotate || shouldResize}>
          {children}
        </Stack>

        {shouldRotate && <RotateDeviceOverlay />}
        {shouldResize && <ResizeWindowOverlay />}
      </Stack>
    </Stack>
  );
};
