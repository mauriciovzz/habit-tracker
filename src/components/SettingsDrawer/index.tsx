import { useState } from "react";
import { Drawer, Stack, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { TextButton } from "../TextButton";
import { HabitReorderWindow } from "./HabitReorderWindow";
import type { Habit } from "../../types";
import { DataManagementWindow } from "./DataManagementWindow";
import { IconArrowsShuffle, IconFolderDown } from "@tabler/icons-react";
import { SettingsButton } from "./SettingsButton";

interface SettingsDrawerProps {
  habits: Habit[];
  opened: boolean;
  themeTextColor: string;
  themeBorderColor: string;
  onClose: () => void;
}

type DrawerView = "menu" | "reorder" | "data";

export const SettingsDrawer = ({
  habits,
  opened,
  themeTextColor,
  themeBorderColor,
  onClose,
}: SettingsDrawerProps) => {
  const { width } = useViewportSize();
  const buttonsWidth = (width - 32) / 7;
  const [view, setView] = useState<DrawerView | null>(null);

  const closeDrawer = () => {
    onClose();

    setTimeout(() => {
      setView("menu");
    }, 200);
  };

  const closeSettings = () => {
    onClose();
    setView(null);
  };

  const renderTitle = () => {
    switch (view) {
      case "reorder":
        return "Reorder Habis";
      case "data":
        return "Manage Data";
      default:
        return "Settings";
    }
  };

  const renderBody = () => {
    switch (view) {
      case "reorder":
        return <HabitReorderWindow originalHabits={habits} />;
      case "data":
        return <DataManagementWindow closeSettings={closeSettings} />;
      default:
        return (
          <Stack w="100%" h="100%" p="md" gap="md">
            <SettingsButton
              icon={IconArrowsShuffle}
              header="Reorder Habits"
              description="change the order of  your habits"
              onClick={() => {
                setView("reorder");
              }}
            />
            <SettingsButton
              icon={IconFolderDown}
              header="Manage Data"
              description="Download, upload or delete app data"
              onClick={() => {
                setView("data");
              }}
            />
          </Stack>
        );
    }
  };

  return (
    <Drawer.Root
      opened={opened}
      onClose={closeDrawer}
      position="bottom"
      size="96%"
      radius="16px 16px 0 0"
      transitionProps={{
        transition: "slide-up",
        duration: 250,
        timingFunction: "linear",
      }}
    >
      <Drawer.Overlay />

      <Drawer.Content>
        <Drawer.Header p="md" style={{ borderBottom: `1px solid ${themeBorderColor}` }}>
          <Text flex={1} size="xl" inline lineClamp={2} fw={500} ta="left">
            {renderTitle()}
          </Text>
          <TextButton
            text="Back"
            width={buttonsWidth}
            onClick={
              view === null
                ? onClose
                : () => {
                    setView(null);
                  }
            }
            customColor={themeTextColor}
          />
        </Drawer.Header>

        <Drawer.Body p={0}>{renderBody()}</Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};
