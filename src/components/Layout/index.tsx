import { AppShell } from "@mantine/core";
import { Header } from "./Header";
import { useDisclosure } from "@mantine/hooks";
import { HabitCreationModal } from "../HabitCreationModal";
import { useHabits } from "../../hooks/useHabits";

export const Layout = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { habits } = useHabits();

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Header openCreationModal={open} />
      </AppShell.Header>

      <AppShell.Main>
        {habits.map((h) => (
          <div key={h.id}>{h.name}</div>
        ))}
      </AppShell.Main>

      <HabitCreationModal opened={opened} onClose={close} />
    </AppShell>
  );
};
