import chroma, { type Color } from "chroma-js";
import { useState } from "react";

import { getRandomColor } from "~/utils/color";

export enum AccentMode {
  COMPLIMENT = "Complement",
  ANALOGS = "Analogs",
  TRIADS = "Triads",
  NONE = "None",
}

export enum ScaleMode {
  SYSTEM = "System",
  SIMPLE = "Simple",
  MINIMAL = "Minimal",
}

export type SchemeConfig = {
  baseColor: string;
  accentMode: AccentMode;
  scaleMode: ScaleMode;
};

export type ColorScaleOptions = {
  name: string;
  color: Color;
  labels: string[];
};

export type ColorScale = { label: string; color: string }[];

function getSchemeColorLabels(scaleMode: ScaleMode): string[] {
  switch (scaleMode) {
    case ScaleMode.SYSTEM:
      return ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"];
    case ScaleMode.SIMPLE:
      return ["Tint", "Light", "Medium", "Dark", "Shade"];
    case ScaleMode.MINIMAL:
      return ["Tint", "Medium", "Shade"];
    default:
      throw new Error(`Invalid scale mode: ${scaleMode}`);
  }
}

function generateColorScale(color: Color, scaleMode: ScaleMode): ColorScale {
  const labels = getSchemeColorLabels(scaleMode);

  const [h, s] = color.hsl();

  const lightest = chroma.hsl(h, Math.min(s, 0.5), 0.95);
  const middle = chroma.hsl(h, Math.min(s, 0.7), 0.5);
  const darkest = chroma.hsl(h, Math.min(s, 0.5), 0.25);

  const colors = chroma.scale([lightest, middle, darkest]).mode("oklab").colors(labels.length);

  return colors.map((c, i) => ({
    label: labels[i],
    color: c,
  }));
}

function generateColorScheme(config: SchemeConfig) {
  if (!chroma.valid(config.baseColor)) {
    return null;
  }

  const baseColor = chroma(config.baseColor);
  const adaptiveGray = chroma.mix("gray", baseColor.temperature() < 6000 ? "red" : "blue", 0.05);

  const primary = generateColorScale(baseColor, config.scaleMode);
  const neutral = generateColorScale(adaptiveGray, config.scaleMode);

  let tertiary, secondary;

  switch (config.accentMode) {
    case AccentMode.COMPLIMENT:
      secondary = generateColorScale(baseColor.set("hsl.h", "+180"), config.scaleMode);
      break;
    case AccentMode.ANALOGS:
      secondary = generateColorScale(baseColor.set("hsl.h", "-60"), config.scaleMode);
      tertiary = generateColorScale(baseColor.set("hsl.h", "60"), config.scaleMode);
      break;
    case AccentMode.TRIADS:
      secondary = generateColorScale(baseColor.set("hsl.h", "-120"), config.scaleMode);
      tertiary = generateColorScale(baseColor.set("hsl.h", "+120"), config.scaleMode);
      break;
    case AccentMode.NONE:
      break;
    default:
      throw new Error(`Invalid accent mode: ${config.accentMode}`);
  }

  return {
    primary,
    neutral,
    secondary,
    tertiary,
  };
}

export function useColorSchemeState() {
  const [config, setConfig] = useState<SchemeConfig>({
    baseColor: getRandomColor().hex(),
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
