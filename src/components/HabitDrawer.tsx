import dayjs from "dayjs";
import {
  ActionIcon,
  Divider,
  Drawer,
  Flex,
  Group,
  RingProgress,
  Text,
  Box,
  Stack,
} from "@mantine/core";
import { Calendar, DatesProvider, type DatePickerProps } from "@mantine/dates";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import type { Habit } from "../types";
import { useHabits } from "../contexts/HabitsContext";
import { useState } from "react";
import { IconChevronLeft, IconChevronRight, type Icon, type IconProps } from "@tabler/icons-react";
import { ConfirmationModal } from "./ConfirmationModal";
import { HabitFormDrawer } from "./HabitFormDrawer";
import { TextButton } from "./TextButton";
import { HabitStreaks } from "./HabitStreaks";
import { HabitHeatmap } from "./HabitHeatmap";
import { ButtonGroup } from "./ButtonGroup";

interface ArrowButtonPropa {
  width: number;
  color: string;
  onClick: () => void;
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
}

const ArrowButton = ({ width, color, onClick, icon }: ArrowButtonPropa) => {
  const ArrowIcon = icon;

  return (
    <ActionIcon variant="subtle" w={width} color={color} onClick={onClick}>
      <ArrowIcon />
    </ActionIcon>
  );
};

interface HabitDrawerProps {
  habit: Habit | undefined;
  habitOpened: boolean;
  borderTheme: string;
  closeHabit: () => void;
  isMobile: boolean;
}

export const HabitDrawer = ({
  habit,
  habitOpened,
  borderTheme,
  closeHabit,
  isMobile,
}: HabitDrawerProps) => {
  const { updateLog, resetHabit, deleteHabit } = useHabits();
  const { width } = useViewportSize();
  const buttonsWidth = (width - 32) / 7;

  const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [resetOpened, { open: openReset, close: closeReset }] = useDisclosure(false);

  const id = habit?.id ?? 0;
  const name = habit?.name ?? "no habit selected";
  const color = habit?.color ?? "gray";
  const reps = habit?.reps ?? 1;
  const logs = habit?.logs ?? [];

  const [date, setDate] = useState(new Date());

  const showPreviousMonth = () => {
    setDate((prev) => {
      const next = dayjs(prev).subtract(1, "month").toDate();
      return next;
    });
  };

  const showNextMonth = () => {
    setDate((prev) => {
      const next = dayjs(prev).add(1, "month").toDate();
      return next;
    });
  };

  const dayRenderer: DatePickerProps["renderDay"] = (date) => {
    if (!habit) {
      return (
        <Text size="xs" ta="center">
          {dayjs(date).date()}
        </Text>
      );
    }

    const dateLog = logs.find((l) => l.date === date);
    const count = dateLog?.count ?? 0;
    const progress = (count / reps) * 100;

    return (
      <RingProgress
        size={44}
        thickness={2}
        sections={[{ value: progress, color }]}
        transitionDuration={250}
        label={
          <Text size="sm" ta="center">
            {dayjs(date).date()}
          </Text>
        }
      />
    );
  };

  const getDayProps = (date: string) => (habit ? { onClick: () => updateLog(habit, date) } : {});

  return (
    <Drawer.Root
      opened={habitOpened}
      onClose={closeHabit}
      position={isMobile ? "bottom" : "right"}
      size={isMobile ? "96%" : "40%"}
      radius={isMobile ? "16px 16px 0 0" : "16px 0 0 16px"}
      transitionProps={{
        transition: isMobile ? "slide-up" : "slide-left",
        duration: 250,
        timingFunction: "linear",
      }}
    >
      <Drawer.Overlay />

      <Drawer.Content>
        <Drawer.Header bg={color} c="white" p="md">
          <Group w="100%" gap="xs">
            <TextButton text="Edit" width={buttonsWidth} onClick={openEdit} />
            <Text flex={1} size="xl" lineClamp={2} fw={500} ta="center" style={{ lineHeight: 1.2 }}>
              {name}
            </Text>
            <TextButton text="Back" width={buttonsWidth} onClick={closeHabit} />
          </Group>
        </Drawer.Header>

        <Drawer.Body p={0}>
          {habit ? (
            <Flex w="100%" direction="column">
              {/* Calendar */}
              <Stack w="100%" p="md" gap="0">
                <Group w="100%" h="48px" justify="space-between" mb="10px">
                  <ArrowButton
                    width={buttonsWidth}
                    color={color}
                    onClick={showPreviousMonth}
                    icon={IconChevronLeft}
                  />

                  <Text fw={500}>{dayjs(date).format("MMMM YYYY")}</Text>

                  <ArrowButton
                    width={buttonsWidth}
                    color={color}
                    onClick={showNextMonth}
                    icon={IconChevronRight}
                  />
                </Group>

                <DatesProvider settings={{ consistentWeeks: true }}>
                  <Calendar
                    w="100%"
                    size="lg"
                    level="month"
                    minLevel="month"
                    styles={{
                      calendarHeader: { display: "none" }, // hides the entire header
                      calendarHeaderControl: { display: "none" }, // hides month/year button
                      calendarHeaderLevel: { display: "none" },
                      weekday: {
                        fontSize: "small",
                        fontWeight: 600,
                      },
                      month: {
                        width: "100%",
                      },
                      day: {
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                      },
                    }}
                    date={date}
                    maxDate={new Date()}
                    weekendDays={[]}
                    getDayProps={getDayProps}
                    renderDay={dayRenderer}
                  />
                </DatesProvider>
              </Stack>

              <Divider label="Streaks" labelPosition="center" />

              {/* Streaks */}
              <Box w="100%" p="md">
                <HabitStreaks habit={habit} borderColor={borderTheme} iconColor={color} />
              </Box>

              <Divider label="Year completions" labelPosition="center" />

              {/* Streaks */}
              <Box w="100%" p="md">
                <HabitHeatmap habit={habit} showFullYear />
              </Box>

              <Divider />

              <Box w="100%" p="md">
                <ButtonGroup
                  first={{ text: "Reset habit", color, onClick: openReset }}
                  second={{ text: "Delete habit", color: "red", onClick: openDelete }}
                />
              </Box>
            </Flex>
          ) : (
            <Text c="dimmed" ta="center">
              No habit selected
            </Text>
          )}
        </Drawer.Body>
      </Drawer.Content>

      <ConfirmationModal
        opened={resetOpened}
        message={`Do you want to reset this habit?`}
        color={color}
        onConfirm={() => {
          void resetHabit(id);
          closeReset();
        }}
        onCancel={closeReset}
      />

      <ConfirmationModal
        opened={deleteOpened}
        message={`Do you want to delete this habit?`}
        color={color}
        onConfirm={() => {
          void deleteHabit(id);
          closeDelete();
          closeHabit();
        }}
        onCancel={closeDelete}
      />

      <HabitFormDrawer opened={editOpened} onClose={closeEdit} data={{ id, name, color, reps }} />
    </Drawer.Root>
  );
};
