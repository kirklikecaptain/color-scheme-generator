import { Flex, type FlexProps } from "@radix-ui/themes";

export function Center(props: FlexProps) {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      {...props}
    />
  );
}
