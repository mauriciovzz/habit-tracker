import { useLayoutEffect, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Box, Flex, ScrollArea, Stack, Text } from "@mantine/core";
import { Heatmap } from "@mantine/charts";
import dayjs from "dayjs";
import chroma from "chroma-js";

import type { Habit, Log } from "@/types";

interface Props {
  habit: Habit;
  logs: Log[];
}

const RECT_SIZE = 10;
const CELL_GAP = 1;

export const HabitHeatmap = ({ habit: { color, reps }, logs }: Props) => {
  const { t } = useTranslation();

  const colors = chroma
    .scale([chroma(color).brighten(2), color])
    .mode("lab")
    .colors(10);

  const { startDate, endDate } = useMemo(() => {
    const endDate = dayjs().toDate();
    const startDate = dayjs(endDate).subtract(1, "year").toDate();

    return {
      startDate,
      endDate,
    };
  }, []);

  const heatmapData = useMemo(() => {
    const data: Record<string, number> = {};

    for (const log of logs) {
      data[log.date] = log.count / reps;
    }

    return data;
  }, [logs, reps]);

  const months = t("months.short", {
    returnObjects: true,
  }) as string[];

  const weekdays = t("daysOfWeek", {
    returnObjects: true,
  }) as string[];

  const viewport = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let frame2: number;

    const frame1 = requestAnimationFrame(() => {
      frame2 = requestAnimationFrame(() => {
        const el = viewport.current;
        if (!el) return;

        el.scrollLeft = el.scrollWidth;
      });
    });

    return () => {
      cancelAnimationFrame(frame1);
      cancelAnimationFrame(frame2);
    };
  }, []);

  return (
    <>
      <Stack gap={0} w={32} h={(RECT_SIZE + CELL_GAP) * 7 + 20}>
        <Box h={14} />

        <Stack h={(RECT_SIZE + CELL_GAP) * 7} gap={0}>
          {weekdays.map((day, index) => (
            <Flex
              key={day}
              h={RECT_SIZE + CELL_GAP}
              align="center"
              justify="center"
            >
              {index % 2 !== 0 ? (
                ""
              ) : (
                <Text
                  size="12px"
                  w="100%"
                  c="var(--mantine-color-dimmed)"
                  ta="start"
                >
                  {day}
                </Text>
              )}
            </Flex>
          ))}
        </Stack>
      </Stack>

      <ScrollArea
        viewportRef={viewport}
        flex={1}
        type="always"
        scrollbars="x"
        offsetScrollbars="x"
        scrollbarSize={6}
      >
        <Heatmap
          data={heatmapData}
          colors={colors}
          domain={[0, 1]}
          rectSize={RECT_SIZE}
          rectRadius={5}
          gap={CELL_GAP}
          startDate={startDate}
          endDate={endDate}
          style={{ minWidth: "max-content" }}
          withMonthLabels
          monthLabels={months}
        />
      </ScrollArea>
    </>
  );
};
