import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";

import type { Habit, Log, Metric } from "@/types";

dayjs.extend(isToday);
dayjs.extend(isYesterday);

const calculate = (habit: Habit, logs: Log[]): Metric[] => {
  // completed logs calculation
  const completedLogs = logs
    .filter((log) => log.count >= habit.reps)
    .sort((a, b) => a.date.localeCompare(b.date));

  if (completedLogs.length === 0) {
    return [
      { key: "metrics.streak", value: "0" },
      { key: "metrics.percentage", value: "0" },
      { key: "metrics.total", value: "0" },
    ];
  }

  // streaks calculation
  let streak = 1;
  let bestStreak = 1;

  for (let i = 1; i < completedLogs.length; i++) {
    const previous = dayjs(completedLogs[i - 1].date);
    const currentDay = dayjs(completedLogs[i].date);

    if (currentDay.diff(previous, "day") === 1) {
      streak++;
    } else {
      streak = 1;
    }

    bestStreak = Math.max(bestStreak, streak);
  }

  const lastCompleted = dayjs(completedLogs.at(-1)?.date);

  // completion rate calculation
  const totalDays = dayjs().diff(habit.startedAt, "day") + 1;
  const totalChecksRequired = totalDays * habit.reps;

  const totalChecksCompleted = logs.reduce(
    (sum, log) => sum + Math.min(log.count, habit.reps),
    0,
  );

  const ratio =
    totalChecksRequired === 0
      ? "100"
      : Math.round(
          (totalChecksCompleted / totalChecksRequired) * 100,
        ).toString();

  return [
    {
      key: "metrics.streak",
      value:
        lastCompleted.isToday() || lastCompleted.isYesterday()
          ? streak.toString()
          : "0",
    },
    { key: "metrics.percentage", value: ratio },
    { key: "metrics.total", value: completedLogs.length.toString() },
  ];
};

export default { calculate };
