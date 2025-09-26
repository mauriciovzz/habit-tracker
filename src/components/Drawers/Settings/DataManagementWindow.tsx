import { Stack } from "@mantine/core";
import { SettingsButton } from "./SettingsButton";
import { IconFileDownload, IconFileUpload, IconTrash } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

interface DataManagementWindowProps {
  downloadData: () => void;
  openDelete: () => void;
  openUpload: () => void;
}

export const DataManagementWindow = ({
  downloadData,
  openDelete,
  openUpload,
}: DataManagementWindowProps) => {
  const { t } = useTranslation();

  return (
    <Stack p="md">
      <Stack w="100%" h="100%" gap="md">
        <SettingsButton
          icon={IconFileDownload}
          header={t("downloadData")}
          description={t("downloadDataPrompt")}
          onClick={downloadData}
        />
        <SettingsButton
          icon={IconFileUpload}
          header={t("uploadData")}
          description={t("uploadDataPrompt")}
          onClick={openUpload}
        />
        <SettingsButton
          icon={IconTrash}
          header={t("deleteData")}
          description={t("DeleteDataPrompt")}
          onClick={openDelete}
        />
      </Stack>
    </Stack>
  );
};
