import { type ReactNode, useState, useEffect, useMemo } from "react";
import { Center, Loader } from "@mantine/core";

import { habitsService } from "@/services";
import { MainLayout } from "@/layouts";
import { HabitsContext } from "./HabitsContext";

import type { Habit, HabitProps, Log, ISODate } from "@/types";

export const HabitsProvider = ({ children }: { children: ReactNode }) => {
  const [habits, setHabits] = useState<Habit[] | null>(null);
  const [logs, setLogs] = useState<Log[] | null>(null);

  const fetchData = async () => {
    try {
      const [fetchedHabits, fetchedLogs] = await Promise.all([
        habitsService.getHabits(),
        habitsService.getLogs(),
      ]);

      setHabits(fetchedHabits);
      setLogs(fetchedLogs);
    } catch {
      setHabits([]);
      setLogs([]);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchData();
  }, []);

  const logsByHabit = useMemo(() => {
    if (!logs) return new Map<number, Log[]>();

    const map = new Map<number, Log[]>();

    for (const log of logs) {
      const habitLogs = map.get(log.habitId);

      if (habitLogs) {
        habitLogs.push(log);
      } else {
        map.set(log.habitId, [log]);
      }
    }

    return map;
  }, [logs]);

  const addHabit = async (data: HabitProps) => {
    const habit = await habitsService.createHabit(data);
    setHabits((prev) => (prev ? [...prev, habit] : [habit]));
  };

  const updateHabit = async (id: number, data: HabitProps) => {
    const habit = habits?.find((h) => h.id === id);
    if (!habit) return;

    const updatedHabit = await habitsService.updateHabit(habit, data);

    setHabits(
      (prev) =>
        prev?.map((h) => (h.id === updatedHabit.id ? updatedHabit : h)) ?? null,
    );
  };

  const updateHabitPosition = async (id: number, newPos: number) => {
    const habit = habits?.find((h) => h.id === id);
    if (!habit || habit.position === newPos) return;

    const updatedHabits = await habitsService.updateHabitPosition(
      habit.id,
      habit.position,
      newPos,
    );

    setHabits(updatedHabits);
  };

  const deleteHabit = async (habit: Habit) => {
    const updatedHabits = await habitsService.deleteHabit(habit);

    setHabits(updatedHabits);
    setLogs((prev) => prev?.filter((l) => l.habitId !== habit.id) ?? null);
  };

  const deleteHabitLogs = async (habit: Habit) => {
    const updatedHabit = await habitsService.deleteLogs(habit);

    setHabits(
      (prev) =>
        prev?.map((h) => (h.id === updatedHabit.id ? updatedHabit : h)) ?? null,
    );

    setLogs((prev) => prev?.filter((l) => l.habitId !== habit.id) ?? null);
  };

  const updateHabitInState = (updatedHabit: Habit) => {
    setHabits(
      (prev) =>
        prev?.map((h) => (h.id === updatedHabit.id ? updatedHabit : h)) ?? null,
    );
  };

  const incrementLog = async (habit: Habit, date: ISODate) => {
    const { log, habit: updatedHabit } = await habitsService.incrementLog(
      habit,
      date,
    );

    updateHabitInState(updatedHabit);

    setLogs((prev) => {
      if (!prev) return [log];

      const index = prev.findIndex(
        (l) => l.habitId === log.habitId && l.date === log.date,
      );

      if (index === -1) return [...prev, log];

      const updated = [...prev];
      updated[index] = log;

      return updated;
    });
  };

  const decrementLog = async (habit: Habit, date: ISODate) => {
    const { log, habit: updatedHabit } = await habitsService.decrementLog(
      habit,
      date,
    );

    setHabits(
      (prev) =>
        prev?.map((h) => (h.id === updatedHabit.id ? updatedHabit : h)) ?? null,
    );

    setLogs((prev) => {
      if (!prev) return null;

      if (!log) {
        return prev.filter((l) => !(l.habitId === habit.id && l.date === date));
      }

      const index = prev.findIndex(
        (l) => l.habitId === log.habitId && l.date === log.date,
      );

      if (index === -1) {
        return [...prev, log];
      }

      const updated = [...prev];
      updated[index] = log;

      return updated;
    });
  };

  const resetLog = async (habit: Habit, date: ISODate) => {
    const { habit: updatedHabit } = await habitsService.resetLog(habit, date);

    setHabits(
      (prev) =>
        prev?.map((h) => (h.id === updatedHabit.id ? updatedHabit : h)) ?? null,
    );

    setLogs((prev) => {
      if (!prev) return null;

      return prev.filter((l) => !(l.habitId === habit.id && l.date === date));
    });
  };

  const fulfillLog = async (habit: Habit, date: ISODate) => {
    const { log, habit: updatedHabit } = await habitsService.fulfillLog(
      habit,
      date,
    );

    updateHabitInState(updatedHabit);

    setLogs((prev) => {
      if (!prev) return [log];

      const index = prev.findIndex(
        (l) => l.habitId === log.habitId && l.date === log.date,
      );

      if (index === -1) return [...prev, log];

      const updated = [...prev];
      updated[index] = log;

      return updated;
    });
  };

  // data management

  const downloadData = async () => {
    const data = await habitsService.downloadData();

    const json = JSON.stringify(data, null, 2);

    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "habits-backup.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const validateUpload = async (file: File) => {
    await habitsService.readBackup(file);
  };

  const uploadData = async (file: File) => {
    const data = await habitsService.readBackup(file);
    await habitsService.uploadData(data);
    await fetchData();
  };

  const deleteData = async () => {
    await habitsService.deleteData();

    setHabits([]);
    setLogs([]);
  };

  if (habits === null || logs === null) {
    return (
      <MainLayout>
        <Center flex={1}>
          <Loader color="var(--mantine-color-text)" size="md" />
        </Center>
      </MainLayout>
    );
  }

  return (
    <HabitsContext.Provider
      value={{
        habits,
        addHabit,
        updateHabit,
        updateHabitPosition,
        deleteHabit,
        deleteHabitLogs,

        logsByHabit,
        incrementLog,
        decrementLog,
        resetLog,
        fulfillLog,

        downloadData,
        validateUpload,
        uploadData,
        deleteData,
      }}
    >
      {children}
    </HabitsContext.Provider>
  );
};
