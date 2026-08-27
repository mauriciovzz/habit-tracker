import type { ReactNode } from "react";
import { t } from "i18next";
import { Group, Paper, Stack, Text } from "@mantine/core";
import {
  IconDeviceMobileRotated,
  IconArrowNarrowRightDashed,
  IconDeviceMobile,
} from "@tabler/icons-react";

const RotateDeviceOverlay = () => (
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

interface Props {
  children: ReactNode;
}

export const MainLayout = ({ children }: Props) => (
  <Stack
    w="100%"
    h="100dvh"
    gap={0}
    p="12px 12px 34px 12px"
    justify="center"
    align="center"
    pos="relative"
    style={{ overflow: "hidden" }}
  >
    <Stack
      h="100%"
      w="100%"
      mah={{ base: "none", xs: 500 }}
      maw={500}
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
    </Stack>
  </Stack>
);
