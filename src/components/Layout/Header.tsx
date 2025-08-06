import {
  Group,
  Text,
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconGridDots, IconMoon, IconPlus, IconSun } from "@tabler/icons-react";

export const Header = ({ openCreationModal }: { openCreationModal: () => void }) => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light");

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
  };

  return (
    <Group justify="space-between" h="100%" px="md">
      <Text size="lg" fw={700}>
        Habits
      </Text>

      <Group gap="sm">
        <ActionIcon variant="default" aria-label="AddHabit" onClick={openCreationModal}>
          <IconPlus style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
        <ActionIcon variant="default" aria-label="ChangeHabitStyle">
          <IconGridDots style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
        <ActionIcon
          variant="default"
          aria-label="ChangeMode"
          onClick={() => {
            toggleColorScheme();
          }}
        >
          {computedColorScheme === "dark" ? (
            <IconSun style={{ width: "70%", height: "70%" }} stroke={1.5} />
          ) : (
            <IconMoon style={{ width: "70%", height: "70%" }} stroke={1.5} />
          )}
        </ActionIcon>
      </Group>
    </Group>
  );
};
