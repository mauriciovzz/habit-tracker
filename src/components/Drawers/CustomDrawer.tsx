import { Drawer } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import React, { type ReactElement } from "react";

interface InjectedProps {
  isMobile: boolean;
  drawerButtonWidth: number;
  drawerBodyHeight: number;
}

interface CustomDrawerProps<P> {
  opened: boolean;
  isMobile: boolean | undefined;
  children: ReactElement<P>;
}

export function CustomDrawer<P>({
  opened,
  isMobile,
  children,
}: CustomDrawerProps<P & InjectedProps>) {
  const { width: vpWidth, height: vpHeight } = useViewportSize();

  const finalWidth = isMobile ? vpWidth : vpWidth * 0.4;
  const drawerButtonWidth = (finalWidth - 32) / 7;
  const drawerBodyHeight = isMobile ? vpHeight * 0.96 : vpHeight;

  return (
    <Drawer.Root
      opened={opened}
      onClose={() => {
        return null;
      }}
      closeOnClickOutside={false}
      closeOnEscape={false}
      position={isMobile ? "bottom" : "right"}
      size={isMobile ? "96%" : "40%"}
      radius={isMobile ? "16px 16px 0 0" : "16px 0 0 16px"}
      transitionProps={{
        transition: isMobile ? "slide-up" : "slide-left",
        duration: 250,
        timingFunction: "linear",
      }}
    >
      <Drawer.Overlay />

      <Drawer.Content w="100%">
        {React.cloneElement(children, {
          isMobile,
          drawerButtonWidth,
          drawerBodyHeight,
        } as unknown as Partial<P>)}
      </Drawer.Content>
    </Drawer.Root>
  );
}
