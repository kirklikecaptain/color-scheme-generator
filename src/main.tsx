import React from "react";
import ReactDOM from "react-dom/client";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

import { AppLayout } from "./components";
import { SchemeGenerator } from "./features";
import "./styles/global.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("No root element found");
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Theme>
      <AppLayout>
        <SchemeGenerator />
      </AppLayout>
    </Theme>
  </React.StrictMode>,
);
