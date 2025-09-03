import { AppShell } from "@mantine/core";
import { Header } from "./Header";
import { useDisclosure, useToggle } from "@mantine/hooks";
import { HabitCreationModal } from "../HabitCreationModal";
import { useHabits } from "../../hooks/useHabits";
import { Main } from "./Main";
import type { HabitStyle } from "../../types";

export const Layout = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [value, toggle] = useToggle<HabitStyle>(["simple", "streak", "heatmap"]);

  const { habits } = useHabits();

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Header openCreationModal={open} habitStyle={value} toggleHabitStyle={toggle} />
      </AppShell.Header>

      <AppShell.Main>
        <Main habits={habits} habitStyle={value} />
      </AppShell.Main>

      <HabitCreationModal opened={opened} onClose={close} />
    </AppShell>
  );
};
