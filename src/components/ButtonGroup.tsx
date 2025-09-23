import { Button, Group } from "@mantine/core";

interface ButtonProps {
  text: string;
  color: string;
  onClick: () => void;
}

interface AcceptDeclineButtonsProps {
  first: ButtonProps;
  second: ButtonProps;
}
export const ButtonGroup = ({ first, second }: AcceptDeclineButtonsProps) => {
  const secondColor = second.color === "red" ? "#FF1A1A" : second.color;

  return (
    <Group w="100%">
      <Button flex={1} color={first.color} variant="filled" onClick={first.onClick}>
        {first.text}
      </Button>
      <Button flex={1} color={secondColor} variant="filled" onClick={second.onClick}>
        {second.text}
      </Button>
    </Group>
  );
};
