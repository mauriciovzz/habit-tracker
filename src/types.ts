export interface HabitInfo {
  id: number;
  name: string;
  color: string;
  reps: number;
  position: number;
  currentStreak: number;
  bestStreak: number;
}

export type HabitCreationData = Omit<HabitInfo, "id" | "position" | "currentStreak" | "bestStreak">;

export interface HabitCheck {
  habitId: number;
  date: string;
  count: number;
}

export type HabitStyle = "simple" | "streak" | "heatmap";
