import type { Habit } from "../types";
import { Flex, ScrollArea, Space, Stack, Text } from "@mantine/core";
import { Heatmap } from "@mantine/charts";
import { useElementSize } from "@mantine/hooks";
import dayjs from "dayjs";
import { useMemo } from "react";

interface HabitItemProps {
  habit: Habit;
  showFullYear?: boolean;
}

const rectSize = 12;

export const HabitHeatmap = ({ habit, showFullYear }: HabitItemProps) => {
  const { ref, width } = useElementSize();
  const { color, reps, logs } = habit;

  const { startDate, endDate, mapWidth } = useMemo(() => {
    let startDate: Date | string;
    let endDate: Date | string;
    let mapWidth: number;

    if (showFullYear) {
      const year = dayjs().year();
      startDate = `${year.toString()}-01-01`;
      endDate = `${year.toString()}-12-31`;

      const totalWeeks = dayjs(endDate).diff(dayjs(startDate), "weeks");
      mapWidth = totalWeeks * (rectSize + 1) + 1;

      return { startDate, endDate, mapWidth };
    } else {
      const totalWeeks = Math.floor(width / (rectSize + 1));

      endDate = new Date();

      startDate = dayjs()
        .subtract(Math.max(totalWeeks - 1, 0), "weeks")
        .toDate();

      mapWidth = totalWeeks * (rectSize + 1) + 1;

      return { startDate, endDate, mapWidth };
    }
  }, [width, showFullYear]);

  let heatmapData: Record<string, number> = {};
  const completedLogs = logs.filter((key) => key.count === reps);
  heatmapData = Object.fromEntries(completedLogs.map((key) => [key.date, 1]));

  const renderMap = () => (
    <Heatmap
      w={mapWidth}
      colors={[color]}
      domain={[0, 1]}
      data={heatmapData}
      rectRadius={10}
      rectSize={rectSize}
      firstDayOfWeek={0}
      startDate={startDate}
      endDate={endDate}
      withMonthLabels={showFullYear}
      styles={{
        monthLabel: {
          fontSize: "small",
          fontWeight: 600,
        },
      }}
      style={{ minWidth: mapWidth }}
    />
  );

  return showFullYear ? (
    <Flex>
      {/* Fixed weekday labels */}
      <Flex direction="column" h={114} w="32">
        <Space h={14} />
        <Stack flex={1} gap={0} justify="space-between">
          {["Mon", "Wed", "Fri", "Sun"].map((day) => (
            <Text key={day} h={15} fw={600} size="xs" c="#868e96">
              {day}
            </Text>
          ))}
        </Stack>

        <Space h={7} />
      </Flex>

      {/* Scrollable heatmap */}
      <ScrollArea w="100%" offsetScrollbars scrollbarSize={6} type="auto">
        {renderMap()}
      </ScrollArea>
    </Flex>
  ) : (
    <>
      <div ref={ref} style={{ width: "100%" }} />
      <Flex justify="center">{renderMap()}</Flex>
    </>
  );
};
