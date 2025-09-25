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
import dayjs from "dayjs";

interface HabitItemProps {
  habit: Habit;
  habitStyle: HabitStyle;
  themeBorderColor: string;
  currentDate: string;
  setCurrentDate: React.Dispatch<React.SetStateAction<string>>;
  openHabit: () => void;
}

export const HabitItem = ({
  habit,
  habitStyle,
  themeBorderColor,
  currentDate,
  setCurrentDate,
  openHabit,
}: HabitItemProps) => {
  const { updateLog } = useHabits();
  const { name, color, reps, logs } = habit;

  const currentLog = logs.find((l) => l.date === currentDate);
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
                const newDate = dayjs().format("YYYY-MM-DD");

                if (currentDate !== newDate) setCurrentDate(newDate);

                void updateLog(habit, newDate);
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
