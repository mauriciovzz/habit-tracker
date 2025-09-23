import { Button, Group, Stack, Text } from "@mantine/core";
import type { IconProps, Icon } from "@tabler/icons-react";

interface SettingsButtonProps {
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
  header: string;
  description: string;
  onClick: () => void;
}

export const SettingsButton = ({ icon, header, description, onClick }: SettingsButtonProps) => {
  const SettingIcon = icon;
  return (
    <Button
      onClick={onClick}
      variant="default"
      fullWidth
      h="100%"
      radius="lg"
      px="md"
      py="sm"
      styles={{ inner: { justifyContent: "flex-start" } }}
    >
      <Group gap="md" wrap="nowrap">
        <SettingIcon size={25} />
        <Stack gap={0} style={{ flex: 1 }}>
          <Text size="md" fw={600} ta="left">
            {header}
          </Text>
          <Text size="sm" fw={500} ta="left" c="dimmed">
            {description}
          </Text>
        </Stack>
      </Group>
    </Button>
  );
};
