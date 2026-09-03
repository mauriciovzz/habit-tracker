import { type ReactNode, useState } from "react";
import {
  Flex,
  Divider,
  Text,
  Stack,
  useMantineColorScheme,
  Group,
  ActionIcon,
  Button,
  SegmentedControl,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import { Carousel } from "@mantine/carousel";
import type { EmblaCarouselType } from "embla-carousel";
import {
  IconBrandLinkedin,
  IconBrandGithub,
  IconBriefcase,
} from "@tabler/icons-react";

import { TextButton, AppModal } from "@/components";
import { SlideList, SlideParagraph, SlideTitle } from "./components";

const SLIDES = [
  { key: "trackingHabits", text: "help.trackingHabits.heading", page: 1 },
  { key: "dailyGoal", text: "help.dailyGoal.heading", page: 2 },
  { key: "checks", text: "help.checks.heading", page: 3 },
  { key: "habitDetails", text: "help.habitDetails.heading", page: 4 },
  { key: "managingHabits", text: "help.managingHabits.heading", page: 5 },
  { key: "settings", text: "help.settings.heading", page: 6 },
  { key: "updates", text: "help.updates.heading", page: 7 },
  { key: "installation", text: "help.installation.heading", page: 8 },
];

const Slide = ({ children }: { children: ReactNode }) => (
  <Carousel.Slide>
    <Stack gap={0} h="100%" flex={1}>
      <Stack flex={1} gap="sm" px="sm">
        {children}
      </Stack>

      <Flex h={12} />

      <Divider />

      <Flex h={5 + 12} />
    </Stack>
  </Carousel.Slide>
);

const LINKS = [
  {
    key: "linkedin",
    icon: IconBrandLinkedin,
    url: "https://www.linkedin.com/",
  },
  { key: "github", icon: IconBrandGithub, url: "http://github.com/" },
  { key: "briefcase", icon: IconBriefcase, url: "http://google.com/" },
];

interface Props {
  opened: boolean;
  onClose: () => void;
}

export const HelpModal = ({ opened, onClose }: Props) => {
  const { t } = useTranslation();
  const { colorScheme } = useMantineColorScheme();

  const [embla, setEmbla] = useState<EmblaCarouselType | null>(null);
  const [value, setValue] = useState("ios");

  return (
    <AppModal opened={opened} onClose={onClose}>
      <Flex
        bg="var(--mantine-color-default-border)"
        c="white"
        px="sm"
        bdrs="md"
        align="center"
      >
        <Text flex={1} p={0} ta="left" size="xl" c="white" fw={700}>
          {t("help.title")}
        </Text>

        <TextButton text={t("back")} onClick={onClose} />
      </Flex>

      <Divider />

      <Stack flex={1}>
        <Carousel
          height="100%"
          w="100%"
          slideGap="sm"
          withControls={false}
          withIndicators
          getEmblaApi={setEmbla}
          styles={{
            indicators: { bottom: 0 },
            indicator: {
              backgroundColor: colorScheme === "dark" ? undefined : "black",
            },
          }}
        >
          <Slide>
            <Stack flex={1}>
              <Stack gap={6} flex={1}>
                {SLIDES.map(({ key, text, page }) => (
                  <Button
                    key={key}
                    variant="subtle"
                    color="var(--mantine-color-text)"
                    flex={1}
                    size="sm"
                    onClick={() => embla?.scrollTo(page)}
                  >
                    {t(text)}
                  </Button>
                ))}
              </Stack>

              <Divider />

              <Stack gap={12} style={{ userSelect: "none" }}>
                <Stack gap={0}>
                  <Text ta="center" size="sm">
                    {t("help.index.devBy")}
                  </Text>

                  <Text ta="center" size="xs">
                    {t("help.index.tools")}
                  </Text>
                </Stack>

                <Group justify="center" style={{ userSelect: "none" }}>
                  {LINKS.map(({ key, icon: Icon, url }) => (
                    <ActionIcon
                      key={key}
                      variant="transparent"
                      color="var(--mantine-color-text)"
                      component="a"
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon />
                    </ActionIcon>
                  ))}
                </Group>
              </Stack>
            </Stack>
          </Slide>

          <Slide>
            <SlideTitle text={"help.trackingHabits.heading"} />

            <SlideParagraph text="help.trackingHabits.description" />
            <SlideParagraph text="help.trackingHabits.habitButton" />
            <SlideParagraph text="help.trackingHabits.reachGoal" />
          </Slide>

          <Slide>
            <SlideTitle text={"help.dailyGoal.heading"} />

            <SlideParagraph text="help.dailyGoal.description" />
            <SlideParagraph text="help.dailyGoal.limit" />
            <SlideParagraph text="help.dailyGoal.example" />
          </Slide>

          <Slide>
            <SlideTitle text={"help.checks.heading"} />

            <SlideParagraph text="help.checks.description" />
            <SlideParagraph text="help.checks.actions" />
            <SlideList text="help.checks.actionsList" />
          </Slide>

          <Slide>
            <SlideTitle text={"help.habitDetails.heading"} />

            <SlideParagraph text="help.habitDetails.description" />
            <SlideList text="help.habitDetails.sections" />
            <SlideParagraph text="help.habitDetails.calendar" />
            <SlideParagraph text="help.habitDetails.heatmap" />
          </Slide>

          <Slide>
            <SlideTitle text={"help.managingHabits.heading"} />

            <SlideParagraph text="help.managingHabits.description" />
            <SlideParagraph text="help.managingHabits.edit" />
            <SlideParagraph text="help.managingHabits.reset" />
            <SlideParagraph text="help.managingHabits.delete" />
          </Slide>

          <Slide>
            <SlideTitle text={"help.settings.heading"} />

            <SlideParagraph text="help.settings.description" />
            <SlideParagraph text="help.settings.download" />
            <SlideParagraph text="help.settings.load" />
            <SlideParagraph text="help.settings.delete" />
            <SlideParagraph text="help.settings.bottomBar" />
          </Slide>

          <Slide>
            <SlideTitle text={"help.updates.heading"} />

            <SlideParagraph text="help.updates.description" />
            <SlideParagraph text="help.updates.update" />
            <SlideParagraph text="help.updates.latest" />
          </Slide>

          <Slide>
            <SlideTitle text={t("help.installation.heading")} />

            <SegmentedControl
              size="sm"
              fullWidth
              transitionDuration={0}
              value={value}
              onChange={setValue}
              data={[
                { label: "iOS", value: "ios" },
                { label: "Android", value: "android" },
                {
                  label: t("help.installation.desktop.heading"),
                  value: "desktop",
                },
              ]}
            />

            <Text size="sm" fw={550} inline={true}>
              {t(`help.installation.${value}.heading`)}
            </Text>

            <SlideList ordered text={`help.installation.${value}.steps`} />

            <SlideParagraph text={t(`help.installation.${value}.tips`)} />
          </Slide>
        </Carousel>
      </Stack>
    </AppModal>
  );
};
