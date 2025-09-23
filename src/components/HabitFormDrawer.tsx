import {
  Drawer,
  TextInput,
  ColorSwatch,
  Text,
  Grid,
  ActionIcon,
  Flex,
  Divider,
  Box,
  Button,
} from "@mantine/core";
import { useHabits } from "../contexts/HabitsContext";
import { useForm } from "@mantine/form";
import type { HabitCretionProps, HabitUpdateProps } from "../types";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useEffect } from "react";
import { useFocusWithin, useViewportSize } from "@mantine/hooks";
import { TextButton } from "./TextButton";

interface HabitFormDrawerProps {
  opened: boolean;
  onClose: () => void;
  data?: HabitUpdateProps;
}

const colors = [
  "#FF1A1A", // bright red
  "#FF7F00", // vibrant orange
  "#FFA500", // orange
  "#FFCE1B", // lemon yellow
  "#58CC02", // yellow-green
  "#3CB44B", // vibrant green
  "#00CC99", // teal-green
  "#00CED1", // turquoise
  "#0099FF", // sky blue
  "#4363D8", // royal blue
  "#4B0082", // indigo
  "#6A0DAD", // purple
  "#911EB4", // deep violet
  "#DA70D6", // orchid
];

export const HabitFormDrawer = ({ opened, onClose, data }: HabitFormDrawerProps) => {
  const { addHabit, updateHabit } = useHabits();
  const { ref, focused } = useFocusWithin();
  const { width } = useViewportSize();
  const buttonsWidth = (width - 32) / 7;

  const handleFormSubmit = async ({ name, color, reps }: HabitCretionProps) => {
    if (data) {
      await updateHabit({ id: data.id, name, color, reps });
    } else {
      await addHabit({ name, color, reps });
    }
    onClose();
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      color: colors[0],
      reps: 1,
    },

    validate: {
      name: (value) => {
        if (value.length > 100) return "max length is 100";

        if (value.length === 0) return "name can't be empty";

        return null;
      },
      reps: (value) => (value < 1 || value > 50 ? "value must be between 1 and 30" : null),
    },
  });

  useEffect(() => {
    if (opened) {
      if (data) {
        form.setValues({
          name: data.name,
          color: data.color,
          reps: data.reps,
        });
      } else {
        form.setValues({
          name: "",
          color: colors[0],
          reps: 1,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, opened]);

  const MIN_REPS = 1;
  const MAX_REPS = 30;

  const increment = () => {
    if (form.values.reps < MAX_REPS) {
      form.setFieldValue("reps", form.values.reps + 1);
    }
  };

  const decrement = () => {
    if (form.values.reps > MIN_REPS) {
      form.setFieldValue("reps", form.values.reps - 1);
    }
  };

  return (
    <Drawer.Root
      opened={opened}
      onClose={onClose}
      position="bottom"
      size="96%"
      radius="16px 16px 0 0"
      transitionProps={{
        transition: "slide-up",
        duration: 250,
        timingFunction: "linear",
      }}
    >
      <Drawer.Overlay />

      <Drawer.Content>
        <Drawer.Header bg={form.values.color} c="white" p="md">
          <Text flex={1} size="xl" fw={500} ta="left">
            {data ? "Edit Habit" : "Add Habit"}
          </Text>
          <TextButton text="Back" width={buttonsWidth} onClick={onClose} />
        </Drawer.Header>

        <Drawer.Body p={0}>
          <form onSubmit={form.onSubmit(handleFormSubmit)}>
            <Divider
              label="Name"
              labelPosition="center"
              pt="md"
              pb={8}
              styles={{ label: { fontSize: 16 } }}
            />

            <div style={{ height: 63.8, paddingLeft: 16, paddingRight: 16 }}>
              <TextInput
                ref={ref}
                radius="md"
                size="md"
                placeholder="I want to..."
                key={form.key("name")}
                {...form.getInputProps("name")}
                withAsterisk={false}
                styles={{
                  input: {
                    caretColor: form.values.color,
                    borderColor: focused ? form.values.color : undefined,
                  },
                }}
              />
            </div>

            <Divider
              label="Color"
              labelPosition="center"
              pb={8}
              styles={{ label: { fontSize: 16 } }}
            />

            <Grid grow gutter={(width - 32 - 42 * 7) / 6} columns={7} px="md">
              {colors.map((hex) => {
                return (
                  <Grid.Col key={hex} span={1}>
                    <ColorSwatch
                      color={hex}
                      radius={8}
                      onClick={() => {
                        form.setValues({ color: hex });
                      }}
                      style={{
                        cursor: "pointer",
                        width: 42,
                        height: 42,
                      }}
                    >
                      {form.values.color === hex && (
                        <div
                          style={{
                            width: 15,
                            height: 15,
                            backgroundColor: "white",
                            borderRadius: 20,
                          }}
                        />
                      )}
                    </ColorSwatch>
                  </Grid.Col>
                );
              })}
            </Grid>

            <Divider
              label="Reps"
              labelPosition="center"
              pt="md"
              pb={8}
              styles={{ label: { fontSize: 16 } }}
            />

            <ActionIcon.Group h="58" px="md" pb="md">
              <ActionIcon.GroupSection
                variant="default"
                bg="var(--mantine-color-body)"
                h="100%"
                w="100%"
                radius="md"
              >
                <Flex align="center">
                  <Text>{form.values.reps}</Text>
                  <Text size="xs">&nbsp;/ day</Text>
                </Flex>
              </ActionIcon.GroupSection>

              <ActionIcon variant="default" radius="md" h="100%" w="50%" onClick={decrement}>
                <IconMinus size="20" />
              </ActionIcon>

              <ActionIcon variant="default" radius="md" h="100%" w="50%" onClick={increment}>
                <IconPlus size="20" />
              </ActionIcon>
            </ActionIcon.Group>

            <Divider />

            <Box p="md">
              <Button w="100%" color={form.values.color} type="submit">
                {data ? "Update" : "Save"}
              </Button>
            </Box>
          </form>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};
