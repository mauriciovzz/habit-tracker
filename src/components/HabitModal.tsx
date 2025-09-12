import { Modal } from "@mantine/core";
import type { Habit } from "../types";

interface HabitModalTypes {
  opened: boolean;
  selectedHabit: Habit | null;
  onClose: () => void;
}

export const HabitModal = ({ opened, selectedHabit, onClose }: HabitModalTypes) => {
  return (
    <Modal.Root
      transitionProps={{ transition: "fade" }}
      centered
      opened={opened}
      size="100%"
      onClose={() => {
        onClose();
      }}
    >
      <Modal.Overlay backgroundOpacity={0.55} blur={3} />

      <Modal.Content radius="lg">
        <Modal.Header>
          <Modal.Title fz="lg" fw={600}>
            {selectedHabit?.name}
          </Modal.Title>
          <Modal.CloseButton size="md" />
        </Modal.Header>

        <Modal.Body>{selectedHabit?.name}</Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};
