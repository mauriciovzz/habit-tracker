import { ActionIcon } from "@mantine/core";
import { IconCircleCheck, IconFlame, IconGridDots } from "@tabler/icons-react";
import type { HabitStyle } from "../types";

interface HeaderTypes {
  habitStyle: HabitStyle;
  toggleHabitStyle: () => void;
}

const iconMap = {
  simple: IconFlame,
  streak: IconGridDots,
  heatmap: IconCircleCheck,
};

export const HabitStyleButton = ({ habitStyle, toggleHabitStyle }: HeaderTypes) => {
  const HabitStyleIcon = iconMap[habitStyle];

  return (
    <ActionIcon variant="default" aria-label="ChangeHabitStyle" onClick={toggleHabitStyle}>
      <HabitStyleIcon style={{ width: "70%", height: "70%" }} stroke={1.5} />
    </ActionIcon>
  );
};
