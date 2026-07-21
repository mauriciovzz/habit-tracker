import { Stack } from "@mantine/core";
import { SettingsButton } from "./SettingsButton";
import {
  IconArrowsShuffle,
  IconFolderDown,
  IconMessageLanguage,
} from "@tabler/icons-react";
import type { SettingsView } from "../../../types";
import { useTranslation } from "react-i18next";

export const MainWindow = ({
  setView,
  toggleLenguage,
}: {
  setView: React.Dispatch<React.SetStateAction<SettingsView>>;
  toggleLenguage: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <Stack flex={1} p="md" gap="md">
      <SettingsButton
        icon={IconArrowsShuffle}
        header={t("reorderHabits")}
        description={t("reorderHabitsPrompt")}
        onClick={() => {
          setView("reorder");
        }}
      />
      <SettingsButton
        icon={IconFolderDown}
        header={t("manageData")}
        description={t("manageDataPrompt")}
        onClick={() => {
          setView("data");
        }}
      />
      <SettingsButton
        icon={IconMessageLanguage}
        header={t("toggleLenguage")}
        description={t("toggleLenguagePrompt")}
        onClick={() => {
          toggleLenguage();
        }}
      />
    </Stack>
  );
};
