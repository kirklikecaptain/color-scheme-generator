import { Container, Section } from "@radix-ui/themes";

import { Stack } from "~/components";
import { ColorSchemeProvider } from "~/hooks/use-color-scheme";

import { SchemeConfig } from "./components/scheme-config";
import { SchemeColors } from "./components/scheme-colors";

export function SchemeGenerator() {
  return (
    <ColorSchemeProvider>
      <Section>
        <Container>
          <Stack gap="4">
            <SchemeConfig />
            <SchemeColors />
          </Stack>
        </Container>
      </Section>
    </ColorSchemeProvider>
  );
}
