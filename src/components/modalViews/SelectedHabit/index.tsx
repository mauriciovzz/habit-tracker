import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActionIcon,
  Divider,
  Group,
  RingProgress,
  Text,
  Center,
  Paper,
  Flex,
  Stack,
  Button,
} from "@mantine/core";
import { useDisclosure, useElementSize } from "@mantine/hooks";
import { Calendar, DatesProvider, type DatePickerProps } from "@mantine/dates";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import dayjs from "dayjs";
import "dayjs/locale/es";

import { metrics } from "@/utils";
import { useHabits } from "@/contexts/HabitsContext";
import {
  TextButton,
  ConfirmationModal,
  AppModal,
  HabitForm,
  SelectedLog,
} from "@/components";
import { HabitHeatmap } from "./HabitHeatmap";

import type { Habit, ISODate, Log, LogData } from "@/types";

interface Props {
  habit: Habit | undefined;
  logs: Log[];
  onClose: () => void;
}

export const SelectedHabit = ({ habit, logs, onClose }: Props) => {
  const { ref, width } = useElementSize();
  const { t, i18n } = useTranslation();

  const { deleteHabitLogs, deleteHabit } = useHabits();

  const [selectedLogData, setSelectedLog] = useState<LogData | undefined>(
    undefined,
  );

  const [editOpened, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);
  const [resetOpened, { open: openReset, close: closeReset }] =
    useDisclosure(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);
  const [logOpened, { open: openLog, close: closeLog }] = useDisclosure(false);

  const name = habit?.name ?? "no habit selected";
  const color = habit?.color ?? "gray";
  const reps = habit?.reps ?? 0;

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDate(new Date());
  }, [habit?.id]);

  const resetMonth = () => {
    setDate(new Date());
  };

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

  if (habit === undefined) {
    return (
      <Center>
        <Text c="dimmed" ta="center">
          No habit selected
        </Text>
      </Center>
    );
  }

  const metricsData = metrics.calculate(habit, logs);

  const dayRenderer: DatePickerProps["renderDay"] = (date) => {
    const dateLog = logs.find((l) => l.date === date);
    const count = dateLog?.count ?? 0;
    const progress = (count / reps) * 100;

    return (
      <Flex h="100%" w="100%" justify="center" align="center">
        <RingProgress
          size={36}
          thickness={2}
          sections={[{ value: progress, color }]}
          transitionDuration={250}
          label={
            <Text size="xs" ta="center">
              {dayjs(date).date()}
            </Text>
          }
        />
      </Flex>
    );
  };

  const getDayProps = (selectedDate: ISODate) => ({
    onClick: () => {
      setSelectedLog({ date: selectedDate, habit });
      openLog();
    },
  });

  const circleSize = 28.4;
  const calendarSquare = width / 7;
  const squareSpace = (calendarSquare - circleSize) / 2;

  return (
    <>
      <Paper style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Group px={squareSpace} gap={squareSpace} bg={color} bdrs="md">
          <TextButton text={t("edit")} onClick={openEdit} />

          <Text
            flex={1}
            p={0}
            ta="center"
            size="xl"
            c="white"
            fw={700}
            truncate="end"
          >
            {name}
          </Text>

          <TextButton text={t("back")} onClick={onClose} />
        </Group>

        <Divider />

        <Group px={squareSpace}>
          {metricsData.map(({ key, value }) => (
            <Paper
              key={key}
              h={circleSize}
              flex={1}
              withBorder
              pos="relative"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Flex
                pos="absolute"
                px={4}
                top={-9.4}
                bg="var(--mantine-color-body)"
              >
                <Text size="xs" fw={500}>
                  {t(key)}
                </Text>
              </Flex>

              <Text size="sm" fw={700}>
                {value}
              </Text>
            </Paper>
          ))}
        </Group>

        <Divider />

        <Stack gap="sm">
          <Group w="100%" gap="sm" px={squareSpace}>
            <ActionIcon
              variant="default"
              size={circleSize}
              onClick={showPreviousMonth}
            >
              <IconChevronLeft style={{ width: "70%", height: "70%" }} />
            </ActionIcon>

            <Button
              variant="default"
              size="sm"
              h={circleSize}
              flex={1}
              onClick={resetMonth}
            >
              {t(`months.full.${dayjs(date).month().toString()}`)}{" "}
              {dayjs(date).format("YYYY")}
            </Button>

            <ActionIcon
              variant="default"
              size={circleSize}
              onClick={showNextMonth}
            >
              <IconChevronRight style={{ width: "70%", height: "70%" }} />
            </ActionIcon>
          </Group>

          <DatesProvider
            settings={{ locale: i18n.language, consistentWeeks: true }}
          >
            <Calendar
              size="sm"
              level="month"
              minLevel="month"
              weekdayFormat="ddd"
              styles={{
                calendarHeader: { display: "none" },
                calendarHeaderControl: { display: "none" },
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

        <Divider ref={ref} />

        <Group gap={0} px={squareSpace}>
          <HabitHeatmap habit={habit} logs={logs} />
        </Group>

        <Divider />

        <Group px={squareSpace} gap="sm">
          <Button
            variant="default"
            h={circleSize}
            flex={1}
            size="sm"
            onClick={openReset}
          >
            {t("resetHabit")}
          </Button>

          <Button
            variant="default"
            h={circleSize}
            flex={1}
            size="sm"
            onClick={openDelete}
          >
            {t("deleteHabit")}
          </Button>
        </Group>
      </Paper>

      <AppModal opened={editOpened} onClose={closeEdit}>
        <HabitForm data={habit} onClose={closeEdit} />
      </AppModal>

      <AppModal opened={logOpened} onClose={closeLog}>
        <SelectedLog
          log={
            selectedLogData
              ? logs.find((l) => l.date === selectedLogData.date)
              : undefined
          }
          selectedLogData={selectedLogData}
          onClose={closeLog}
        />
      </AppModal>

      <ConfirmationModal
        opened={resetOpened}
        message={t("resetPrompt")}
        color={color}
        onConfirm={() => {
          void deleteHabitLogs(habit);
        }}
        onCancel={closeReset}
      />

      <ConfirmationModal
        opened={deleteOpened}
        message={t("deletePrompt")}
        color={color}
        onConfirm={() => {
          onClose();
          setTimeout(() => void deleteHabit(habit), 300);
        }}
        onCancel={closeDelete}
      />
    </>
  );
};
