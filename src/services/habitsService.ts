import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
dayjs.extend(isToday);
dayjs.extend(isYesterday);
import { db } from "../db";
import type { Habit, HabitCreation, Log, LogData } from "../types";
import Dexie from "dexie";

interface Streaks {
  currentStreak: number;
  bestStreak: number;
}

const getLogsForHabit = async (habitId: number): Promise<LogData[]> => {
  const logs = await db.logs
    .where("[habitId+date]")
    .between([habitId, Dexie.minKey], [habitId, Dexie.maxKey])
    .toArray();

  return logs.map(({ date, count }) => ({ date, count }));
};

const addLog = async ({ habitId, date }: { habitId: number; date: string }): Promise<LogData[]> => {
  await db.logs.add({ habitId, date, count: 1 });
  return getLogsForHabit(habitId);
};

const updateLogCount = async ({ habitId, date, count }: Log): Promise<LogData[]> => {
  await db.logs.update([habitId, date], { count: count });
  return getLogsForHabit(habitId);
};

const updateStreaks = async (habit: Habit, logs: LogData[]): Promise<Streaks> => {
  const completedLogs = logs.filter((l) => l.count === habit.reps);

  if (completedLogs.length === 0) {
    await db.habits.update(habit.id, { currentStreak: 0, bestStreak: 0 });
    return { currentStreak: 0, bestStreak: 0 };
  }

  let currentStreak = 1;
  let bestStreak = 1;

  if (completedLogs.length === 1) {
    await db.habits.update(habit.id, { currentStreak: 1, bestStreak: 1 });
    return { currentStreak: 1, bestStreak: 1 };
  }

  for (let i = 1; i < completedLogs.length; i++) {
    const prev = dayjs(completedLogs[i].date);
    const curr = dayjs(completedLogs[i - 1].date);
    const diff = prev.diff(curr, "day");

    currentStreak = diff === 1 ? currentStreak + 1 : 1;
    bestStreak = Math.max(bestStreak, currentStreak);
  }

  const lastCheck = dayjs(completedLogs[completedLogs.length - 1].date);
  const realCurrentStreak = lastCheck.isToday() || lastCheck.isYesterday() ? currentStreak : 0;

  const newStreaks = {
    currentStreak: realCurrentStreak,
    bestStreak,
  };

  await db.habits.update(habit.id, newStreaks);

  return newStreaks;
};

// --

const getAll = async (): Promise<Habit[]> => {
  const habits = await db.habits.orderBy("position").toArray();

  for (const habit of habits) {
    habit.logs = await getLogsForHabit(habit.id);
  }

  return habits;
};

const add = async ({ name, color, reps }: HabitCreation): Promise<Habit> => {
  const position = await db.habits.count();

  const newHabit = {
    name,
    color,
    reps,
    position,
    currentStreak: 0,
    bestStreak: 0,
  };

  const id = await db.habits.add(newHabit as Habit);
  return { id, ...newHabit, logs: [] };
};

const updateAllStreaks = async (): Promise<void> => {
  const habits = await getAll();

  for (const habit of habits) {
    await updateStreaks(habit, habit.logs);
  }
};

const updateHabitLog = async (habit: Habit, date: string) => {
  const { id, reps, logs } = habit;
  const log = logs.find((l) => l.date === date);

  // reset count + update streaks
  if (log && log.count >= reps) {
    const updatedLogs = await updateLogCount({ habitId: id, date, count: 0 });
    const streaks = await updateStreaks(habit, updatedLogs);

    return { ...streaks, log: { date, count: 0 } };
  }

  // increment count + update streaks if its complete
  if (log) {
    const newCount = log.count + 1;
    const updatedLogs = await updateLogCount({ habitId: id, date, count: newCount });

    let streaks = { currentStreak: habit.currentStreak, bestStreak: habit.bestStreak };

    if (newCount === reps) {
      streaks = await updateStreaks(habit, updatedLogs);
    }

    return { ...streaks, log: { date, count: newCount } };
  }

  // create log + update streaks if its complete
  const updatedLogs = await addLog({ habitId: id, date });
  let streaks = { currentStreak: habit.currentStreak, bestStreak: habit.bestStreak };

  if (reps === 1) {
    streaks = await updateStreaks(habit, updatedLogs);
  }

  return { ...streaks, log: { date, count: 1 } };
};

export default { getAll, add, updateAllStreaks, updateHabitLog };
