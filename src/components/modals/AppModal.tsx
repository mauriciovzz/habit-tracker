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
      styles={{
        inner: {
          padding: "12px 12px 34px 12px",
          display: "flex",
          alignItems: isMobile ? "flex-end" : undefined,
        },
        content: {
          marginInline: isMobile ? 12 : 0,
          maxHeight: "calc(100dvh - 24px)",
        },
      }}
    >
      <Modal.Overlay
        backgroundOpacity={0.5}
        blur={2.5}
        transitionProps={{
          duration: 0,
        }}
      />

      <Modal.Content
        radius="lg"
        transitionProps={{
          transition: isMobile ? "slide-up" : "pop",
          duration: 300,
          exitDuration: 300,
          timingFunction: "linear",
        }}
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
