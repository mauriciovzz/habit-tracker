export interface HabitInfo {
  id?: number;
  name: string;
  color: string;
  reps: number;
}

export interface HabitCheck {
  habitId: number;
  date: string;
}
