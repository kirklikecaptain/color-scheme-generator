import { Heading } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";

function Index() {
  return (
    <div>
      <Heading>Color Scheme Generator</Heading>
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: Index,
});
