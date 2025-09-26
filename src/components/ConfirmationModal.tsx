import { Modal, Text } from "@mantine/core";
import { ButtonGroup } from "./Buttons/ButtonGroup";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
        first={{ text: t("no"), color, onClick: onCancel }}
        second={{ text: t("yes"), color: "red", onClick: onConfirm }}
      />
    </Modal>
  );
};
