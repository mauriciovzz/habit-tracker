import Dexie, { type EntityTable, type Table } from "dexie";

import type { Habit, Log } from "@/types";

class HabitTrackerDB extends Dexie {
  habits!: EntityTable<Habit, "id">;
  logs!: Table<Log, [number, string]>;

  constructor() {
    super("HabitTrackerDB");
    this.version(1).stores({
      habits: "++id, position",
      logs: "[habitId+date], habitId, date",
    });
  }
}

const db = new HabitTrackerDB();

export default db;
