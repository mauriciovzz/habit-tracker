import { RingProgress, UnstyledButton } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

interface ProgressButtonTypes {
  progress: number;
  color: string;
  updateProgress: () => Promise<void>;
}

export const ProgressButton = ({ progress, color, updateProgress }: ProgressButtonTypes) => {
  return (
    <UnstyledButton
      onClick={() => {
        void updateProgress();
      }}
    >
      <RingProgress
        size={35}
        thickness={2}
        sections={[{ value: progress, color }]}
        transitionDuration={250}
        label={progress === 100 ? <IconCheck size={35} /> : null}
      />
    </UnstyledButton>
  );
};
