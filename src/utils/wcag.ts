import chroma, { type Color } from "chroma-js";

export const WCAG_CONTRAST = {
  small: {
    AA: 4.5,
    AAA: 7,
  },
  large: {
    AA: 3,
    AAA: 4.5,
  },
};

export const WCAG_FONT_SIZE = {
  minimum: "9pt",
  standard: "12pt",
  large: {
    bold: "14pt",
    regular: "18pt",
  },
};

type Compliance = {
  AA: boolean;
  AAA: boolean;
};

type ContrastRatioResult = {
  ratio: number;
  small: Compliance;
  large: Compliance;
};

export function checkContrastRatio(color1: Color, color2: Color): ContrastRatioResult {
  const ratio = chroma.contrast(color1, color2);

  return {
    ratio,
    small: {
      AA: ratio >= WCAG_CONTRAST.small.AA,
      AAA: ratio >= WCAG_CONTRAST.small.AAA,
    },
    large: {
      AA: ratio >= WCAG_CONTRAST.large.AA,
      AAA: ratio >= WCAG_CONTRAST.large.AAA,
    },
  };
}
