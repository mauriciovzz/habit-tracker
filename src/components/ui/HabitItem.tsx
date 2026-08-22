import {
  Paper,
  Group,
  Text,
  UnstyledButton,
  RingProgress,
  Flex,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

import type { Habit, Log, ISODate } from "@/types";
import { useEffect, useRef, useState } from "react";

const TRANSITION_DURATION = 250;
const LONG_PRESS_DURATION = 500;

const CheckButton = ({
  date,
  habit,
  log,
  incrementLog,
  onLongPress,
}: {
  date: ISODate;
  habit: Habit;
  log?: Log;
  incrementLog: (habit: Habit, date: ISODate) => Promise<void>;
  onLongPress: (date: ISODate, habit: Habit) => void;
}) => {
  const count = log?.count ?? 0;
  const progress = Math.min((count / habit.reps) * 100, 100);
  const isComplete = count >= habit.reps;

  const [showCheck, setShowCheck] = useState(isComplete);

  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressTriggered = useRef(false);

  useEffect(() => {
    if (!isComplete) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowCheck(false);
      return;
    }

    const timeout = setTimeout(() => {
      setShowCheck(true);
    }, TRANSITION_DURATION + 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [isComplete]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (longPressTriggered.current) {
      longPressTriggered.current = false;
      return;
    }

    void incrementLog(habit, date);
  };

  const startLongPress = () => {
    longPressTriggered.current = false;

    longPressTimer.current = setTimeout(() => {
      longPressTriggered.current = true;
      onLongPress(date, habit);
    }, LONG_PRESS_DURATION);
  };

  const cancelLongPress = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  return (
    <Flex w={30} h={20} justify="center" align="center" pos="relative">
      <UnstyledButton
        w={20}
        h={20}
        style={{
          userSelect: "none",
          WebkitUserSelect: "none",
          WebkitTouchCallout: "none",
          touchAction: "manipulation",
        }}
        onPointerDown={startLongPress}
        onPointerUp={cancelLongPress}
        onPointerLeave={cancelLongPress}
        onPointerCancel={cancelLongPress}
        onClick={handleClick}
      >
        {showCheck ? (
          <>
            <IconCheck size={20} color={habit.color} />

            {count > habit.reps && (
              <Text size="8px" fw={700} pos="absolute" bottom={0} right={0}>
                {count}
              </Text>
            )}
          </>
        ) : (
          <RingProgress
            size={20}
            thickness={2}
            sections={[
              {
                value: progress,
                color: habit.color,
              },
            ]}
            transitionDuration={TRANSITION_DURATION}
          />
        )}
      </UnstyledButton>
    </Flex>
  );
};

interface Props {
  habit: Habit;
  logs: Log[];
  dates: string[];
  incrementLog: (habit: Habit, date: ISODate) => Promise<void>;
  openHabit: (id: number) => void;
  onLongPress: (date: ISODate, habit: Habit) => void;
}

export const HabitItem = ({
  habit,
  logs,
  dates,
  incrementLog,
  openHabit,
  onLongPress,
}: Props) => (
  <Paper p="xs" withBorder bdrs="lg">
    <Group flex={1} justify="space-between">
      <Text
        flex={1}
        size="lg"
        truncate="end"
        style={{
          cursor: "pointer",
        }}
        onClick={() => {
          openHabit(habit.id);
        }}
      >
        {habit.name}
      </Text>

      <Group gap={6}>
        {dates.map((date) => (
          <CheckButton
            key={`${habit.id.toString()}-${date}`}
            date={date}
            habit={habit}
            log={logs.find((l) => l.date === date)}
            incrementLog={incrementLog}
            onLongPress={onLongPress}
          />
        ))}
      </Group>
    </Group>
  </Paper>
);
