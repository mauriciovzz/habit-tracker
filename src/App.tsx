import dayjs from "dayjs";
import { useState } from "react";
import { useDisclosure, useToggle } from "@mantine/hooks";
import { useColorSchema } from "./hooks/useColorScheme";
import { useHabits } from "./contexts/HabitsContext";
import type { HabitStyle } from "./types";
import { IconPlus, IconSettings } from "@tabler/icons-react";
import { AppShell, Drawer, Group, Stack, Text } from "@mantine/core";
import { ColorSchemeButton } from "./components/ColorSchemeButton";
import { HabitStyleButton } from "./components/HabitStyleButton";
import { ActionButton } from "./components/ActionButton";
import { HabitCreationModal } from "./components//HabitCreationModal";
import { HabitDrawer } from "./components/HabitDrawer";
import { HabitItem } from "./components/HabitItem";

const currentDate = dayjs().format("YYYY-MM-DD");

export const App = () => {
  const { habits } = useHabits();

  const [selectedHabit, setSelectedHabit] = useState<number | null>(null);

  const [addHabitOpened, { open: openAddHabit, close: closeAddHabit }] = useDisclosure(false);
  const [habitStyle, toggleHabitStyle] = useToggle<HabitStyle>(["simple", "streak", "heatmap"]);
  const { colorScheme, toggleColorScheme } = useColorSchema();
  const [settingsOpened, { open: openSettings, close: closeSettings }] = useDisclosure(false);
  const [habitOpened, { open: openHabit, close: closeHabit }] = useDisclosure(false);

  const openHabitDrawer = (habitId: number) => {
    const foundHabit = habits.find((h) => h.id === habitId);

    if (foundHabit) {
      setSelectedHabit(foundHabit.id);
      openHabit();
    }
  };

  const closeHabitDrawer = () => {
    setSelectedHabit(null);
    closeHabit();
  };

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md">
          <Group justify="space-between" style={{ flex: 1 }}>
            <Text size="lg" fw={700}>
              Habits
            </Text>
            <Group ml="xl" gap={10}>
              <ActionButton toggle={openAddHabit} icon={IconPlus} />
              <HabitStyleButton habitStyle={habitStyle} toggleHabitStyle={toggleHabitStyle} />
              <ColorSchemeButton colorScheme={colorScheme} toggleColorScheme={toggleColorScheme} />
              <ActionButton toggle={openSettings} icon={IconSettings} />
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Stack gap="md">
          {habits.map((h) => (
            <HabitItem
              key={h.id}
              habit={h}
              habitStyle={habitStyle}
              date={currentDate}
              openHabit={() => {
                openHabitDrawer(h.id);
              }}
            />
          ))}
        </Stack>
      </AppShell.Main>

      <Drawer
        opened={settingsOpened}
        onClose={closeSettings}
        title="Settings"
        position="bottom"
        size="98%"
      >
        Reorder habits Manage data
      </Drawer>

      {selectedHabit && (
        <HabitDrawer
          habitOpened={habitOpened}
          closeHabit={closeHabitDrawer}
          habit={habits.find((h) => h.id === selectedHabit)}
        />
      )}

      <HabitCreationModal opened={addHabitOpened} onClose={closeAddHabit} />
    </AppShell>
  );
};
