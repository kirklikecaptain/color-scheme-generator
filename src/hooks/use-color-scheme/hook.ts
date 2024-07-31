import { useContext } from "react";

import { ColorSchemeContext } from "./context";

export function useColorScheme() {
  const context = useContext(ColorSchemeContext);

  if (!context) {
    throw new Error("useColorSchemeContext must be used within a ColorSchemeProvider");
  }

  return context;
}
