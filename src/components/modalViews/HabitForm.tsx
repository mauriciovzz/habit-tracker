import { useEffect, useRef } from "react";
import { t } from "i18next";
import {
  TextInput,
  ColorSwatch,
  Text,
  SimpleGrid,
  ActionIcon,
  Flex,
  Divider,
  Box,
  Button,
  Center,
} from "@mantine/core";
import { useFocusWithin } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { IconMinus, IconPlus } from "@tabler/icons-react";

import { MAX_REPS } from "@/constants";
import { useHabits } from "@/contexts/HabitsContext";
import { TextButton } from "@/components";

import type { Habit, HabitProps } from "@/types";

const COLORS = [
  "#c92a2a",
  "#d9480f",
  "#e67700",
  "#2b8a3e",
  "#0c8599",
  "#1864ab",
  "#6741d9",
  "#e03131",
  "#e8590c",
  "#f08c00",
  "#2f9e44",
  "#1098ad",
  "#1971c2",
  "#7950f2",
  "#f03e3e",
  "#f76707",
  "#f59f00",
  "#37b24d",
  "#15aabf",
  "#228be6",
  "#9c36b5",
];

const ERROR_DISPLAY_TIME = 2000;

interface Props {
  data?: Habit;
  onClose: () => void;
}

export const HabitForm = ({ data, onClose }: Props) => {
  const { addHabit, updateHabit } = useHabits();

  const { ref: focusRef, focused } = useFocusWithin();
  const errorTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (errorTimeoutRef.current !== null) {
        window.clearTimeout(errorTimeoutRef.current);
      }
    };
  }, []);

  const form = useForm({
    initialValues: {
      name: data?.name ?? "",
      color: data?.color ?? COLORS[0],
      reps: data?.reps ?? 1,
    },

    validate: {
      name: (value) => (value.trim().length === 0 ? "nameError" : null),
    },
  });

  const showValidationError = () => {
    if (errorTimeoutRef.current !== null) {
      window.clearTimeout(errorTimeoutRef.current);
    }

    errorTimeoutRef.current = window.setTimeout(() => {
      form.clearFieldError("name");
      errorTimeoutRef.current = null;
    }, ERROR_DISPLAY_TIME);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue("name", event.currentTarget.value);

    if (form.errors.name) {
      form.clearFieldError("name");

      if (errorTimeoutRef.current !== null) {
        window.clearTimeout(errorTimeoutRef.current);
        errorTimeoutRef.current = null;
      }
    }
  };

  const handleFormSubmit = async (newData: HabitProps) => {
    if (data?.id !== undefined) {
      await updateHabit(data.id, newData);
    } else {
      await addHabit(newData);
    }
    onClose();
  };

  const increment = () => {
    const reps = form.getValues().reps;

    if (reps < MAX_REPS) {
      form.setFieldValue("reps", reps + 1);
    }
  };

  const decrement = () => {
    const reps = form.getValues().reps;

    if (reps > 1) {
      form.setFieldValue("reps", reps - 1);
    }
  };

  const currentColor = form.values.color;
  const currentReps = form.values.reps;

  return (
    <>
      <Flex bg={currentColor} c="white" px="sm" bdrs="md" align="center">
        <Text flex={1} p={0} ta="left" size="xl" c="white" fw={700}>
          {data?.id !== undefined ? t("editHabit") : t("addHabit")}
        </Text>

        <TextButton text={t("back")} onClick={onClose} />
      </Flex>

      <Divider />

      <form
        onSubmit={(event) => {
          event.preventDefault();

          const { hasErrors } = form.validate();

          if (hasErrors) {
            showValidationError();
            return;
          }

          void handleFormSubmit(form.values);
        }}
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        <TextInput
          ref={focusRef}
          radius="md"
          size="md"
          placeholder={t("name")}
          value={form.values.name}
          onChange={handleNameChange}
          withAsterisk={false}
          error={false}
          maxLength={35}
          styles={{
            input: {
              caretColor: currentColor,
              borderColor:
                focused || form.errors.name ? currentColor : undefined,
            },
          }}
        />

        <Divider />

        <SimpleGrid
          p="sm"
          cols={7}
          spacing={6}
          bd="1px solid var(--mantine-color-default-border)"
          bdrs="md"
        >
          {COLORS.map((hex) => {
            return (
              <ColorSwatch
                key={hex}
                color={hex}
                w="100%"
                h={32}
                radius="md"
                onClick={() => {
                  form.setFieldValue("color", hex);
                }}
                style={{
                  cursor: "pointer",
                }}
              >
                {currentColor === hex && (
                  <Box w={12} h={12} bg="white" bdrs="xl" />
                )}
              </ColorSwatch>
            );
          })}
        </SimpleGrid>

        <Divider />

        <ActionIcon.Group>
          <ActionIcon.GroupSection
            variant="default"
            bg="var(--mantine-color-body)"
            h={32}
            w="100%"
            radius="md"
          >
            <Center>
              <Text w={30} fw={700} ta="right">
                {currentReps}
              </Text>
              <Text size="sm">&nbsp;/ {t("repsDay")}</Text>
            </Center>
          </ActionIcon.GroupSection>

          <ActionIcon
            variant="default"
            radius="md"
            size="sm"
            h={32}
            w="50%"
            disabled={currentReps <= 1}
            onClick={decrement}
          >
            <IconMinus size="20" />
          </ActionIcon>

          <ActionIcon
            variant="default"
            radius="md"
            size="sm"
            h={32}
            w="50%"
            disabled={currentReps >= MAX_REPS}
            onClick={increment}
          >
            <IconPlus size="20" />
          </ActionIcon>
        </ActionIcon.Group>

        <Divider />

        <Button variant="default" h={32} size="sm" w="100%" type="submit">
          {data ? t("update") : t("save")}
        </Button>
      </form>
    </>
  );
};
