import { createContext, useContext } from "react";
import type { Habit, HabitCretionProps, HabitUpdateProps } from "../../types";

interface HabitsContextType {
  habits: Habit[];
  loadingHabits: boolean;
  addHabit: (data: HabitCretionProps) => Promise<void>;
  updateHabit: (data: HabitUpdateProps) => Promise<void>;
  updateHabitPosition: (habitId: number, fromPosition: number, toPosition: number) => Promise<void>;
  resetHabit: (habitId: number) => Promise<void>;
  deleteHabit: (habitId: number) => Promise<void>;
  updateLog: (habit: Habit, date: string) => Promise<void>;
  downloadData: () => Promise<void>;
  uploadData: (file: File) => Promise<void>;
  deleteData: () => Promise<void>;
}

export const HabitsContext = createContext<HabitsContextType | undefined>(undefined);

export const useHabits = () => {
  const context = useContext(HabitsContext);
  if (!context) {
    throw new Error("useHabits must be used within a TasksProvider");
  }
  return context;
};
