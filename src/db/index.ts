// db.ts
import Dexie, { type Table } from "dexie";
import type { Habit, Log } from "../types";

class HabitTrackerDB extends Dexie {
  habits!: Table<Habit, number>;
  logs!: Table<Log, [number, string]>;

  constructor() {
    super("HabitTrackerDB");
    this.version(1).stores({
      habits: "++id, position",
      logs: "[habitId+date], habitId, date",
    });
  }
}

export const db = new HabitTrackerDB();
