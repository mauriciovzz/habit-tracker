import { RingProgress, UnstyledButton } from "@mantine/core";
import { type ReactNode } from "@tabler/icons-react";

interface ProgressButtonTypes {
  progress: number;
  color: string;
  updateProgress: () => Promise<void>;
  label: string | null | ReactNode;
}

export const ProgressButton = ({ progress, color, updateProgress, label }: ProgressButtonTypes) => {
  return (
    <UnstyledButton
      onClick={(e) => {
        e.stopPropagation();
        void updateProgress();
      }}
    >
      <RingProgress
        size={35}
        thickness={2}
        sections={[{ value: progress, color }]}
        transitionDuration={250}
        label={label}
      />
    </UnstyledButton>
  );
};
