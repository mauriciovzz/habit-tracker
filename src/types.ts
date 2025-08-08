export interface HabitInfo {
  id: number;
  name: string;
  color: string;
  reps: number;
}

export type HabitCreationData = Omit<HabitInfo, "id">;

export interface HabitCheck {
  habitId: number;
  date: string;
  count: number;
}
