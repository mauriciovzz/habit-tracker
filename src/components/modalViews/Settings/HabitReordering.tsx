import { useState } from "react";
import {
  Stack,
  Flex,
  Divider,
  Center,
  ScrollArea,
  Text,
  Box,
  Group,
} from "@mantine/core";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useTranslation } from "react-i18next";
import { IconGripVertical } from "@tabler/icons-react";

import { useHabits } from "@/contexts/HabitsContext";
import { AppModal, TextButton } from "@/components";

import type { Habit } from "@/types";

const SortableHabit = ({ habit }: { habit: Habit }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: habit.id,
  });

  return (
    <Box
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <Group
        p="sm"
        gap="sm"
        wrap="nowrap"
        style={{
          border: "1px solid var(--mantine-color-default-border)",
          borderRadius: "var(--mantine-radius-lg)",
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
      >
        <Text flex={1} size="lg" truncate="end" fw={500}>
          {habit.name}
        </Text>

        <Box
          ref={setActivatorNodeRef}
          {...attributes}
          {...listeners}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: isDragging ? "grabbing" : "grab",
            touchAction: "none",
          }}
        >
          <IconGripVertical size={24} />
        </Box>
      </Group>
    </Box>
  );
};

interface Props {
  opened: boolean;
  onClose: () => void;
}

export const HabitReordering = ({ opened, onClose }: Props) => {
  const { t } = useTranslation();
  const { habits, updateHabitPosition } = useHabits();

  const [reorderHabits, setReorderHabits] = useState<Habit[]>(habits);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = reorderHabits.findIndex(
      (habit) => habit.id === Number(active.id),
    );

    const newIndex = reorderHabits.findIndex(
      (habit) => habit.id === Number(over.id),
    );

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const newHabits = arrayMove(reorderHabits, oldIndex, newIndex).map(
      (habit, index) => ({
        ...habit,
        position: index,
      }),
    );

    setReorderHabits(newHabits);

    await updateHabitPosition(Number(active.id), newIndex);
  };

  return (
    <AppModal opened={opened} onClose={onClose} height="85dvh">
      <Flex
        bg="var(--mantine-color-default-border)"
        c="white"
        px="sm"
        bdrs="md"
        align="center"
      >
        <Text flex={1} p={0} ta="left" size="xl" c="white" fw={700}>
          {t("reorderHabits")}
        </Text>

        <TextButton text={t("back")} onClick={onClose} />
      </Flex>

      <Divider />

      <Text ta="center" size="sm">
        {t("reorderHabitsDescription")}
      </Text>

      <Divider />

      <Flex flex={1} mih={0}>
        {reorderHabits.length === 0 ? (
          <Center h="100%" w="100%">
            <Text size="md" fw={700}>
              {t("noHabitsReorder")}
            </Text>
          </Center>
        ) : (
          <ScrollArea type="never" h="100%" w="100%">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              modifiers={[restrictToVerticalAxis]}
              onDragEnd={(event) => {
                void handleDragEnd(event);
              }}
            >
              <SortableContext
                items={reorderHabits.map((habit) => habit.id)}
                strategy={verticalListSortingStrategy}
              >
                <Stack gap="sm">
                  {reorderHabits.map((habit) => (
                    <SortableHabit key={habit.id} habit={habit} />
                  ))}
                </Stack>
              </SortableContext>
            </DndContext>
          </ScrollArea>
        )}
      </Flex>
    </AppModal>
  );
};
