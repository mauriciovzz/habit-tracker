import { ActionIcon } from "@mantine/core";
import type { TablerIcon } from "@tabler/icons-react";
import { useColorScheme } from "../../hooks/useColorScheme";

interface HeaderTypes {
  toggle: () => void;
  icon: TablerIcon;
}

export const ActionButton = ({ toggle, icon: ButtonIcon }: HeaderTypes) => {
  const { colorScheme } = useColorScheme();

  return (
    <ActionIcon
      variant="default"
      aria-label="ChangeHabitStyle"
      onClick={toggle}
      color={colorScheme === "dark" ? "white" : "black"}
    >
      <ButtonIcon size={19} stroke={1.5} />
    </ActionIcon>
  );
};
