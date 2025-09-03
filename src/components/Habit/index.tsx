import type { HabitInfo, HabitStyle } from "../../types";
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
import { useHabitData } from "../../hooks/useHabitData";
import { useHeatmapLayout } from "../../hooks/useHeatmapLayout";
import { IconFlame, IconCrown, IconChecks } from "@tabler/icons-react";

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

interface HabitTypes {
  habit: HabitInfo;
  habitStyle: HabitStyle;
}

export const Habit = ({ habit, habitStyle }: HabitTypes) => {
  const { checks, progress, updateProgress, isTodayComplete } = useHabitData(habit);

  let heatmapData: Record<string, number> = {};
  const completedCheks = checks.filter((key) => key.count === habit.reps);
  heatmapData = Object.fromEntries(completedCheks.map((key) => [key.date, 1]));

  // handle heatmap size and responsiveness
  const rectSize = 12;
  const { ref, startDate, today, mapWidth } = useHeatmapLayout(rectSize);

  // handle color
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const defaultBorderColor = colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3];
  const borderColor = isTodayComplete ? habit.color : defaultBorderColor;

  return (
    <Paper p="xs" bd={`1px solid ${borderColor}`} bdrs="lg">
      <Stack gap={0}>
        <div ref={ref} />

        <Flex justify="center">
          <Group w={mapWidth}>
            <Text flex={1} size="md" inline lineClamp={2} fw={600}>
              {habit.name}
            </Text>
            <ProgressButton
              color={habit.color}
              progress={progress}
              updateProgress={updateProgress}
            />
          </Group>
        </Flex>

        {habitStyle !== "simple" && <Divider my="xs" color={borderColor} />}

        {habitStyle === "streak" && (
          <Flex>
            <StreakItem number={habit.currentStreak} icon="current" />
            <Divider mx="xs" orientation="vertical" color={borderColor} />
            <StreakItem number={habit.bestStreak} icon="best" />
            <Divider mx="xs" orientation="vertical" color={borderColor} />
            <StreakItem number={completedCheks.length} icon="count" />
          </Flex>
        )}

        {habitStyle === "heatmap" && (
          <Flex justify="center">
            <Heatmap
              w={mapWidth}
              colors={[habit.color]}
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
