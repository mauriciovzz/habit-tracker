import { AppShell, Stack } from "@mantine/core";
import { Header } from "./Header";
import { useDisclosure } from "@mantine/hooks";
import { HabitCreationModal } from "../HabitCreationModal";
import { useHabits } from "../../hooks/useHabits";
import { HeatmapHabit } from "../HeatmapHabit";

export const Layout = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { habits } = useHabits();

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Header openCreationModal={open} />
      </AppShell.Header>

      <AppShell.Main>
        <Stack gap="md">
          {habits.map((h) => (
            <HeatmapHabit key={h.id} habit={h} />
          ))}
        </Stack>
      </AppShell.Main>

      <HabitCreationModal opened={opened} onClose={close} />
    </AppShell>
  );
};
