import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./route-tree.generated";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function Router() {
  return <RouterProvider router={router} />;
}
