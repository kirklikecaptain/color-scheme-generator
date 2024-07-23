import { Outlet } from "@tanstack/react-router";

import { Header } from "./parts/header";
import { Footer } from "./parts/footer";

export function AppLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
