import chroma, { type Color } from "chroma-js";

export const WCAG_CONTRAST = {
  minimum: {
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

type ContrastRatioResult = {
  ratio: number;
  isPassing: {
    minimum: { AA: boolean; AAA: boolean };
    large: { AA: boolean; AAA: boolean };
  };
};

export function checkContrastRatio(color1: Color, color2: Color): ContrastRatioResult {
  const ratio = chroma.contrast(color1, color2);

  return {
    ratio,
    isPassing: {
      minimum: {
        AA: ratio >= WCAG_CONTRAST.minimum.AA,
        AAA: ratio >= WCAG_CONTRAST.minimum.AAA,
      },
      large: {
        AA: ratio >= WCAG_CONTRAST.large.AA,
        AAA: ratio >= WCAG_CONTRAST.large.AAA,
      },
    },
  };
}
