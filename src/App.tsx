import dayjs from "dayjs";
import { useState } from "react";
import { useDisclosure, useToggle, useViewportSize } from "@mantine/hooks";
import { useColorScheme } from "./hooks/useColorScheme";
import { useHabits } from "./contexts/HabitsContext";
import type { HabitStyle } from "./types";
import { IconPlus, IconSettings, IconSun, IconMoon } from "@tabler/icons-react";
import { AppShell, Button, em, Flex, Grid, Group, Text } from "@mantine/core";
import { ActionButton } from "./components/Buttons/ActionButton";
import { SelectedHabit } from "./components/Drawers/SelectedHabit";
import { HabitItem } from "./components/HabitItem";
import { HabitForm } from "./components/Drawers/HabitForm";
import { Settings } from "./components/Drawers/Settings";
import { useMediaQuery } from "@mantine/hooks";
import { CustomDrawer } from "./components/Drawers/CustomDrawer";

export const App = () => {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  const { habits } = useHabits();
  const { height } = useViewportSize();

  const [currentDate, setCurrentDate] = useState(dayjs().format("YYYY-MM-DD"));
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
        {habits.length === 0 ? (
          <Flex align="center" justify="center" h={height - 76 - 32}>
            <Text size="md" fw={600}>
              Add a new habit clicking on +
            </Text>
          </Flex>
        ) : (
          <Grid gutter="md" columns={isMobile ? 1 : 3}>
            {habits.map((h) => (
              <Grid.Col key={h.id} span={1}>
                <HabitItem
                  habit={h}
                  habitStyle={habitStyle}
                  themeBorderColor={themeBorderColor}
                  currentDate={currentDate}
                  setCurrentDate={setCurrentDate}
                  openHabit={() => {
                    openHabitDrawer(h.id);
                  }}
                />
              </Grid.Col>
            ))}
          </Grid>
        )}
      </AppShell.Main>

      <CustomDrawer opened={addHabitOpened} isMobile={isMobile}>
        <HabitForm onClose={closeAddHabit} />
      </CustomDrawer>

      <CustomDrawer opened={settingsOpened} isMobile={isMobile}>
        <Settings
          habits={habits}
          onClose={closeSettings}
          themeTextColor={themeTextColor}
          themeBorderColor={themeBorderColor}
        />
      </CustomDrawer>

      <CustomDrawer opened={habitOpened} isMobile={isMobile}>
        <SelectedHabit
          habit={habits.find((h) => h.id === selectedHabitId)}
          onClose={closeHabitDrawer}
          borderTheme={themeBorderColor}
        />
      </CustomDrawer>
    </AppShell>
  );
};
