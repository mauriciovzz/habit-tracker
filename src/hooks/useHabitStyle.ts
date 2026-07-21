import { useState, useCallback, useEffect } from "react";
import type { HabitStyle } from "../types";

const styles: HabitStyle[] = ["simple", "streaks", "dots"];

export function useHabitStyle() {
  const [habitStyle, setHabitStyle] = useState<HabitStyle>(() => {
    return (
      (localStorage.getItem("habit-style") as HabitStyle | null) ?? "simple"
    );
  });

  const toggleHabitStyle = useCallback((next?: HabitStyle) => {
    if (next) {
      setHabitStyle(next);
      return;
    }

    setHabitStyle((current) => {
      const currentIndex = styles.indexOf(current);
      const nextIndex = (currentIndex + 1) % styles.length;
      return styles[nextIndex];
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("habit-style", habitStyle);
  }, [habitStyle]);

  return [habitStyle, toggleHabitStyle] as const;
}
