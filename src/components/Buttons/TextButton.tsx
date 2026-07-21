import { Button } from "@mantine/core";

interface TextButtonProps {
  width: number;
  text: string;
  customColor?: string;
  onClick: () => void;
}

export const TextButton = ({
  width,
  text,
  customColor,
  onClick,
}: TextButtonProps) => {
  return (
    <Button
      w={width}
      color={customColor ?? "white"}
      variant="subtle"
      onClick={onClick}
      size="sm"
      px={0}
    >
      {text}
    </Button>
  );
};
