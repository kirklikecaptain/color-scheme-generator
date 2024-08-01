import chroma, { type Color } from "chroma-js";

export const isValidColor = (color: string) => chroma.valid(color);

export const isWarmColor = (color: Color) => chroma(color).temperature() < 6000;

export const getRandomColor = () => chroma.random();

export const colorStringToHex = (color: string) => chroma(color).hex();

export function generateColorScale(color: Color, steps: string[]) {
  const [h, s] = color.hsl();

  const lightest = chroma.hsl(h, Math.min(s, 0.5), 0.95);
  const middle = chroma.hsl(h, Math.min(s, 0.7), 0.5);
  const darkest = chroma.hsl(h, Math.min(s, 0.5), 0.25);

  const colors = chroma.scale([lightest, middle, darkest]).mode("oklab").colors(steps.length);

  return colors.map((c, i) => ({
    label: steps[i],
    color: c,
  }));
}
