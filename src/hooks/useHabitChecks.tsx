import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";
import type { HabitCheck } from "../types";

export const useHabitChecks = (habitId: number) => {
  const checks: HabitCheck[] = useLiveQuery(
    () => db.habitChecks.where("habitId").equals(habitId).toArray(),
    [],
    []
  );

  const addCheck = async (date: string) => {
    await db.habitChecks.add({
      habitId: habitId,
      date: date,
      count: 1,
    });
  };

  const getTodayCheck = async (date: string) => {
    return await db.habitChecks.where({ habitId: habitId, date: date }).first();
  };

  const updateCheckCount = async ({ date, count }: { date: string; count: number }) => {
    await db.habitChecks.update([habitId, date], {
      count: count,
    });
  };

  return {
    checks,
    addCheck,
    getTodayCheck,
    updateCheckCount,
  };
};
