import { Text } from "@mantine/core";
import { Trans } from "react-i18next";

interface Props {
  text: string;
}

export const SlideTitle = ({ text }: Props) => (
  <Text size="lg" fw={700} inline={true}>
    <Trans i18nKey={text} />
  </Text>
);
