import { Stack } from "@mantine/core";
import { SettingsButton } from "./SettingsButton";
import { IconFileDownload, IconFileUpload, IconTrash } from "@tabler/icons-react";

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
  return (
    <Stack p="md">
      <Stack w="100%" h="100%" gap="md">
        <SettingsButton
          icon={IconFileDownload}
          header="Download app data"
          description="Get your data to use it in other devices"
          onClick={downloadData}
        />
        <SettingsButton
          icon={IconFileUpload}
          header="Upload new app Data"
          description="Replace the data in this device"
          onClick={openUpload}
        />
        <SettingsButton
          icon={IconTrash}
          header="Delete app Data"
          description="Erase all habit data from this device"
          onClick={openDelete}
        />
      </Stack>
    </Stack>
  );
};
