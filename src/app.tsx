import React from "react";
import ReactDOM from "react-dom/client";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

import "./app.css";
import { Router } from "./router";

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Theme>
      <Router />
    </Theme>
  </React.StrictMode>,
);
