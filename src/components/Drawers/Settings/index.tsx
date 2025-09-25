import { useState, type ReactNode } from "react";
import {
  Box,
  Text,
  Flex,
  Transition,
  type MantineTransition,
  Modal,
  Divider,
  FileInput,
} from "@mantine/core";
import { TextButton } from "../../Buttons/TextButton";
import type { Habit, SettingsView } from "../../../types";
import { MainWindow } from "./MainWindow";
import { DataManagementWindow } from "./DataManagementWindow";
import { HabitReorderWindow } from "./HabitReorderWindow";
import { ConfirmationModal } from "../../ConfirmationModal";
import { useDisclosure } from "@mantine/hooks";
import { useHabits } from "../../../contexts/HabitsContext";
import { ButtonGroup } from "../../Buttons/ButtonGroup";

const HeaderTransition = ({
  mounted,
  trans,
  text,
}: {
  mounted: boolean;
  trans: MantineTransition;
  text: string;
}) => (
  <Transition mounted={mounted} transition={trans} duration={200} timingFunction="ease">
    {(styles) => (
      <Text size="xl" fw={500} ta="left" style={{ ...styles, position: "absolute", width: "100%" }}>
        {text}
      </Text>
    )}
  </Transition>
);

const BodyTransition = ({
  mounted,
  trans,
  body,
}: {
  mounted: boolean;
  trans: MantineTransition;
  body: ReactNode;
}) => (
  <Transition mounted={mounted} transition={trans} duration={200} timingFunction="ease">
    {(styles) => (
      <Box
        style={{
          ...styles,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {body}
      </Box>
    )}
  </Transition>
);

interface SettingsProps {
  habits: Habit[];
  onClose: () => void;
  themeTextColor: string;
  themeBorderColor: string;
  isMobile?: boolean;
  drawerBodyHeight?: number;
  drawerButtonWidth?: number;
}

export const Settings = ({
  habits,
  onClose,
  themeTextColor,
  themeBorderColor,
  isMobile,
  drawerBodyHeight,
  drawerButtonWidth,
}: SettingsProps) => {
  const [view, setView] = useState<SettingsView>("menu");

  const buttonsWidth = drawerButtonWidth ?? 0;
  const bodyHeight = drawerBodyHeight ?? 0;

  const { downloadData, uploadData, deleteData } = useHabits();
  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [uploadOpened, { open: openUpload, close: closeUpload }] = useDisclosure(false);

  const [file, setFile] = useState<File | null>(null);

  const closeSettings = () => {
    onClose();

    setTimeout(() => {
      setView("menu");
    }, 200);
  };

  return (
    <Box>
      <Flex
        p="md"
        h="80px"
        align="center"
        style={{ borderBottom: `1px solid ${themeBorderColor}`, position: "relative" }}
      >
        <Flex
          align="center"
          style={{ flex: 1, position: "relative", overflow: "hidden", height: "100%" }}
        >
          <HeaderTransition mounted={view === "menu"} trans="slide-right" text="Settings" />
          <HeaderTransition mounted={view === "reorder"} trans="slide-left" text="Reorder Habits" />
          <HeaderTransition mounted={view === "data"} trans="slide-left" text="Manage Data" />
        </Flex>

        <TextButton
          text="Back"
          width={buttonsWidth}
          onClick={
            view === "menu"
              ? closeSettings
              : () => {
                  setView("menu");
                }
          }
          customColor={themeTextColor}
        />
      </Flex>

      <Box p={0} pos="relative" h={bodyHeight - 80} w="100%" style={{ overflow: "hidden" }}>
        <BodyTransition
          mounted={view === "menu"}
          trans="slide-right"
          body={<MainWindow setView={setView} />}
        />
        <BodyTransition
          mounted={view === "reorder"}
          trans="slide-left"
          body={<HabitReorderWindow originalHabits={habits} isMobile={isMobile ?? false} />}
        />
        <BodyTransition
          mounted={view === "data"}
          trans="slide-left"
          body={
            <DataManagementWindow
              downloadData={() => {
                void downloadData();
              }}
              openDelete={openDelete}
              openUpload={openUpload}
            />
          }
        />
      </Box>

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

      <Modal
        opened={uploadOpened}
        onClose={closeUpload}
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

        <Text mb="xs" fw={600} ta="center">
          Do you want to replace exising data?
        </Text>
        <ButtonGroup
          first={{ text: "No", color: "gray", onClick: closeUpload }}
          second={{
            text: "Yes",
            color: "red",
            onClick: () => {
              if (file) {
                void uploadData(file);
                closeSettings();
              }
              closeUpload();
            },
          }}
        />
      </Modal>
    </Box>
  );
};
