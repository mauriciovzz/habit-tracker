import dayjs from "dayjs";
import {
  ActionIcon,
  Divider,
  Flex,
  Group,
  RingProgress,
  Text,
  Box,
  Stack,
  ScrollArea,
} from "@mantine/core";
import { Calendar, DatesProvider, type DatePickerProps } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import type { Habit } from "../../types";
import { useHabits } from "../../contexts/HabitsContext";
import { useState } from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { ConfirmationModal } from "../ConfirmationModal";
import { CustomDrawer } from "./CustomDrawer";
import { HabitForm } from "./HabitForm";
import { TextButton } from "../Buttons/TextButton";
import { HabitStreaks } from "../HabitStreaks";
import { HabitHeatmap } from "../HabitHeatmap";
import { ButtonGroup } from "../Buttons/ButtonGroup";

interface SelectedHabitProps {
  habit: Habit | undefined;
  borderTheme: string;
  onClose: () => void;
  isMobile?: boolean;
  drawerButtonWidth?: number;
  drawerBodyHeight?: number;
}

export const SelectedHabit = ({
  habit,
  borderTheme,
  onClose,
  isMobile,
  drawerButtonWidth,
  drawerBodyHeight,
}: SelectedHabitProps) => {
  const { updateLog, resetHabit, deleteHabit } = useHabits();

  const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [resetOpened, { open: openReset, close: closeReset }] = useDisclosure(false);

  const id = habit?.id ?? 0;
  const name = habit?.name ?? "no habit selected";
  const color = habit?.color ?? "gray";
  const reps = habit?.reps ?? 1;
  const logs = habit?.logs ?? [];

  const buttonWidth = drawerButtonWidth ?? 0;
  const bodyHeight = drawerBodyHeight ?? 0;

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
    <Box w="100%">
      <Flex bg={color} c="white" p="md" h="80px" align="center">
        <Group w="100%" gap="xs">
          <TextButton text="Edit" width={buttonWidth} onClick={openEdit} />
          <Text flex={1} size="xl" lineClamp={2} fw={500} ta="center" style={{ lineHeight: 1.2 }}>
            {name}
          </Text>
          <TextButton text="Back" width={buttonWidth} onClick={onClose} />
        </Group>
      </Flex>

      {habit ? (
        <>
          <Box p={0} h={bodyHeight - 80}>
            <ScrollArea
              h={bodyHeight - 80 - 1 - 68}
              scrollbarSize={isMobile ? 6 : 12}
              type={isMobile ? undefined : "auto"}
            >
              <Stack w="100%" p="md" gap="0">
                <Group w="100%" h="48px" justify="space-between" mb="10px">
                  <ActionIcon
                    variant="subtle"
                    w={buttonWidth}
                    color={color}
                    onClick={showPreviousMonth}
                  >
                    <IconChevronLeft />
                  </ActionIcon>

                  <Text fw={500}>{dayjs(date).format("MMMM YYYY")}</Text>

                  <ActionIcon
                    variant="subtle"
                    w={buttonWidth}
                    color={color}
                    onClick={showNextMonth}
                  >
                    <IconChevronRight />
                  </ActionIcon>
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

              <Box w="100%" p="md">
                <HabitStreaks habit={habit} borderColor={borderTheme} iconColor={color} />
              </Box>

              <Divider label="Year completions" labelPosition="center" />

              <Box w="100%" p="md">
                <HabitHeatmap habit={habit} showFullYear />
              </Box>
            </ScrollArea>

            <Divider />

            <Box p="md">
              <ButtonGroup
                first={{ text: "Reset habit", color, onClick: openReset }}
                second={{ text: "Delete habit", color: "red", onClick: openDelete }}
              />
            </Box>

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
                onClose();
              }}
              onCancel={closeDelete}
            />

            <CustomDrawer opened={editOpened} isMobile={isMobile}>
              <HabitForm onClose={closeEdit} data={{ id, name, color, reps }} />
            </CustomDrawer>
          </Box>
        </>
      ) : (
        <Text c="dimmed" ta="center">
          No habit selected
        </Text>
      )}
    </Box>
  );
};
