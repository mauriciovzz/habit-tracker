import { createContext, useContext } from "react";

import type { Habit, HabitProps, ISODate, Log } from "@/types";

interface HabitsContextType {
  habits: Habit[];
  addHabit: (data: HabitProps) => Promise<void>;
  updateHabit: (id: number, data: HabitProps) => Promise<void>;
  updateHabitPosition: (id: number, newPos: number) => Promise<void>;
  deleteHabit: (habit: Habit) => Promise<void>;
  deleteHabitLogs: (habit: Habit) => Promise<void>;

  logsByHabit: Map<number, Log[]>;
  incrementLog: (habit: Habit, date: ISODate) => Promise<void>;
  decrementLog: (habit: Habit, date: ISODate) => Promise<void>;
  resetLog: (habit: Habit, date: ISODate) => Promise<void>;
  fulfillLog: (habit: Habit, date: ISODate) => Promise<void>;

  downloadData: () => Promise<void>;
  validateUpload: (file: File) => Promise<void>;
  uploadData: (file: File) => Promise<void>;
  deleteData: () => Promise<void>;
}

export const HabitsContext = createContext<HabitsContextType | undefined>(
  undefined,
);

export const useHabits = () => {
  const context = useContext(HabitsContext);
  if (!context) {
    throw new Error("useHabits must be used within a TasksProvider");
  }
  return context;
};
