import { type ReactNode, useState, useEffect } from "react";
import type { Habit, HabitCreation } from "../../types";
import habitsService from "../../services/habitsService";
import { HabitsContext } from "./HabitsContext";

export const HabitsProvider = ({ children }: { children: ReactNode }) => {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    void habitsService.updateAllStreaks();
    void habitsService.getAll().then(setHabits);
  }, []);

  const addHabit = async (data: HabitCreation) => {
    const newHabit = await habitsService.add(data);
    setHabits((prev) => [...prev, newHabit]);
  };

  const updateLog = async (habit: Habit, date: string) => {
    const updatedData = await habitsService.updateHabitLog(habit, date);

    setHabits((prev) =>
      prev.map((h) =>
        h.id === habit.id
          ? {
              ...h,
              logs: habit.logs.some((l) => l.date === date)
                ? habit.logs.map((l) => (l.date === date ? updatedData.log : l))
                : [...habit.logs, updatedData.log],
              currentStreak: updatedData.currentStreak,
              bestStreak: updatedData.bestStreak,
            }
          : h
      )
    );
  };

  return (
    <HabitsContext.Provider value={{ habits, addHabit, updateLog }}>
      {children}
    </HabitsContext.Provider>
  );
};
