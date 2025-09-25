import { Stack } from "@mantine/core";
import { SettingsButton } from "./SettingsButton";
import { IconArrowsShuffle, IconFolderDown } from "@tabler/icons-react";
import type { SettingsView } from "../../../types";

export const MainWindow = ({
  setView,
}: {
  setView: React.Dispatch<React.SetStateAction<SettingsView>>;
}) => {
  return (
    <Stack flex={1} p="md" gap="md">
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
};
