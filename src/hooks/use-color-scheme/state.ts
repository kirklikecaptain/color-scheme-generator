import chroma, { Color } from "chroma-js";
import { useState } from "react";

export enum AccentMode {
  COMPLIMENT = "Complement",
  ANALOG = "Analog",
  TRIADS = "Triads",
  NONE = "None",
}

export enum ScaleMode {
  SYSTEM = "System",
  SIMPLE = "Simple",
  MINIMAL = "Minimal",
}

export const colorLabels = {
  [ScaleMode.SYSTEM]: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  [ScaleMode.SIMPLE]: ["Tint", "Light", "Medium", "Dark", "Shade"],
  [ScaleMode.MINIMAL]: ["Tint", "Medium", "Shade"],
};

type SchemeConfig = {
  baseColor: string;
  accentMode: AccentMode;
  scaleMode: ScaleMode;
};

function generatePrimaryScale(baseColor: Color, scaleMode: ScaleMode) {
  const labels = colorLabels[scaleMode];

  return generateColorScale(baseColor, labels.length).map((c, i) => ({
    label: labels[i],
    color: c,
  }));
}

function generateColorScale(color: Color, steps: number) {
  const range = ["white", color.set("hsl.l", 0.5), "black"];

  return chroma.scale(range).padding([0.15, 0.2]).mode("oklab").colors(steps);
}

function generateColorScheme(config: SchemeConfig) {
  if (!chroma.valid(config.baseColor)) {
    return;
  }

  const baseColor = chroma(config.baseColor);

  const primary = generatePrimaryScale(baseColor, config.scaleMode);

  return { primary };
}

export function useColorSchemeState() {
  const [config, setConfig] = useState<SchemeConfig>({
    baseColor: "",
    accentMode: AccentMode.COMPLIMENT,
    scaleMode: ScaleMode.SYSTEM,
  });

  function updateConfig(options: Partial<typeof config>) {
    setConfig((prevConfig) => ({
      ...prevConfig,
      ...options,
    }));
  }

  const colorScheme = generateColorScheme(config);

  return { config, updateConfig, colorScheme };
}

export type ColorSchemeContextType = ReturnType<typeof useColorSchemeState> | null;
