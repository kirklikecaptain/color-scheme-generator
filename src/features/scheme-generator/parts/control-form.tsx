import { Flex, Text, Button, Select } from "@radix-ui/themes";
import { type FormEvent, useState } from "react";

import { randomColor } from "~/utils/color";
import { Stack, ColorField } from "~/components";

const options = {
  range: ["System 10", "Simple 6", "Minimal 4", "Big 3"],
  accent: ["Complement", "Analog", "Triads", "Tetrads", "None"],
};

export function ControlForm() {
  const [primaryColor, setPrimaryColor] = useState(randomColor());
  const [accent, setAccent] = useState(options.accent[0]);
  const [range, setRange] = useState(options.range[0]);

  const onColorChange = (color: string) => setPrimaryColor(color);
  const onAccentChange = (opt: string) => setAccent(opt);
  const onRangeChange = (opt: string) => setRange(opt);

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submit: ", { primaryColor, accent, range });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <Flex
        gap="2"
        align="end"
      >
        <Stack
          gap="1"
          width="250px"
        >
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
            initialValue={primaryColor}
            onChange={onColorChange}
          />
        </Stack>
        <Stack
          gap="1"
          width="200px"
        >
          <Text
            as="label"
            size="1"
          >
            Accent Color
          </Text>
          <Select.Root
            size="3"
            name="accent_color"
            value={accent}
            onValueChange={onAccentChange}
          >
            <Select.Trigger />
            <Select.Content
              position="popper"
              id="accent_color"
            >
              <Select.Group>
                {options.accent.map((opt) => (
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
        <Stack
          gap="1"
          width="200px"
        >
          <Text
            as="label"
            size="1"
          >
            Scale
          </Text>
          <Select.Root
            size="3"
            value={range}
            onValueChange={onRangeChange}
          >
            <Select.Trigger />
            <Select.Content position="popper">
              <Select.Group>
                {options.range.map((opt) => (
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
        <Button
          size="3"
          type="submit"
        >
          Generate Scheme
        </Button>
      </Flex>
      <pre>{JSON.stringify({ primaryColor, accent, range }, null, 2)}</pre>
    </form>
  );
}
