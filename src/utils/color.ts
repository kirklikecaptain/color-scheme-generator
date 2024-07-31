import chroma, { type Color } from "chroma-js";

export const isValidColor = (color: string) => chroma.valid(color);
export const getValidColor = (color: string) => (isValidColor(color) ? chroma(color) : null);
export const getRandomColor = () => chroma.random();
export const colorToHex = (color: string) => chroma(color).hex();

export function getComplimentaryColor(color: Color) {
  const h = color.get("hsl.h");
  return color.set("hsl.h", h + 180);
}

export function getAnalogColors(color: Color) {
  const h = color.get("hsl.h");
  return [h - 30, h + 30].map((h) => color.set("hsl.h", h));
}

export function generateColorScale(color: Color, steps: number) {
  const range = [color.set("hsl.l", 0.95), color.set("hsl.l", 0.5), color.set("hsl.l", 0.2)];

  return chroma.scale(range).mode("oklab").colors(steps);
}
