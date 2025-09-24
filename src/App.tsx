import dayjs from "dayjs";
import { useState } from "react";
import { useDisclosure, useToggle } from "@mantine/hooks";
import { useColorScheme } from "./hooks/useColorScheme";
import { useHabits } from "./contexts/HabitsContext";
import type { HabitStyle } from "./types";
import { IconPlus, IconSettings, IconSun, IconMoon } from "@tabler/icons-react";
import { AppShell, Button, em, Grid, Group, Text } from "@mantine/core";
import { ActionButton } from "./components/ActionButton";
// import { HabitCreationModal } from "./components//HabitCreationModal";
import { HabitDrawer } from "./components/HabitDrawer";
import { HabitItem } from "./components/HabitItem";
import { HabitFormDrawer } from "./components/HabitFormDrawer";
import { SettingsDrawer } from "./components/SettingsDrawer";
import { useMediaQuery } from "@mantine/hooks";

const currentDate = dayjs().format("YYYY-MM-DD");

export const App = () => {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  const { habits } = useHabits();

  const [selectedHabitId, setSelectedHabitId] = useState<number | null>(null);

  const [addHabitOpened, { open: openAddHabit, close: closeAddHabit }] = useDisclosure(false);
  const [habitStyle, toggleHabitStyle] = useToggle<HabitStyle>(["simple", "streaks", "chart"]);
  const { colorScheme, themeTextColor, themeBorderColor, toggleColorScheme } = useColorScheme();
  const [settingsOpened, { open: openSettings, close: closeSettings }] = useDisclosure(false);
  const [habitOpened, { open: openHabit, close: closeHabit }] = useDisclosure(false);

  const openHabitDrawer = (habitId: number) => {
    const foundHabit = habits.find((h) => h.id === habitId);

    if (foundHabit) {
      setSelectedHabitId(foundHabit.id);
      openHabit();
    }
  };

  const closeHabitDrawer = () => {
    setSelectedHabitId(null);
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

            <Group gap={10}>
              <ActionButton toggle={openAddHabit} icon={IconPlus} />
              <Button
                w="65"
                h={28}
                p={5}
                variant="default"
                onClick={() => {
                  toggleHabitStyle();
                }}
              >
                <Text w="100%" ta="center" size="sm" fw={500}>
                  {habitStyle}
                </Text>
              </Button>
              <ActionButton
                toggle={toggleColorScheme}
                icon={colorScheme === "dark" ? IconSun : IconMoon}
              />
              <ActionButton toggle={openSettings} icon={IconSettings} />
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Grid gutter="md" columns={isMobile ? 1 : 3}>
          {habits.map((h) => (
            <Grid.Col span={1}>
              <HabitItem
                key={h.id}
                habit={h}
                habitStyle={habitStyle}
                themeBorderColor={themeBorderColor}
                date={currentDate}
                openHabit={() => {
                  openHabitDrawer(h.id);
                }}
              />
            </Grid.Col>
          ))}
        </Grid>
      </AppShell.Main>

      <HabitFormDrawer opened={addHabitOpened} onClose={closeAddHabit} />

      <SettingsDrawer
        habits={habits}
        opened={settingsOpened}
        themeTextColor={themeTextColor}
        themeBorderColor={themeBorderColor}
        onClose={closeSettings}
      />

      <HabitDrawer
        habit={habits.find((h) => h.id === selectedHabitId)}
        borderTheme={themeBorderColor}
        habitOpened={habitOpened}
        closeHabit={closeHabitDrawer}
        isMobile={isMobile}
      />
    </AppShell>
  );
};
