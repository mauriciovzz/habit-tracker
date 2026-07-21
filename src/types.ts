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

export type HabitCretionProps = Omit<
  Habit,
  "id" | "position" | "currentStreak" | "bestStreak" | "logs"
>;

export type HabitUpdateProps = Omit<
  Habit,
  "position" | "currentStreak" | "bestStreak" | "logs"
>;

export interface Log {
  habitId: number;
  date: string;
  count: number;
}

export type LogData = Omit<Log, "habitId">;

export type HabitStyle = "simple" | "streaks" | "dots";

export type SettingsView = "menu" | "reorder" | "data";
