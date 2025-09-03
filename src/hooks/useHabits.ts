import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";
import type { HabitInfo, HabitCreationData } from "../types";

export const useHabits = () => {
  const habits: HabitInfo[] = useLiveQuery(() => db.habits.toArray(), [], []);

  const addHabit = async ({ name, color, reps }: HabitCreationData): Promise<void> => {
    const position = await db.habits.count();

    await db.habits.add({
      name,
      color,
      reps,
      position,
      currentStreak: 0,
      bestStreak: 0,
    } as HabitInfo);
  };

  return {
    habits,
    addHabit,
  };
};
