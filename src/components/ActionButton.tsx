import { ActionIcon } from "@mantine/core";
import type { Icon, IconProps } from "@tabler/icons-react";

interface HeaderTypes {
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
  toggle: () => void;
}

export const ActionButton = ({ icon, toggle }: HeaderTypes) => {
  const ButtonIcon = icon;

  return (
    <ActionIcon variant="default" aria-label="ChangeHabitStyle" onClick={toggle}>
      <ButtonIcon style={{ width: "70%", height: "70%" }} stroke={1.5} />
    </ActionIcon>
  );
};
