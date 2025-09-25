import { useState } from "react";
import { Flex, Group, Paper, Text, Stack } from "@mantine/core";
import type { Habit } from "../../../types";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IconGripHorizontal } from "@tabler/icons-react";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useHabits } from "../../../contexts/HabitsContext";

const SortableHabit = ({ habit }: { habit: Habit }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: habit.id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Paper p="xs" withBorder bdrs="lg" ref={setNodeRef} style={style} {...attributes}>
      <Flex justify="center">
        <Group w="100%">
          <Text flex={1} size="md" inline lineClamp={2} fw={500}>
            {habit.name}
          </Text>
          <span
            {...listeners}
            style={{
              cursor: "grab",
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconGripHorizontal size={35} />
          </span>
        </Group>
      </Flex>
    </Paper>
  );
};

interface HabitReorderWindowProps {
  originalHabits: Habit[];
}

export const HabitReorderWindow = ({ originalHabits }: HabitReorderWindowProps) => {
  const { updateHabitPosition } = useHabits();
  const [habits, setHabits] = useState(originalHabits);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = habits.findIndex((h) => h.id === active.id);
    const newIndex = habits.findIndex((h) => h.id === over.id);

    const newHabits = arrayMove(habits, oldIndex, newIndex).map((habit, index) => ({
      ...habit,
      position: index,
    }));

    setHabits(newHabits);
    await updateHabitPosition(Number(active.id), oldIndex, newIndex);
  };

  return (
    <Stack p="md">
      <Text size="md" ta="center" c="dimmed">
        Drag the habits from the handle to reorden them
      </Text>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={(event) => {
          void handleDragEnd(event);
        }}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext items={habits.map((h) => h.id)} strategy={verticalListSortingStrategy}>
          {habits.map((habit) => (
            <SortableHabit key={habit.id} habit={habit} />
          ))}
        </SortableContext>
      </DndContext>
    </Stack>
  );
};
