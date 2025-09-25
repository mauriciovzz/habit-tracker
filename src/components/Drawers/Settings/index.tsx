import { useState } from "react";
import { Box, Stack, Text, Flex } from "@mantine/core";
import { TextButton } from "../../Buttons/TextButton";
import { HabitReorderWindow } from "./HabitReorderWindow";
import type { Habit } from "../../../types";
import { DataManagementWindow } from "./DataManagementWindow";
import { IconArrowsShuffle, IconFolderDown } from "@tabler/icons-react";
import { SettingsButton } from "./SettingsButton";

type DrawerView = "menu" | "reorder" | "data";

interface SettingsProps {
  habits: Habit[];
  onClose: () => void;
  themeTextColor: string;
  themeBorderColor: string;
  drawerButtonWidth?: number;
}

export const Settings = ({
  habits,
  onClose,
  themeTextColor,
  themeBorderColor,
  drawerButtonWidth,
}: SettingsProps) => {
  const [view, setView] = useState<DrawerView | null>(null);

  const buttonsWidth = drawerButtonWidth ?? 0;

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
    <Box>
      <Flex
        p="md"
        h="80px"
        align="center"
        style={{ borderBottom: `1px solid ${themeBorderColor}` }}
      >
        <Text flex={1} size="xl" inline lineClamp={2} fw={500} ta="left">
          {renderTitle()}
        </Text>
        <TextButton
          text="Back"
          width={buttonsWidth}
          onClick={
            view === null
              ? closeDrawer
              : () => {
                  setView(null);
                }
          }
          customColor={themeTextColor}
        />
      </Flex>

      <Box p={0}>{renderBody()}</Box>
    </Box>
  );
};
