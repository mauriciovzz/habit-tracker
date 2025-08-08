import { format, sub } from "date-fns";
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
import { useElementSize } from "@mantine/hooks";
import { Heatmap } from "@mantine/charts";
import type { HabitInfo } from "../types";
import { ProgressButton } from "./ProgressButton";
import { useHabitChecks } from "../hooks/useHabitChecks";

export const HeatmapHabit = ({ habit }: { habit: HabitInfo }) => {
  const { checks, addCheck, getTodayCheck, updateCheckCount } = useHabitChecks(habit.id);

  const date = format(new Date(), "yyyy-MM-dd");
  const todayCheck = checks.find((c) => c.date === date);
  const count = todayCheck?.count ?? 0;
  const progress = (count / habit.reps) * 100;

  let heatmapData: Record<string, number> = {};
  heatmapData = Object.fromEntries(
    checks.filter((key) => key.count === habit.reps).map((key) => [key.date, 1])
  );

  // handle heatmap responsiveness
  const { ref, width } = useElementSize();
  const rectSize = 12;

  const totalWeeks = Math.floor(width / (rectSize + 1));
  const today = new Date();
  const startDate = sub(today, { weeks: totalWeeks - 1 });
  const mapWidth = totalWeeks * (rectSize + 1) + 1;

  // handke color
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const defaultBorderColor = colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3];
  const borderColor = progress === 100 ? habit.color : defaultBorderColor;

  // Handle check data
  const incrementHabitCount = async () => {
    const today = format(new Date(), "yyyy-MM-dd");
    const todayCheck = await getTodayCheck(today);

    if (todayCheck) {
      if (todayCheck.count < habit.reps) {
        await updateCheckCount({
          date: today,
          count: todayCheck.count + 1,
        });
      }
    } else {
      await addCheck(today);
    }
  };

  const resetHabitCount = async () => {
    const today = format(new Date(), "yyyy-MM-dd");
    const todayCheck = await getTodayCheck(today);

    if (todayCheck && todayCheck.count === habit.reps) {
      await updateCheckCount({
        date: today,
        count: 0,
      });
    }
  };

  const updateProgress = async () => {
    if (progress === 100) {
      await resetHabitCount();
    } else {
      await incrementHabitCount();
    }
  };

  return (
    <Paper p="xs" bd={`1px solid ${borderColor}`} bdrs="lg">
      <Stack gap={0}>
        <div ref={ref} />

        <Flex justify="center">
          <Group w={mapWidth}>
            <Text flex={1} size="md" lineClamp={2} fw={600}>
              {habit.name}
            </Text>
            <ProgressButton
              progress={progress}
              color={habit.color}
              updateProgress={updateProgress}
            />
          </Group>
        </Flex>

        <Divider my="xs" color={borderColor} />

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
      </Stack>
    </Paper>
  );
};
