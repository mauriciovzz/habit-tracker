import { Drawer, Modal } from "@mantine/core";
import type { ReactNode } from "react";

interface OverlayProps {
  isMobile: boolean;
  opened: boolean;
  close: () => void;
  children: ReactNode;
}

export const Overlay = ({ isMobile, opened, close, children }: OverlayProps) => {
  return isMobile ? (
    <Drawer
      opened={opened}
      onClose={close}
      position="bottom"
      size="96%"
      radius="16px 16px 0 0"
      transitionProps={{
        transition: "slide-up",
        duration: 250,
        timingFunction: "linear",
      }}
    >
      {children}
    </Drawer>
  ) : (
    <Modal opened={opened} onClose={close}>
      {children}
    </Modal>
  );
};
