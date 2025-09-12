import type { Habit, HabitStyle } from "../../types";
import {
  Paper,
  Group,
  Stack,
  Text,
  Divider,
  useMantineTheme,
  useMantineColorScheme,
  Flex,
} from "@mantine/core";
import { Heatmap } from "@mantine/charts";
import { ProgressButton } from "./ProgressButton";
import { useHeatmapLayout } from "../../hooks/useHeatmapLayout";
import { IconFlame, IconCrown, IconChecks, IconCheck } from "@tabler/icons-react";
import { useHabits } from "../../contexts/HabitsContext";

const iconMap = {
  current: IconFlame,
  best: IconCrown,
  count: IconChecks,
};

const StreakItem = ({ number, icon }: { number: number; icon: "current" | "best" | "count" }) => {
  const StreakIcon = iconMap[icon];

  return (
    <Group flex={1} gap={7.5} h={25} justify="center" align="center">
      <Text size="sm">{number}</Text>
      <StreakIcon size={25} />
    </Group>
  );
};

interface HabitItemProps {
  habit: Habit;
  habitStyle: HabitStyle;
  date: string;
  openHabit: () => void;
}

export const HabitItem = ({ habit, habitStyle, date, openHabit }: HabitItemProps) => {
  const { name, color, reps, currentStreak, bestStreak, logs } = habit;
  const { updateLog } = useHabits();

  const todayLog = logs.find((l) => l.date === date);
  const count = todayLog?.count ?? 0;
  const progress = (count / reps) * 100;
  const isTodayComplete = progress >= 100;

  // handle heatmap
  let heatmapData: Record<string, number> = {};
  const completedCheks = logs.filter((key) => key.count === reps);
  heatmapData = Object.fromEntries(completedCheks.map((key) => [key.date, 1]));

  const rectSize = 12;
  const { ref, startDate, today, mapWidth } = useHeatmapLayout(rectSize);

  // handle color
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const defaultBorderColor = colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3];
  const borderColor = isTodayComplete ? color : defaultBorderColor;

  return (
    <Paper p="xs" bd={`1px solid ${borderColor}`} bdrs="lg" onClick={openHabit}>
      <Stack gap={0}>
        <div ref={ref} />

        <Flex justify="center">
          <Group w="100%">
            <Text flex={1} size="md" inline lineClamp={2} fw={600}>
              {name}
            </Text>
            <ProgressButton
              color={color}
              progress={progress}
              updateProgress={() => updateLog(habit, date)}
              label={progress === 100 ? <IconCheck size={35} /> : null}
            />
          </Group>
        </Flex>

        {habitStyle !== "simple" && <Divider my="xs" color={borderColor} />}

        {habitStyle === "streak" && (
          <Flex>
            <StreakItem number={currentStreak} icon="current" />
            <Divider mx="xs" orientation="vertical" color={borderColor} />
            <StreakItem number={bestStreak} icon="best" />
            <Divider mx="xs" orientation="vertical" color={borderColor} />
            <StreakItem number={completedCheks.length} icon="count" />
          </Flex>
        )}

        {habitStyle === "heatmap" && (
          <Flex justify="center">
            <Heatmap
              w={mapWidth}
              colors={[color]}
              domain={[0, 1]}
              data={heatmapData}
              rectRadius={10}
              rectSize={rectSize}
              firstDayOfWeek={1}
              startDate={startDate}
              endDate={today}
            />
          </Flex>
        )}
      </Stack>
    </Paper>
  );
};
