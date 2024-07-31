import { Flex, Heading, Separator, Text } from "@radix-ui/themes";

import { Stack } from "~/components";
import { useColorScheme } from "~/hooks/use-color-scheme";
import { ColorScale } from "~/hooks/use-color-scheme/state";

type ColorSwatchRowProps = {
  title: string;
  colors?: ColorScale;
};

function ColorSwatchRow({ title, colors }: ColorSwatchRowProps) {
  if (!colors) {
    return null;
  }

  return (
    <Stack gap="4">
      <Heading
        size="4"
        as="h3"
      >
        {title}
      </Heading>
      <Flex gap="2">
        {colors.map(({ label, color }) => (
          <Stack
            gap="1"
            key={label}
          >
            <div
              style={{
                background: color,
                height: 60,
                borderRadius: 4,
              }}
            />
            <Text>{label}</Text>
          </Stack>
        ))}
      </Flex>
    </Stack>
  );
}

export function SchemeColors() {
  const { colorScheme } = useColorScheme();

  if (!colorScheme) {
    return null;
  }

  return (
    <Stack gap="4">
      <Heading as="h2">Colors</Heading>
      <Separator size="4" />
      <ColorSwatchRow
        title="Primary"
        colors={colorScheme.primary}
      />
      <ColorSwatchRow
        title="Secondary"
        colors={colorScheme.secondary}
      />
      <ColorSwatchRow
        title="Tertiary"
        colors={colorScheme.tertiary}
      />
      <ColorSwatchRow
        title="Neutral"
        colors={colorScheme.neutral}
      />
    </Stack>
  );
}
