export interface Habit {
  id: number;
  name: string;
  color: string;
  reps: number;
  position: number;
  currentStreak: number;
  bestStreak: number;
  logs: LogData[];
}

export type HabitCreation = Omit<
  Habit,
  "id" | "position" | "currentStreak" | "bestStreak" | "logs"
>;

export interface Log {
  habitId: number;
  date: string;
  count: number;
}

export type LogData = Omit<Log, "habitId">;

export type HabitStyle = "simple" | "streak" | "heatmap";
