import { createContext, useContext } from "react";
import type { Habit, HabitCreation } from "../../types";

interface HabitsContextType {
  habits: Habit[];
  addHabit: (data: HabitCreation) => Promise<void>;
  updateLog: (habit: Habit, date: string) => Promise<void>;
}

export const HabitsContext = createContext<HabitsContextType | undefined>(undefined);

export const useHabits = () => {
  const context = useContext(HabitsContext);
  if (!context) {
    throw new Error("useHabits must be used within a TasksProvider");
  }
  return context;
};
