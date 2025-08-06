import {
  Button,
  Stack,
  Group,
  TextInput,
  ColorSwatch,
  CheckIcon,
  Text,
  Grid,
  Modal,
  ActionIcon,
  Flex,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import type { HabitCreationData } from "../types";
import { IconMinus, IconPlus } from "@tabler/icons-react";

interface HabitCreationModalTypes {
  opened: boolean;
  onClose: () => void;
}

const colors = [
  "#FF1A1A", // bright red
  "#FF7F00", // vibrant orange
  "#FFA500", // orange
  "#FFFF33", // lemon yellow
  "#CCFF00", // yellow-green
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

export const HabitCreationModal = ({ opened, onClose }: HabitCreationModalTypes) => {
  const addHabit = ({ name, color, reps }: HabitCreationData) => {
    console.log(name, color, reps);
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      color: "#FF1A1A",
      reps: 1,
    },

    validate: {
      name: (value) => (value.length > 70 ? "max length is 70" : null),
      reps: (value) => (value < 1 || value > 50 ? "value must be between 1 and 50" : null),
    },
  });

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

  const onModalClose = () => {
    form.setValues({
      name: "",
      color: "#FF1A1A",
      reps: 1,
    });

    onClose();
  };

  return (
    <Modal.Root
      size="auto"
      transitionProps={{ transition: "fade" }}
      centered
      opened={opened}
      onClose={() => {
        onModalClose();
      }}
    >
      <Modal.Overlay backgroundOpacity={0.55} blur={3} />

      <Modal.Content radius="lg">
        <Modal.Header>
          <Modal.Title fz="lg" fw={600}>
            Habit creation
          </Modal.Title>
          <Modal.CloseButton size="md" />
        </Modal.Header>

        <Modal.Body>
          <form
            onSubmit={form.onSubmit((values) => {
              addHabit(values);
            })}
          >
            <Stack>
              <TextInput
                label="Name"
                radius="md"
                size="md"
                placeholder="I want to..."
                key={form.key("name")}
                {...form.getInputProps("name")}
                required
                withAsterisk={false}
              />

              <Stack gap={0}>
                <Text fw={500}>Color</Text>

                <Grid w={305.5} columns={7} grow gutter="10">
                  {colors.map((hex) => {
                    return (
                      <Grid.Col span={1}>
                        <ColorSwatch
                          key={hex}
                          color={hex}
                          size={35}
                          radius={10}
                          onClick={() => {
                            form.setValues({ color: hex });
                          }}
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          {form.values.color === hex && <CheckIcon size={12} />}
                        </ColorSwatch>
                      </Grid.Col>
                    );
                  })}
                </Grid>
              </Stack>

              <Stack gap={0}>
                <Text fw={500}>Reps</Text>

                <ActionIcon.Group h="42">
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
              </Stack>

              <Group justify="flex-end">
                <Button type="submit" radius="md" size="sm">
                  Submit
                </Button>
              </Group>
            </Stack>
          </form>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};
