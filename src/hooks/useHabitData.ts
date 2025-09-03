import {
  format,
  parseISO,
  differenceInCalendarDays,
  isToday,
  isYesterday,
  compareAsc,
} from "date-fns";
import type { HabitInfo } from "../types";
import { useHabitChecks } from "./useHabitChecks";
import { db } from "../db";

const recomputeStreaks = async ({ habitId, reps }: { habitId: number; reps: number }) => {
  const checks = await db.habitChecks.where("habitId").equals(habitId).sortBy("date");
  const completedChecks = checks.filter((c) => c.count === reps);

  if (completedChecks.length === 0) {
    await db.habits.update(habitId, {
      currentStreak: 0,
      bestStreak: 0,
    });
    return;
  }

  // Sort dates
  const dates = completedChecks.map((c) => parseISO(c.date)).sort(compareAsc);

  let currentStreak = 1;
  let bestStreak = 1;

  for (let i = 1; i < dates.length; i++) {
    const diff = differenceInCalendarDays(dates[i], dates[i - 1]);

    if (diff === 1) {
      currentStreak++;
    } else if (diff > 1) {
      currentStreak = 1;
    }

    bestStreak = Math.max(bestStreak, currentStreak);
  }

  // Current streak is valid only if last check is today or yesterday
  const lastCheck = dates[dates.length - 1];
  let realCurrentStreak = 0;

  if (isToday(lastCheck) || isYesterday(lastCheck)) {
    realCurrentStreak = currentStreak;
  }

  await db.habits.update(habitId, {
    currentStreak: realCurrentStreak,
    bestStreak,
  });
};

export const useHabitData = (habit: HabitInfo) => {
  const { checks, addCheck, getTodayCheck, updateCheckCount } = useHabitChecks(habit.id);

  const date = format(new Date(), "yyyy-MM-dd");
  const todayCheck = checks.find((c) => c.date === date);
  const count = todayCheck?.count ?? 0;

  const progress = (count / habit.reps) * 100;
  const isTodayComplete = progress >= 100;

  const updateProgress = async () => {
    const today = format(new Date(), "yyyy-MM-dd");
    const todayCheck = await getTodayCheck(today);

    // reset
    if (todayCheck && todayCheck.count >= habit.reps) {
      await updateCheckCount({
        date: today,
        count: 0,
      });

      await recomputeStreaks({ habitId: habit.id, reps: habit.reps });
    }

    // increment
    if (todayCheck && todayCheck.count < habit.reps) {
      await updateCheckCount({
        date: today,
        count: todayCheck.count + 1,
      });

      if (todayCheck.count + 1 === habit.reps) {
        await recomputeStreaks({ habitId: habit.id, reps: habit.reps });
      }
    } else if (!todayCheck) {
      await addCheck(today);
    }
  };

  return { checks, progress, isTodayComplete, updateProgress };
};
