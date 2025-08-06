import { AppShell } from "@mantine/core";
import { Header } from "./Header";
import { useDisclosure } from "@mantine/hooks";
import { HabitCreationModal } from "../HabitCreationModal";

export const Layout = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Header openCreationModal={open} />
      </AppShell.Header>

      <AppShell.Main>
        Navbar is only visible on mobile, links that are rendered in the header on desktop are
        hidden on mobile in header and rendered in navbar instead.
      </AppShell.Main>

      <HabitCreationModal opened={opened} onClose={close} />
    </AppShell>
  );
};
