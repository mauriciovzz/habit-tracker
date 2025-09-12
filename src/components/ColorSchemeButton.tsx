import { ActionIcon } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";

interface ColorSchemeButtonProps {
  colorScheme: "light" | "dark";
  toggleColorScheme: () => void;
}

export const ColorSchemeButton = ({ colorScheme, toggleColorScheme }: ColorSchemeButtonProps) => {
  return (
    <ActionIcon
      variant="default"
      aria-label="ChangeMode"
      onClick={() => {
        toggleColorScheme();
      }}
    >
      {colorScheme === "dark" ? (
        <IconSun style={{ width: "70%", height: "70%" }} stroke={1.5} />
      ) : (
        <IconMoon style={{ width: "70%", height: "70%" }} stroke={1.5} />
      )}
    </ActionIcon>
  );
};
