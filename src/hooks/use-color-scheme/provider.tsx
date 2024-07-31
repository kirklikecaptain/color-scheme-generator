import { type PropsWithChildren } from "react";

import { useColorSchemeState } from "./state";
import { ColorSchemeContext } from "./context";

export function ColorSchemeProvider({ children }: PropsWithChildren) {
  const colorSchemeState = useColorSchemeState();

  return <ColorSchemeContext.Provider value={colorSchemeState}>{children}</ColorSchemeContext.Provider>;
}
