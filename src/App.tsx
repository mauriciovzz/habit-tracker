import { useEffect, useState } from "react";
import { t } from "i18next";
import {
  Flex,
  Group,
  Text,
  Stack,
  Divider,
  ScrollArea,
  Center,
  useComputedColorScheme,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconPlus, IconMenu2 } from "@tabler/icons-react";
import dayjs from "dayjs";

import { useHabits } from "@/contexts/HabitsContext";
import { useCurrentDate } from "@/hooks";
import {
  AppActionIcon,
  HabitItem,
  AppModal,
  HabitForm,
  SelectedHabit,
  Settings,
  SelectedLog,
} from "@/components";

import type { Habit, ISODate, LogData } from "./types";
import { usePWA } from "./contexts/PWAContext";

export const App = () => {
  const { pastDates } = useCurrentDate();
  const { habits, logsByHabit, incrementLog } = useHabits();
  const { checkForUpdate } = usePWA();

  const [selectedHabitId, setSelectedHabitId] = useState<number | null>(null);
  const [selectedLogData, setSelectedLog] = useState<LogData | undefined>(
    undefined,
  );

  const [addHabitOpened, { open: openAddHabit, close: closeAddHabit }] =
    useDisclosure(false);
  const [settingsOpened, { open: openSettings, close: closeSettings }] =
    useDisclosure(false);
  const [habitOpened, { open: openHabit, close: closeHabit }] =
    useDisclosure(false);
  const [logOpened, { open: openLog, close: closeLog }] = useDisclosure(false);

  const modalOpened =
    addHabitOpened || settingsOpened || habitOpened || logOpened;

  const scheme = useComputedColorScheme("light");
  const isDark = scheme === "dark";

  const isLandscape = useMediaQuery("(orientation: landscape)");

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');

    if (!meta) {
      return;
    }

    if (isLandscape || !modalOpened) {
      meta.setAttribute("content", isDark ? "#242424" : "#fff");
    } else {
      meta.setAttribute("content", isDark ? "#121212" : "#7F7F7F");
    }
  }, [isDark, modalOpened, isLandscape]);

  const openSettingsModal = () => {
    openSettings();
    void checkForUpdate();
  };

  const openHabitModal = (id: number) => {
    setSelectedHabitId(id);
    openHabit();
  };

  const openLogModal = (date: ISODate, habit: Habit) => {
    setSelectedLog({ date, habit });
    openLog();
  };

  const weekdays = t("daysOfWeek", {
    returnObjects: true,
  }) as string[];

  return (
    <>
      <Group pl={9} pr="xs" justify="space-between">
        <AppActionIcon icon={IconMenu2} onClick={openSettingsModal} />

        <AppActionIcon icon={IconPlus} onClick={openAddHabit} />
      </Group>

      <Divider />

      <Group gap={0} px="xs" justify="space-between">
        <Text size="30px" fw={700} inline={true}>
          {t("appTitle")}
        </Text>

        <Group gap={6}>
          {pastDates.map((d) => (
            <Stack key={d} w={30} gap={0}>
              <Text ta="center" size="sm" inline={true}>
                {dayjs(d).format("DD")}
              </Text>
              <Text ta="center" size="sm" fw={700}>
                {weekdays[(dayjs(d).day() - 1 + 7) % 7]}
              </Text>
            </Stack>
          ))}
        </Group>
      </Group>

      <Divider />

      <Flex flex={1} mih={0}>
        {habits.length === 0 ? (
          <Center h="100%" w="100%">
            <Text size="md" fw={700}>
              {t("NoHabitsMessage")}
            </Text>
          </Center>
        ) : (
          <ScrollArea type="never" h="100%" w="100%">
            <Stack gap="sm">
              {habits.map((h) => (
                <HabitItem
                  key={h.id}
                  habit={h}
                  logs={logsByHabit.get(h.id) ?? []}
                  dates={pastDates}
                  openHabit={openHabitModal}
                  incrementLog={incrementLog}
                  onLongPress={openLogModal}
                />
              ))}
            </Stack>
          </ScrollArea>
        )}
      </Flex>

      <AppModal opened={settingsOpened} onClose={closeSettings}>
        <Settings onClose={closeSettings} />
      </AppModal>

      <AppModal opened={addHabitOpened} onClose={closeAddHabit}>
        <HabitForm onClose={closeAddHabit} />
      </AppModal>

      <AppModal opened={habitOpened} onClose={closeHabit}>
        <SelectedHabit
          habit={habits.find((h) => h.id === selectedHabitId)}
          logs={selectedHabitId ? (logsByHabit.get(selectedHabitId) ?? []) : []}
          onClose={closeHabit}
        />
      </AppModal>

      <AppModal opened={logOpened} onClose={closeLog}>
        <SelectedLog
          log={
            selectedLogData
              ? logsByHabit
                  .get(selectedLogData.habit.id)
                  ?.find((l) => l.date === selectedLogData.date)
              : undefined
          }
          selectedLogData={selectedLogData}
          onClose={closeLog}
        />
      </AppModal>
    </>
  );
};
