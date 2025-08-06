export interface HabitInfo {
  id: number;
  name: string;
  color: string;
  reps: number;
}

export type HabitCreationData = Omit<HabitInfo, "id">;
