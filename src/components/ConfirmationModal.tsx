import { Modal, Text } from "@mantine/core";
import { ButtonGroup } from "./Buttons/ButtonGroup";

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
      radius="lg"
      withCloseButton={false}
      transitionProps={{
        transition: "fade-up",
        duration: 250,
        timingFunction: "linear",
      }}
      withinPortal={false}
      zIndex={2000}
      styles={{ content: { alignSelf: "flex-end" } }}
    >
      <Text mb="xs" fw={600} ta="center">
        {message}
      </Text>

      <ButtonGroup
        first={{ text: "No", color, onClick: onCancel }}
        second={{ text: "Yes", color: "red", onClick: onConfirm }}
      />
    </Modal>
  );
};
