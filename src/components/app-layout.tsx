import { Text } from "@radix-ui/themes";
import { type PropsWithChildren } from "react";

import { Stack } from "./stack";
import { Center } from "./center";

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <Stack minHeight="100svh">
      <header style={{ borderBottom: "solid 1px var(--gray-3)" }}>
        <Center p="4">
          <Text>Color Scheme Generator</Text>
        </Center>
      </header>
      <main>{children}</main>
      <footer style={{ marginTop: "auto", borderTop: "solid 1px var(--gray-3)" }}>
        <Center p="4">Footer</Center>
      </footer>
    </Stack>
  );
}
