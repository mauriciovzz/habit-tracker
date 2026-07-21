import { Group, Text, Divider, Flex, Stack } from "@mantine/core";
import { IconFlame, IconCrown, IconChecks } from "@tabler/icons-react";
import type { Habit } from "../types";
import { useTranslation } from "react-i18next";

interface StreakItemProps {
  text: "current" | "best" | "total";
  number: number;
  color?: string;
}

const iconMap = {
  current: IconFlame,
  best: IconCrown,
  total: IconChecks,
};

const StreakItem = ({ text, number, color }: StreakItemProps) => {
  const { t } = useTranslation();

  const StreakIcon = iconMap[text];

  return (
    <Stack w="100%" gap={0}>
      <Text w="100%" size="xs" fw={600} ta="center" pb="3">
        {t(text)}
      </Text>
      <Group
        flex={1}
        gap={5}
        h={25}
        justify="center"
        align="center"
        pos="relative"
      >
        <Text size="sm" fw={500} ta="center">
          {number}
        </Text>
        <StreakIcon size={20} color={color ?? undefined} />
      </Group>
    </Stack>
  );
};

interface HabitStreaksProps {
  habit: Habit;
  borderColor: string;
  iconColor?: string;
}

export const HabitStreaks = ({
  habit,
  borderColor,
  iconColor,
}: HabitStreaksProps) => {
  const { currentStreak, bestStreak, reps, logs } = habit;
  const completedLogs = logs.filter((key) => key.count === reps).length;

  return (
    <Flex flex={1}>
      <StreakItem text="current" number={currentStreak} color={iconColor} />
      <Divider mx="xs" orientation="vertical" color={borderColor} />
      <StreakItem text="best" number={bestStreak} color={iconColor} />
      <Divider mx="xs" orientation="vertical" color={borderColor} />
      <StreakItem text="total" number={completedLogs} color={iconColor} />
    </Flex>
  );
};
