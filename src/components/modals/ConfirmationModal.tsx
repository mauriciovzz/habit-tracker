import { Button, Divider, Center, Group, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";

import { AppModal } from "./AppModal";

interface Props {
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
}: Props) => {
  const { t } = useTranslation();

  const confirm = () => {
    onConfirm();
    onCancel();
  };

  return (
    <AppModal opened={opened} onClose={onCancel}>
      <Center h={33} bg={color} bdrs="md">
        <Text c="white" fw={700}>
          {t(message)}
        </Text>
      </Center>

      <Divider />

      <Group>
        <Button variant="default" h={33} flex={1} size="sm" onClick={onCancel}>
          {t("no")}
        </Button>

        <Button variant="default" flex={1} h={33} size="sm" onClick={confirm}>
          {t("yes")}
        </Button>
      </Group>
    </AppModal>
  );
};
