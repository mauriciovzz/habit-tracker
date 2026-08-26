import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  Text,
  Flex,
  Stack,
  Divider,
  Group,
  Button,
  useMantineColorScheme,
  useComputedColorScheme,
  Center,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconArrowsShuffle,
  IconCheck,
  IconFileDownload,
  IconFileUpload,
  IconLanguage,
  IconMoon,
  IconQuestionMark,
  IconRefresh,
  IconSun,
  IconTrash,
  type TablerIcon,
} from "@tabler/icons-react";

import { useHabits } from "@/contexts/HabitsContext";
import { TextButton, ConfirmationModal } from "@/components";
import { HabitReordering } from "./HabitReordering";
import { FileUpload } from "./FileUpload";
import { HelpModal } from "./Help";
import { usePWA } from "@/contexts/PWAContext";

export const SettingsButton = ({
  icon: SettingIcon,
  header,
  description,
  disabled,
  onClick,
}: {
  icon: TablerIcon;
  header: string;
  description: string;
  disabled?: boolean;
  onClick: () => void;
}) => (
  <Button
    variant="default"
    flex={1}
    h="100%"
    radius="md"
    p="xs"
    styles={{ inner: { justifyContent: "flex-start" } }}
    disabled={disabled}
    onClick={onClick}
  >
    <Group gap="xs" wrap="nowrap">
      <SettingIcon size={20} />

      <Stack gap={3} style={{ flex: 1 }}>
        <Text size="md" fw={600} ta="left" inline={true}>
          {header}
        </Text>
        {description && (
          <Text size="sm" fw={500} ta="left" c="dimmed">
            {description}
          </Text>
        )}
      </Stack>
    </Group>
  </Button>
);

interface Props {
  onClose: () => void;
}

export const Settings = ({ onClose }: Props) => {
  const { downloadData, deleteData } = useHabits();
  const { updateAvailable, checkForUpdate, updateApp } = usePWA();

  const [reorderOpened, { open: openReorder, close: closeReorder }] =
    useDisclosure(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);
  const [uploadOpened, { open: openUpload, close: closeUpload }] =
    useDisclosure(false);
  const [helpOpened, { open: openHelp, close: closeHelp }] =
    useDisclosure(false);

  const { setColorScheme } = useMantineColorScheme();

  const scheme = useComputedColorScheme("light");
  const isDark = scheme === "dark";

  const toggleColor = useCallback(() => {
    setColorScheme(isDark ? "light" : "dark");
  }, [isDark, setColorScheme]);

  const { t, i18n } = useTranslation();

  const toggleLang = async () => {
    const currentLanguage = i18n.language;
    await i18n.changeLanguage(currentLanguage === "en" ? "es" : "en");
  };

  return (
    <>
      <Flex
        bg="var(--mantine-color-default-border)"
        c="white"
        px="sm"
        bdrs="md"
        align="center"
      >
        <Text flex={1} p={0} ta="left" size="xl" c="white" fw={700}>
          {t("settings")}
        </Text>

        <TextButton text={t("back")} onClick={onClose} />
      </Flex>

      <Divider />

      <Stack flex={1} gap="sm">
        <SettingsButton
          icon={IconArrowsShuffle}
          header={t("reorderHabits")}
          description={t("reorderHabitsPrompt")}
          onClick={openReorder}
        />

        <SettingsButton
          icon={IconFileDownload}
          header={t("downloadData")}
          description={t("downloadDataPrompt")}
          onClick={() => void downloadData()}
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

        <SettingsButton
          icon={updateAvailable ? IconRefresh : IconCheck}
          header={updateAvailable ? t("updateAvailable") : t("upToDate")}
          description={
            updateAvailable ? t("updateAvailablePrompt") : t("upToDatePrompt")
          }
          onClick={() => {
            if (updateAvailable) {
              void updateApp();
            } else {
              void checkForUpdate();
            }
          }}
          disabled={!updateAvailable}
        />

        <Group gap="sm" w="100%">
          <Button w="28%" variant="default" onClick={toggleColor}>
            {isDark ? <IconSun size={20} /> : <IconMoon size={20} />}
          </Button>

          <Button
            flex={1}
            variant="default"
            p={8}
            styles={{
              label: {
                disĺay: "flex",
                gap: 6,
                width: "100%",
              },
            }}
            onClick={() => {
              void toggleLang();
            }}
          >
            <IconLanguage size={20} />

            <Divider orientation="vertical" />

            <Center flex={1}>{t("lang")}</Center>
          </Button>

          <Button variant="default" w="28%" onClick={openHelp}>
            <IconQuestionMark size={20} />
          </Button>
        </Group>
      </Stack>

      <ConfirmationModal
        opened={deleteOpened}
        message={t("DeleteDataQuestion")}
        color="red.8"
        onConfirm={() => {
          void deleteData();
          closeDelete();
          onClose();
        }}
        onCancel={closeDelete}
      />

      <FileUpload
        opened={uploadOpened}
        onClose={closeUpload}
        closeSettings={onClose}
      />

      <HabitReordering opened={reorderOpened} onClose={closeReorder} />

      <HelpModal opened={helpOpened} onClose={closeHelp} />
    </>
  );
};
