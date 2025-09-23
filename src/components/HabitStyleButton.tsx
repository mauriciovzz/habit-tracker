import { Button, Text } from "@mantine/core";
import type { HabitStyle } from "../types";

interface HeaderTypes {
  habitStyle: HabitStyle;
  toggleHabitStyle: () => void;
}

export const HabitStyleButton = ({ habitStyle, toggleHabitStyle }: HeaderTypes) => {
  return (
    <Button w="65" h={28} p={5} variant="default" onClick={toggleHabitStyle}>
      <Text w="100%" ta="center" size="sm" fw={500}>
        {habitStyle}
      </Text>
    </Button>
  );
};
