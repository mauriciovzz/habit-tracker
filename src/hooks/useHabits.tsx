import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";
import type { HabitInfo, HabitCreationData } from "../types";

export const useHabits = () => {
  const habits: HabitInfo[] = useLiveQuery(() => db.habits.toArray(), [], []);

  const addHabit = async (habit: HabitCreationData): Promise<void> => {
    await db.habits.add(habit as HabitInfo);
  };

  return {
    habits,
    addHabit,
  };
};
