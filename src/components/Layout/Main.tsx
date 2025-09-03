import { Stack } from "@mantine/core";
import type { HabitInfo, HabitStyle } from "../../types";
import { Habit } from "../Habit";

interface MainTypes {
  habits: HabitInfo[];
  habitStyle: HabitStyle;
}

export const Main = ({ habits, habitStyle }: MainTypes) => {
  return (
    <Stack gap="md">
      {habits.map((h) => (
        <Habit key={h.id} habit={h} habitStyle={habitStyle} />
      ))}
    </Stack>
  );
};
