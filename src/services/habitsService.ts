import dayjs from "dayjs";
import Dexie from "dexie";
import { z } from "zod";

import db from "@/db";

import type { Habit, HabitProps, Log, ISODate } from "@/types";
import { MAX_REPS } from "@/constants";

const getHabit = (id: number): Promise<Habit | undefined> => db.habits.get(id);

const getHabits = (): Promise<Habit[]> =>
  db.habits.orderBy("position").toArray();

const createHabit = async (data: HabitProps): Promise<Habit> => {
  const position = await db.habits.count();
  const today = dayjs().format("YYYY-MM-DD");

  const newHabit = {
    ...data,
    position,
    createdAt: today,
    startedAt: today,
  };

  const id = await db.habits.add(newHabit);

  return { id, ...newHabit };
};

const updateHabit = async (
  habit: Habit,
  newData: HabitProps,
): Promise<Habit> => {
  const updatedHabit: Habit = {
    ...habit,
    ...newData,
  };

  await db.habits.put(updatedHabit);

  return updatedHabit;
};

const updateHabitPosition = async (
  id: number,
  oldPos: number,
  newPos: number,
): Promise<Habit[]> => {
  await db.transaction("rw", db.habits, async () => {
    if (oldPos < newPos) {
      await db.habits
        .where("position")
        .between(oldPos + 1, newPos, true, true)
        .modify((h) => {
          h.position -= 1;
        });
    } else {
      await db.habits
        .where("position")
        .between(newPos, oldPos - 1, true, true)
        .modify((h) => {
          h.position += 1;
        });
    }

    await db.habits.update(id, { position: newPos });
  });

  return getHabits();
};

const deleteHabit = async (habit: Habit): Promise<Habit[]> => {
  await db.transaction("rw", db.habits, db.logs, async () => {
    await deleteLogs(habit);
    await db.habits.delete(habit.id);

    const habits = await db.habits.orderBy("position").toArray();

    const updatedHabits = habits.map((h, i) => ({ ...h, position: i }));
    await db.habits.bulkPut(updatedHabits);
  });

  return await getHabits();
};

const getLogs = (): Promise<Log[]> => db.logs.orderBy("date").toArray();

const syncStartedAt = async (habit: Habit): Promise<Habit> => {
  const earliestLog = await db.logs
    .where("[habitId+date]")
    .between([habit.id, Dexie.minKey], [habit.id, Dexie.maxKey])
    .first();

  const startedAt = earliestLog?.date ?? habit.createdAt;

  if (startedAt !== habit.startedAt) {
    await db.habits.update(habit.id, { startedAt });

    return {
      ...habit,
      startedAt,
    };
  }

  return habit;
};

const incrementLog = async (
  habit: Habit,
  date: ISODate,
): Promise<{ log: Log; habit: Habit }> => {
  let log!: Log;
  let updatedHabit = habit;

  await db.transaction("rw", db.logs, db.habits, async () => {
    const existingLog = await db.logs.get([habit.id, date]);

    if (!existingLog) {
      log = {
        habitId: habit.id,
        date,
        count: 1,
      };

      await db.logs.add(log);
    } else {
      if (existingLog.count < MAX_REPS) {
        const count = existingLog.count + 1;
        await db.logs.update([habit.id, date], { count });

        log = {
          ...existingLog,
          count,
        };

        updatedHabit = await syncStartedAt(habit);
      } else {
        log = { ...existingLog };
      }
    }
  });

  return {
    log,
    habit: updatedHabit,
  };
};

const decrementLog = async (
  habit: Habit,
  date: ISODate,
): Promise<{ log: Log | null; habit: Habit }> => {
  let log: Log | null = null;
  let updatedHabit = habit;

  await db.transaction("rw", db.logs, db.habits, async () => {
    const existingLog = await db.logs.get([habit.id, date]);

    if (!existingLog) {
      return;
    }

    const count = existingLog.count - 1;

    if (count <= 0) {
      await db.logs.delete([habit.id, date]);
    } else {
      await db.logs.update([habit.id, date], { count });
    }

    log =
      count > 0
        ? {
            ...existingLog,
            count,
          }
        : null;

    updatedHabit = await syncStartedAt(habit);
  });

  return {
    log,
    habit: updatedHabit,
  };
};

const resetLog = async (
  habit: Habit,
  date: ISODate,
): Promise<{ log: null; habit: Habit }> => {
  let updatedHabit = habit;

  await db.transaction("rw", db.logs, db.habits, async () => {
    await db.logs.delete([habit.id, date]);

    updatedHabit = await syncStartedAt(habit);
  });

  return {
    log: null,
    habit: updatedHabit,
  };
};

const fulfillLog = async (
  habit: Habit,
  date: ISODate,
): Promise<{ log: Log; habit: Habit }> => {
  let log!: Log;
  let updatedHabit = habit;

  await db.transaction("rw", db.logs, db.habits, async () => {
    const existingLog = await db.logs.get([habit.id, date]);
    const count = habit.reps;

    if (!existingLog) {
      log = {
        habitId: habit.id,
        date,
        count,
      };

      await db.logs.add(log);
    } else {
      await db.logs.update([habit.id, date], { count });

      log = {
        ...existingLog,
        count,
      };
    }

    updatedHabit = await syncStartedAt(habit);
  });

  return {
    log,
    habit: updatedHabit,
  };
};

const deleteLogs = async (habit: Habit) => {
  await db.transaction("rw", db.logs, db.habits, async () => {
    await db.logs.where("habitId").equals(habit.id).delete();

    await db.habits.update(habit.id, {
      startedAt: habit.createdAt,
    });
  });

  return {
    ...habit,
    startedAt: habit.createdAt,
  };
};

// data handling

const BACKUP_VERSION = 1;

const isoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
  .refine((date) => dayjs(date, "YYYY-MM-DD", true).isValid(), {
    message: "Invalid date",
  });

const habitSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  color: z.string(),
  reps: z.number().int().min(1).max(100),
  position: z.number().int().min(0),
  createdAt: isoDateSchema,
  startedAt: isoDateSchema,
});

const logSchema = z.object({
  habitId: z.number().int(),
  date: isoDateSchema,
  count: z.number().int().min(1),
});

const backupSchema = z.object({
  version: z.literal(BACKUP_VERSION),
  habits: z.array(habitSchema),
  logs: z.array(logSchema),
});

type HabitBackup = z.infer<typeof backupSchema>;

const downloadData = async (): Promise<HabitBackup> => {
  const [habits, logs] = await Promise.all([
    db.habits.toArray(),
    db.logs.toArray(),
  ]);

  return {
    version: BACKUP_VERSION,
    habits,
    logs,
  };
};

const readBackup = async (file: File): Promise<HabitBackup> => {
  let data: unknown;

  // Parse JSON
  try {
    const text = await file.text();
    data = JSON.parse(text);
  } catch {
    throw new Error();
  }

  // Validate structure and values
  const result = backupSchema.safeParse(data);

  if (!result.success) {
    throw new Error();
  }

  const backup = result.data;

  // Validate unique habit IDs
  const habitIds = new Set<number>();

  for (const habit of backup.habits) {
    if (habitIds.has(habit.id)) {
      throw new Error();
    }

    habitIds.add(habit.id);
  }

  // Validate unique positions
  const positions = new Set<number>();

  for (const habit of backup.habits) {
    if (positions.has(habit.position)) {
      throw new Error();
    }

    positions.add(habit.position);
  }

  // Validate log → habit relationships
  for (const log of backup.logs) {
    if (!habitIds.has(log.habitId)) {
      throw new Error();
    }

    const habit = backup.habits.find((h) => h.id === log.habitId);

    if (habit && log.count > habit.reps) {
      throw new Error();
    }
  }

  // Validate unique logs
  const logKeys = new Set<string>();

  for (const log of backup.logs) {
    const key = `${log.habitId.toString()}:${log.date}`;

    if (logKeys.has(key)) {
      throw new Error();
    }

    logKeys.add(key);
  }

  return backup;
};

const uploadData = async (data: HabitBackup) => {
  const { habits, logs } = data;

  await db.transaction("rw", db.habits, db.logs, async () => {
    await db.habits.clear();
    await db.logs.clear();

    if (habits.length) {
      await db.habits.bulkAdd(habits);
    }

    if (logs.length) {
      await db.logs.bulkAdd(logs);
    }
  });
};

const deleteData = async () => {
  await db.transaction("rw", db.habits, db.logs, async () => {
    await db.habits.clear();
    await db.logs.clear();
  });
};

export default {
  getHabit,
  getHabits,
  createHabit,
  updateHabit,
  updateHabitPosition,
  deleteHabit,

  getLogs,
  incrementLog,
  decrementLog,
  resetLog,
  fulfillLog,
  deleteLogs,

  downloadData,
  readBackup,
  uploadData,
  deleteData,
};
