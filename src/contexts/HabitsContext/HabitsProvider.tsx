import { type ReactNode, useState, useEffect } from "react";
import type { Habit, HabitCretionProps, HabitUpdateProps, Log } from "../../types";
import habitsService from "../../services/habitsService";
import { HabitsContext } from "./HabitsContext";

export const HabitsProvider = ({ children }: { children: ReactNode }) => {
  const [habits, setHabits] = useState<Habit[]>([]);

  const getHabits = async () => {
    await habitsService.updateAllStreaks();
    await habitsService.getAll().then(setHabits);
  };

  useEffect(() => {
    void getHabits();
  }, []);

  const addHabit = async (data: HabitCretionProps) => {
    const newHabit = await habitsService.add(data);
    setHabits((prev) => [...prev, newHabit]);
  };

  const updateHabit = async (data: HabitUpdateProps) => {
    const updatedHabit = await habitsService.update(data);
    if (updatedHabit) {
      setHabits((prev) => prev.map((h) => (h.id === data.id ? updatedHabit : h)));
    }
  };

  const updateHabitPosition = async (habitId: number, fromPosition: number, toPosition: number) => {
    await habitsService.updatePosition(habitId, fromPosition, toPosition);

    const updated = [...habits];

    const habitIndex = updated.findIndex((h) => h.id === habitId);

    if (habitIndex === -1) return;

    // remove habit from old index
    const [moved] = updated.splice(fromPosition, 1);

    // insert habit into new index
    updated.splice(toPosition, 0, moved);

    setHabits(
      updated.map((h, index) => ({
        ...h,
        position: index,
      }))
    );
  };

  const resetHabit = async (habitId: number) => {
    await habitsService.reset(habitId);
    setHabits((prev) =>
      prev.map((h) => (h.id === habitId ? { ...h, logs: [], bestStreak: 0, currentStreak: 0 } : h))
    );
  };

  const deleteHabit = async (habitId: number) => {
    const updatedHabits = await habitsService.remove(habitId);
    setHabits(updatedHabits);
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

  const downloadData = async () => {
    const data = await habitsService.downloadData();

    const json = JSON.stringify(data, null, 2);

    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "habit-tracker-backup.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const uploadData = async (file: File) => {
    const text = await file.text();

    const data = JSON.parse(text) as {
      habits: Habit[];
      logs: Log[];
    };

    await habitsService.uploadData(data);
    await getHabits();
  };

  const deleteData = async () => {
    await habitsService.deleteData();
    setHabits([]);
  };

  return (
    <HabitsContext.Provider
      value={{
        habits,
        addHabit,
        updateHabit,
        updateHabitPosition,
        resetHabit,
        deleteHabit,
        updateLog,
        downloadData,
        uploadData,
        deleteData,
      }}
    >
      {children}
    </HabitsContext.Provider>
  );
};
