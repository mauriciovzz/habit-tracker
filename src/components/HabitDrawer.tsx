import dayjs from "dayjs";
import { Drawer, Flex, RingProgress, Text } from "@mantine/core";
import { Calendar, type DatePickerProps } from "@mantine/dates";
import type { Habit } from "../types";
import { useHabits } from "../contexts/HabitsContext";

interface HabitDrawerProps {
  habitOpened: boolean;
  closeHabit: () => void;
  habit: Habit;
}

export const HabitDrawer = ({ habitOpened, closeHabit, habit }: HabitDrawerProps) => {
  const { logs } = habit;
  const { updateLog } = useHabits();

  const dayRenderer: DatePickerProps["renderDay"] = (date) => {
    const dateLog = logs.find((l) => l.date === date);
    const count = dateLog?.count ?? 0;
    const progress = (count / habit.reps) * 100;

    return (
      <RingProgress
        size={35}
        thickness={2}
        sections={[{ value: progress, color: habit.color }]}
        transitionDuration={250}
        label={
          <Text size="xs" ta="center">
            {dayjs(date).date()}
          </Text>
        }
      />
    );
  };

  const getDayProps = (date: string) => ({
    onClick: () => updateLog(habit, date),
  });

  return (
    <Drawer
      opened={habitOpened}
      onClose={closeHabit}
      title={habit.name}
      position="bottom"
      size="98%"
      radius="16px 16px 0 0"
    >
      <Flex w="100%" justify="center">
        <Calendar
          size="md"
          maxDate={new Date()}
          weekendDays={[]}
          getDayProps={getDayProps}
          renderDay={dayRenderer}
        />
      </Flex>
    </Drawer>
  );
};
