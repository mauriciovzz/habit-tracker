import { useEffect, useState } from "react";
import dayjs from "dayjs";

import type { ISODate } from "@/types";

const getCurrentDate = (): ISODate => dayjs().format("YYYY-MM-DD");

const getPreviousDates = (date: string) => {
  const targetDate = dayjs(date);

  const dates = Array.from({ length: 2 }, (_, i) =>
    targetDate.subtract(i + 1, "day").format("YYYY-MM-DD"),
  );

  dates.reverse();
  dates.push(date);

  return dates;
};

export const useCurrentDate = () => {
  const [currentDate, setCurrentDate] = useState<ISODate>(getCurrentDate);
  const [pastDates, setPastDates] = useState<ISODate[]>(
    getPreviousDates(currentDate),
  );

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const scheduleNextUpdate = () => {
      const now = dayjs();
      const nextDay = now.add(1, "day").startOf("day");

      timeout = setTimeout(() => {
        const newDate = getCurrentDate();

        setCurrentDate(newDate);
        setPastDates(getPreviousDates(newDate));
        scheduleNextUpdate();
      }, nextDay.diff(now));
    };

    scheduleNextUpdate();

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return { currentDate, pastDates };
};
