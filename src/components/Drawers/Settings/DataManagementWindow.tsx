import { Divider, FileInput, Modal, Stack, Text } from "@mantine/core";
import { SettingsButton } from "./SettingsButton";
import { IconFileDownload, IconFileUpload, IconTrash } from "@tabler/icons-react";
import { useHabits } from "../../../contexts/HabitsContext";
import { ConfirmationModal } from "../../ConfirmationModal";
import { useDisclosure } from "@mantine/hooks";
import { ButtonGroup } from "../../Buttons/ButtonGroup";
import { useState } from "react";

interface UploadModalProps {
  opened: boolean;
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  onConfirm: () => void;
  onCancel: () => void;
}

const UploadModal = ({ opened, file, setFile, onConfirm, onCancel }: UploadModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={onCancel}
      radius="lg"
      withCloseButton={false}
      transitionProps={{
        transition: "fade-up",
        duration: 250,
        timingFunction: "linear",
      }}
      withinPortal={false}
      zIndex={2000}
      styles={{ content: { alignSelf: "flex-end" } }}
    >
      <Divider
        label="Select a JSON File"
        labelPosition="center"
        mb="7"
        styles={{ label: { fontSize: 16 } }}
      />

      <FileInput value={file} onChange={setFile} accept="application/json" clearable />

      <Divider my="md" />

      <Text mb="md" fw={600} ta="center">
        Do you want to replace exising data?
      </Text>
      <ButtonGroup
        first={{ text: "No", color: "gray", onClick: onCancel }}
        second={{ text: "Yes", color: "red", onClick: onConfirm }}
      />
    </Modal>
  );
};

export const DataManagementWindow = ({ closeSettings }: { closeSettings: () => void }) => {
  const { downloadData, uploadData, deleteData } = useHabits();

  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [uploadOpened, { open: openUpload, close: closeUpload }] = useDisclosure(false);

  const [file, setFile] = useState<File | null>(null);

  return (
    <>
      <Stack w="100%" h="100%" p="md" gap="md">
        <SettingsButton
          icon={IconFileDownload}
          header="Download app data"
          description="Get your data to use it in other devices"
          onClick={() => {
            void downloadData();
          }}
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

      <ConfirmationModal
        opened={deleteOpened}
        message={`Do you want to delete all data?`}
        color="gray"
        onConfirm={() => {
          void deleteData();
          closeDelete();
          closeSettings();
        }}
        onCancel={closeDelete}
      />

      <UploadModal
        opened={uploadOpened}
        file={file}
        setFile={setFile}
        onConfirm={() => {
          if (file) {
            void uploadData(file);
            closeSettings();
          }
          closeUpload();
        }}
        onCancel={closeUpload}
      />
    </>
  );
};
