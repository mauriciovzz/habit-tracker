// db.ts
import Dexie, { type Table } from "dexie";
import type { HabitInfo, HabitCheck } from "../types";

class HabitTrackerDB extends Dexie {
  habits!: Table<HabitInfo, number>;
  habitChecks!: Table<HabitCheck, [number, string]>;

  constructor() {
    super("HabitTrackerDB");
    this.version(1).stores({
      habits: "++id, name, color, reps",
      habitChecks: "[habitId+date], habitId, date",
    });
  }
}

export const db = new HabitTrackerDB();
