import { ActionIcon } from "@mantine/core";
import type { TablerIcon } from "@tabler/icons-react";

interface Props {
  icon: TablerIcon;
  onClick: () => void;
}

export const AppActionIcon = ({ icon: Icon, onClick }: Props) => (
  <ActionIcon
    variant="transparent"
    size={30}
    color="var(--mantine-color-text)"
    onClick={onClick}
  >
    <Icon size={30} />
  </ActionIcon>
);
