import chroma from "chroma-js";

export const randomColor = () => chroma.random().hex();
export const isValidColor = (color: string) => chroma.valid(color);
export const colorToHex = (color: string) => chroma(color).hex();
