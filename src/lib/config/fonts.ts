export interface FontConfig {
  id: string;
  label: string;
  fontFamily: string;
  googleFont?: string;
  fallback: string;
}

export const fonts: FontConfig[] = [
  {
    id: "serif",
    label: "Serif",
    fontFamily: "Georgia",
    fallback: "serif",
  },
  {
    id: "sans",
    label: "Sans Serif",
    fontFamily: "-apple-system, BlinkMacSystemFont",
    fallback: "sans-serif",
  },
  {
    id: "mono",
    label: "Monospace",
    fontFamily: "Courier New",
    fallback: "monospace",
  },
  {
    id: "outfit",
    label: "Outfit",
    fontFamily: "Outfit",
    googleFont: "Outfit:300,400,500,600,700",
    fallback: "sans-serif",
  },
  {
    id: "merriweather",
    label: "Merriweather",
    fontFamily: "Merriweather",
    googleFont: "Merriweather:300,400,700",
    fallback: "serif",
  },
  {
    id: "lora",
    label: "Lora",
    fontFamily: "Lora",
    googleFont: "Lora:400,500,600,700",
    fallback: "serif",
  },
  {
    id: "playfair",
    label: "Playfair Display",
    fontFamily: "Playfair Display",
    googleFont: "Playfair+Display:400,500,600,700",
    fallback: "serif",
  },
  {
    id: "inter",
    label: "Inter",
    fontFamily: "Inter",
    googleFont: "Inter:300,400,500,600,700",
    fallback: "sans-serif",
  },
  {
    id: "roboto",
    label: "Roboto",
    fontFamily: "Roboto",
    googleFont: "Roboto:300,400,500,700",
    fallback: "sans-serif",
  },
  {
    id: "open-sans",
    label: "Open Sans",
    fontFamily: "Open Sans",
    googleFont: "Open+Sans:300,400,500,600,700",
    fallback: "sans-serif",
  },
  {
    id: "jetbrains",
    label: "JetBrains Mono",
    fontFamily: "JetBrains Mono",
    googleFont: "JetBrains+Mono:400,500,600,700",
    fallback: "monospace",
  },
  {
    id: "fira-code",
    label: "Fira Code",
    fontFamily: "Fira Code",
    googleFont: "Fira+Code:400,500,600,700",
    fallback: "monospace",
  },
];

export function getFontById(id: string): FontConfig | undefined {
  return fonts.find((font) => font.id === id);
}

export function getFontFamily(fontId: string): string {
  const font = getFontById(fontId);
  if (!font) return "Georgia, serif";
  return `${font.fontFamily}, ${font.fallback}`;
}

export function getGoogleFontsUrl(): string {
  const googleFonts = fonts
    .filter((font) => font.googleFont)
    .map((font) => font.googleFont)
    .join("&family=");
  return googleFonts
    ? `https://fonts.googleapis.com/css2?family=${googleFonts}&display=swap`
    : "";
}
