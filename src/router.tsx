import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from "@tanstack/react-router";

import { AppLayout } from "./components";
import { SchemeGenerator } from "./features";

function RootComponent() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}

const rootRoute = createRootRoute({
  component: RootComponent,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: SchemeGenerator,
});

const routeTree = rootRoute.addChildren([indexRoute]);
const router = createRouter({ routeTree });

export function Router() {
  return <RouterProvider router={router} />;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
