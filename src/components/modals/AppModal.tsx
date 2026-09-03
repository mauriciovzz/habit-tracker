import { type ReactNode } from "react";

import { Modal, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

interface Props {
  opened: boolean;
  onClose: () => void;
  children: ReactNode;
  height?: string | number;
}

export const AppModal = ({ opened, onClose, height, children }: Props) => {
  const isMobile = useMediaQuery(`(max-width: 30em)`);

  return (
    <Modal.Root
      opened={opened}
      onClose={onClose}
      centered={!isMobile}
      trapFocus={false}
      transitionProps={{
        transition: isMobile ? "slide-up" : "pop",
        duration: 300,
        exitDuration: 300,
        timingFunction: "linear",
      }}
      styles={{
        inner: {
          display: "flex",
          alignItems: isMobile ? "flex-end" : undefined,
        },
        content: {
          marginInline: isMobile ? 12 : 0,
          maxHeight: "calc(100dvh - 24px)",
        },
      }}
      classNames={{
        inner: "mobile-padding",
      }}
    >
      <Modal.Overlay
        backgroundOpacity={0.5}
        blur={5}
        bdrs={isMobile ? "16px 16px 0 0" : undefined}
      />

      <Modal.Content
        radius="lg"
        bd="1px solid var(--mantine-color-default-border)"
      >
        <Modal.Body p="sm">
          <Stack h={height ?? undefined} gap="sm">
            {children}
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};
