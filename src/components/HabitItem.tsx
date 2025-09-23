import type { Habit, HabitStyle } from "../types";
import {
  Paper,
  Group,
  Stack,
  Text,
  Divider,
  Flex,
  UnstyledButton,
  RingProgress,
} from "@mantine/core";
import { HabitStreaks } from "./HabitStreaks";
import { IconCheck } from "@tabler/icons-react";
import { useHabits } from "../contexts/HabitsContext";
import { HabitHeatmap } from "./HabitHeatmap";

interface HabitItemProps {
  habit: Habit;
  habitStyle: HabitStyle;
  themeBorderColor: string;
  date: string;
  openHabit: () => void;
}

export const HabitItem = ({
  habit,
  habitStyle,
  themeBorderColor,
  date,
  openHabit,
}: HabitItemProps) => {
  const { updateLog } = useHabits();
  const { name, color, reps, logs } = habit;

  const currentLog = logs.find((l) => l.date === date);
  const count = currentLog?.count ?? 0;
  const progress = (count / reps) * 100;
  const isTodayComplete = progress >= 100;

  // handele colors
  const borderColor = isTodayComplete ? color : themeBorderColor;

  return (
    <Paper p="xs" bd={`1px solid ${borderColor}`} bdrs="lg" onClick={openHabit}>
      <Stack gap={0}>
        <Flex justify="center">
          <Group w="100%">
            <Text flex={1} size="md" lineClamp={2} fw={500} style={{ lineHeight: 1.2 }}>
              {name}
            </Text>

            <UnstyledButton
              onClick={(e) => {
                e.stopPropagation();
                void updateLog(habit, date);
              }}
            >
              <RingProgress
                size={40}
                thickness={2}
                sections={[{ value: progress, color }]}
                transitionDuration={250}
                label={progress === 100 ? <IconCheck size={40} /> : null}
              />
            </UnstyledButton>
          </Group>
        </Flex>

        {habitStyle !== "simple" && <Divider my={10} color={borderColor} />}

        {habitStyle === "streaks" && (
          <HabitStreaks
            habit={habit}
            borderColor={borderColor}
            iconColor={isTodayComplete ? color : undefined}
          />
        )}

        {habitStyle === "chart" && <HabitHeatmap habit={habit} />}
      </Stack>
    </Paper>
  );
};
