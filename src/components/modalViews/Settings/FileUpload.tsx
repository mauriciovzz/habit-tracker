import { useState } from "react";
import {
  Flex,
  Divider,
  FileInput,
  Center,
  Group,
  Button,
  Text,
} from "@mantine/core";
import { useTranslation } from "react-i18next";

import { useHabits } from "@/contexts/HabitsContext";
import { AppModal, TextButton } from "@/components";

interface Props {
  opened: boolean;
  onClose: () => void;
  closeSettings: () => void;
}

export const FileUpload = ({ opened, onClose, closeSettings }: Props) => {
  const { t } = useTranslation();
  const { validateUpload, uploadData } = useHabits();

  const [importConfirmed, setImportConfirmed] = useState<boolean | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    try {
      await uploadData(file);

      onClose();
      closeSettings();
    } catch {
      setImportConfirmed(false);
    }
  };

  const confirmImport = async (file: File | null) => {
    setFile(file);

    if (!file) {
      setImportConfirmed(null);
      return;
    }

    try {
      await validateUpload(file);
      setImportConfirmed(true);
    } catch {
      setImportConfirmed(false);
    }
  };

  return (
    <AppModal opened={opened} onClose={onClose}>
      <Flex
        bg="var(--mantine-color-default-border)"
        c="white"
        px="sm"
        bdrs="md"
        align="center"
      >
        <Text flex={1} p={0} ta="left" size="xl" c="white" fw={700}>
          {t("uploadTitle")}
        </Text>

        <TextButton text={t("back")} onClick={onClose} />
      </Flex>

      <Divider />

      <FileInput
        placeholder={t("selectJson")}
        value={file}
        accept="application/json"
        clearable
        onChange={(file) => void confirmImport(file)}
        styles={{
          input: {
            borderColor:
              importConfirmed === null
                ? "var(--mantine-color-default-border)"
                : importConfirmed
                  ? "var(--mantine-color-green-6)"
                  : "var(--mantine-color-red-6)",
          },
          placeholder: {
            textAlign: "center",
          },
        }}
      />

      <Divider />

      <Center h={33}>
        <Text
          size="sm"
          ta="center"
          c={
            importConfirmed === null
              ? "dimmed"
              : importConfirmed
                ? "green"
                : "red"
          }
        >
          {importConfirmed === null
            ? t("fileWaiting")
            : importConfirmed
              ? t("fileSuccess")
              : t("fileError")}
        </Text>
      </Center>

      <Divider />

      <Group gap="sm">
        <Button variant="default" flex={1} onClick={onClose}>
          {t("cancel")}
        </Button>

        <Button
          variant="default"
          flex={1}
          disabled={!importConfirmed}
          onClick={() => void handleUpload()}
        >
          {t("import")}
        </Button>
      </Group>
    </AppModal>
  );
};
