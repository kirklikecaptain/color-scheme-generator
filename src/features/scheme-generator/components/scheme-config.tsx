import { Text, Select, Flex } from "@radix-ui/themes";

import { Stack, ColorField } from "~/components";
import { useColorScheme, AccentMode, ScaleMode } from "~/hooks/use-color-scheme";

export function SchemeConfig() {
  const { config, updateConfig } = useColorScheme();

  return (
    <Stack gap="4">
      <Flex gap="4">
        <Stack gap="1">
          <Text
            as="label"
            size="1"
            htmlFor="base_color"
          >
            Base Color
          </Text>
          <ColorField
            name="base_color"
            size="3"
            value={config.baseColor}
            onChange={(color) => updateConfig({ baseColor: color })}
            placeholder="Set a base color..."
          />
        </Stack>
        <Stack gap="1">
          <Text
            as="label"
            size="1"
          >
            Accent Color
          </Text>
          <Select.Root
            size="3"
            value={config.accentMode}
            onValueChange={(opt) => updateConfig({ accentMode: opt as AccentMode })}
          >
            <Select.Trigger />
            <Select.Content
              position="popper"
              id="accent_color"
            >
              <Select.Group>
                {Object.values(AccentMode).map((opt) => (
                  <Select.Item
                    key={opt}
                    value={opt}
                  >
                    {opt}
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </Stack>
        <Stack gap="1">
          <Text
            as="label"
            size="1"
          >
            Scale
          </Text>
          <Select.Root
            size="3"
            value={config.scaleMode}
            onValueChange={(opt) => updateConfig({ scaleMode: opt as ScaleMode })}
          >
            <Select.Trigger />
            <Select.Content position="popper">
              <Select.Group>
                {Object.values(ScaleMode).map((opt) => (
                  <Select.Item
                    key={opt}
                    value={opt}
                  >
                    {opt}
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </Stack>
      </Flex>
    </Stack>
  );
}
