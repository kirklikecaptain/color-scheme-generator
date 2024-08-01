import chroma from "chroma-js";
import { useState } from "react";

import { generateColorScale, getRandomColor, isValidColor } from "~/utils/color";

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

function getSchemeColorLabels(scaleMode: ScaleMode): string[] {
  switch (scaleMode) {
    case ScaleMode.SYSTEM:
      return ["100", "200", "300", "400", "500", "600", "700", "800", "900"];
    case ScaleMode.SIMPLE:
      return ["Tint", "Light", "Medium", "Dark", "Shade"];
    case ScaleMode.MINIMAL:
      return ["Tint", "Medium", "Shade"];
    default:
      throw new Error(`Invalid scale mode: ${scaleMode}`);
  }
}

function generateColorScheme(config: SchemeConfig) {
  if (!isValidColor(config.baseColor)) {
    return null;
  }

  const steps = getSchemeColorLabels(config.scaleMode);
  const baseColor = chroma(config.baseColor);
  const adaptiveGray = chroma.mix("gray", baseColor.temperature() < 6000 ? "red" : "blue", 0.05);

  const primary = generateColorScale(baseColor, steps);
  const neutral = generateColorScale(adaptiveGray, steps);

  let tertiary, secondary;

  switch (config.accentMode) {
    case AccentMode.COMPLIMENT:
      secondary = generateColorScale(baseColor.set("hsl.h", "+180"), steps);
      break;
    case AccentMode.ANALOGS:
      secondary = generateColorScale(baseColor.set("hsl.h", "+45"), steps);
      tertiary = generateColorScale(baseColor.set("hsl.h", "-45"), steps);
      break;
    case AccentMode.TRIADS:
      secondary = generateColorScale(baseColor.set("hsl.h", "+120"), steps);
      tertiary = generateColorScale(baseColor.set("hsl.h", "-120"), steps);
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

  function updateConfig(options: Partial<SchemeConfig>) {
    setConfig((prevConfig) => ({
      ...prevConfig,
      ...options,
    }));
  }

  const colorScheme = generateColorScheme(config);

  return { config, updateConfig, colorScheme };
}

export type ColorSchemeContextType = ReturnType<typeof useColorSchemeState> | null;
