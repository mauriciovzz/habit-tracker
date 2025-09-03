import { useElementSize } from "@mantine/hooks";
import { sub } from "date-fns";

export function useHeatmapLayout(rectSize: number) {
  const { ref, width } = useElementSize();

  const totalWeeks = Math.floor(width / (rectSize + 1));
  const today = new Date();
  const startDate = sub(today, { weeks: totalWeeks - 1 });

  const mapWidth = totalWeeks * (rectSize + 1) + 1;

  return { ref, startDate, today, mapWidth };
}
