import { useMantineColorScheme, useComputedColorScheme } from "@mantine/core";

export function useColorSchema() {
  const { setColorScheme } = useMantineColorScheme();
  const colorScheme = useComputedColorScheme("light");

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return { colorScheme, toggleColorScheme };
}
