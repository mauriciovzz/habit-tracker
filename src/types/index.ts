export type ISODate = string;

export interface Log {
  habitId: number;
  date: ISODate;
  count: number;
}

export interface Habit {
  id: number;
  name: string;
  color: string;
  reps: number;
  position: number;
  createdAt: ISODate;
  startedAt: ISODate;
}

export interface Metric {
  key: string;
  value: string;
}

export type HabitProps = Omit<
  Habit,
  "id" | "position" | "createdAt" | "startedAt"
>;

export interface LogData {
  date: ISODate;
  habit: Habit;
}
