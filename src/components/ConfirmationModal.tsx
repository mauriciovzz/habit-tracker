import { Modal, Text } from "@mantine/core";
import { ButtonGroup } from "./ButtonGroup";

interface ConfrimationModalProps {
  opened: boolean;
  message: string;
  color: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal = ({
  opened,
  message,
  color,
  onConfirm,
  onCancel,
}: ConfrimationModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={onCancel}
      styles={{ content: { alignSelf: "flex-end" } }}
      radius="lg"
      withCloseButton={false}
      transitionProps={{
        transition: "slide-up",
        duration: 250,
        timingFunction: "linear",
      }}
    >
      <Text mb="md" fw={600} ta="center">
        {message}
      </Text>

      <ButtonGroup
        first={{ text: "No", color, onClick: onCancel }}
        second={{ text: "Yes", color: "red", onClick: onConfirm }}
      />
    </Modal>
  );
};
