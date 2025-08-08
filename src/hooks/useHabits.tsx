import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";
import type { HabitInfo } from "../types";

export const useHabits = () => {
  const habits: HabitInfo[] = useLiveQuery(() => db.habits.toArray(), [], []);

  const addHabit = async (habit: HabitInfo): Promise<void> => {
    await db.habits.add(habit);
  };

  return {
    habits,
    addHabit,
  };
};
