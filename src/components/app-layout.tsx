import { Box, Separator, Text } from "@radix-ui/themes";

import { Stack } from "./stack";
import { Center } from "./center";

type AppLayoutProps = {
  children: React.ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <Stack minHeight="100svh">
      <header>
        <Center p="4">
          <Text>Color Scheme Generator</Text>
        </Center>
      </header>
      <Separator size="4" />
      {children}
      <footer style={{ marginTop: "auto", backgroundColor: "var(--gray-3)" }}>
        <Box p="4">
          <Center>Footer</Center>
        </Box>
      </footer>
    </Stack>
  );
}
