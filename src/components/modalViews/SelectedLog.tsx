import {
  Flex,
  Divider,
  Text,
  Button,
  ActionIcon,
  Center,
  Group,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import dayjs from "dayjs";

import { MAX_REPS } from "@/constants";
import { useHabits } from "@/contexts/HabitsContext";
import { TextButton } from "@/components";

import type { Log, LogData } from "@/types";

interface Props {
  log?: Log;
  selectedLogData?: LogData;
  onClose: () => void;
}

export const SelectedLog = ({ log, selectedLogData, onClose }: Props) => {
  const { t, i18n } = useTranslation();

  const { incrementLog, decrementLog, resetLog, fulfillLog } = useHabits();

  if (!selectedLogData) return null;

  const { date, habit } = selectedLogData;

  return (
    <>
      <Flex bg={habit.color} c="white" px="sm" bdrs="md" align="center">
        <Text flex={1} p={0} ta="left" size="xl" c="white" fw={700}>
          {habit.name}
        </Text>

        <TextButton text={t("back")} onClick={onClose} />
      </Flex>

      <Divider />

      <ActionIcon.Group>
        <ActionIcon
          variant="default"
          radius="md"
          size="sm"
          h={32}
          w="50%"
          disabled={(log ? log.count : 0) === 0}
          onClick={() => void decrementLog(habit, date)}
        >
          <IconMinus size="20" />
        </ActionIcon>

        <ActionIcon.GroupSection
          variant="default"
          bg="var(--mantine-color-body)"
          h={32}
          w="100%"
          radius="md"
        >
          <Center>
            <Text flex={1} fw={700} ta="right">
              {`${log?.count.toString() ?? "0"} / ${habit.reps.toString()}`}
            </Text>
          </Center>
        </ActionIcon.GroupSection>

        <ActionIcon
          variant="default"
          radius="md"
          size="sm"
          h={32}
          w="50%"
          disabled={(log ? log.count : 0) >= MAX_REPS}
          onClick={() => void incrementLog(habit, date)}
        >
          <IconPlus size="20" />
        </ActionIcon>
      </ActionIcon.Group>

      <Divider />

      <Group gap="sm">
        <Button
          variant="default"
          h={32}
          flex={1}
          size="sm"

          onClick={() => void resetLog(habit, date)}
        >
          {t("resetLog")}
        </Button>

        <Group
          h={32}
          px={12}
          gap={5}
          bd="1px solid var(--mantine-color-default-border)"
          bdrs="md"
        >
          <Text size="sm" fw={700} inline={true}>
            {dayjs(date).format(
              i18n.language === "en" ? "MM-DD-YY" : "DD-MM-YY",
            )}
          </Text>
        </Group>

        <Button
          variant="default"
          h={32}
          flex={1}
          size="sm"

          onClick={() => void fulfillLog(habit, date)}
        >
          {t("fulfillLog")}
        </Button>
      </Group>
    </>
  );
};
