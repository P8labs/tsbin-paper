import html2canvas from "html2canvas";
import { getFontFamily } from "$lib/config/fonts";
import { getThemeStyles, type ThemeConfig } from "$lib/config/themes";

export function downloadFile(content: string, type: string, filename: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export async function exportToPNG(elementId: string, backgroundColor: string) {
  const element = document.getElementById(elementId);
  if (!element) return;

  // Temporarily fix overflow for code blocks during export
  const codeBlocks = element.querySelectorAll("pre");
  const originalStyles: { element: HTMLElement; overflow: string }[] = [];

  codeBlocks.forEach((pre) => {
    const htmlPre = pre as HTMLElement;
    originalStyles.push({ element: htmlPre, overflow: htmlPre.style.overflow });
    htmlPre.style.overflow = "visible";
    htmlPre.style.whiteSpace = "pre-wrap";
    htmlPre.style.wordBreak = "break-word";
  });

  try {
    const canvas = await html2canvas(element, {
      backgroundColor,
      scale: 1,
      logging: false,
      allowTaint: true,
      useCORS: true,
    });

    const link = document.createElement("a");
    link.download = `paper-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  } catch (err) {
    console.error("Export failed:", err);
    throw err;
  } finally {
    // Restore original styles
    originalStyles.forEach(({ element, overflow }) => {
      element.style.overflow = overflow;
      element.style.whiteSpace = "";
      element.style.wordBreak = "";
    });
  }
}

export function createHTMLExport(
  content: string,
  fontId: string,
  theme: ThemeConfig,
): string {
  const fontFamily = getFontFamily(fontId);
  const themeStyles = getThemeStyles(theme);

  // Extract first heading for title and description
  const titleMatch = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
  const title = titleMatch ? titleMatch[1] : "Paper Export";
  const descMatch = content.match(/<p[^>]*>([^<]+)<\/p>/);
  const description = descMatch
    ? descMatch[1].substring(0, 160)
    : "Document created with paper";

  return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="generator" content="paper.tsbin.tech">
	<meta name="description" content="${description.replace(/"/g, "&quot;")}">
	
	<!-- Favicon -->
	<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>📄</text></svg>">
	
	<!-- Open Graph -->
	<meta property="og:type" content="article">
	<meta property="og:title" content="${title.replace(/"/g, "&quot;")}">
	<meta property="og:description" content="${description.replace(/"/g, "&quot;")}">
	<meta property="og:site_name" content="paper">
	
	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary">
	<meta name="twitter:title" content="${title.replace(/"/g, "&quot;")}">
	<meta name="twitter:description" content="${description.replace(/"/g, "&quot;")}">
	
	<title>${title}</title>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css" />
	<style>
		body {
			font-family: ${fontFamily};
		}
		${themeStyles}
	</style>
</head>
<body>
${content}
</body>
</html>`;
}
