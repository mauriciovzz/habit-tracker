import { Button } from "@mantine/core";

interface TextButtonProps {
  width?: number;
  text: string;
  onClick: () => void;
}

export const TextButton = ({ width, text, onClick }: TextButtonProps) => {
  return (
    <Button
      variant="transparent"
      w={width}
      size="compact-xs"
      p={0}
      color="white"

      onClick={onClick}
    >
      {text}
    </Button>
  );
};
