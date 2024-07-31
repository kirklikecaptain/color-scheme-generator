import { Flex, Text } from "@radix-ui/themes";

import { Stack } from "~/components";
import { useColorScheme } from "~/hooks/use-color-scheme";

export function SchemeColors() {
  const { colorScheme } = useColorScheme();

  return (
    <Flex width="100%">
      {colorScheme?.primary?.map((c) => (
        <Stack key={c.label}>
          <div style={{ background: c.color, height: 60 }} />
          <Text>{c.label}</Text>
        </Stack>
      ))}
    </Flex>
  );
}
