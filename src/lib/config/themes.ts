export interface ThemeConfig {
  id: string;
  label: string;
  backgroundColor: string;
  textColor: string;
  codeBackground: string;
  codeColor?: string;
  preBackground: string;
  blockquoteBorder: string;
  blockquoteColor: string;
  linkColor?: string;
  tailwindClasses: {
    bg: string;
    text: string;
  };
}

export const themes: ThemeConfig[] = [
  {
    id: "paper",
    label: "Paper",
    backgroundColor: "#ffffff",
    textColor: "#18181b",
    codeBackground: "rgba(0, 0, 0, 0.05)",
    preBackground: "rgba(0, 0, 0, 0.05)",
    blockquoteBorder: "rgba(0, 0, 0, 0.1)",
    blockquoteColor: "rgba(0, 0, 0, 0.7)",
    tailwindClasses: {
      bg: "bg-white",
      text: "text-zinc-900",
    },
  },
  {
    id: "dark",
    label: "Dark",
    backgroundColor: "#18181b",
    textColor: "#fafafa",
    codeBackground: "rgba(255, 255, 255, 0.1)",
    preBackground: "rgba(255, 255, 255, 0.05)",
    blockquoteBorder: "rgba(255, 255, 255, 0.2)",
    blockquoteColor: "rgba(255, 255, 255, 0.7)",
    tailwindClasses: {
      bg: "bg-zinc-900",
      text: "text-zinc-100",
    },
  },
  {
    id: "terminal",
    label: "Terminal",
    backgroundColor: "#000000",
    textColor: "#22c55e",
    codeBackground: "rgba(34, 197, 94, 0.1)",
    codeColor: "#22c55e",
    preBackground: "rgba(34, 197, 94, 0.05)",
    blockquoteBorder: "rgba(34, 197, 94, 0.5)",
    blockquoteColor: "rgba(34, 197, 94, 0.8)",
    linkColor: "#22c55e",
    tailwindClasses: {
      bg: "bg-black",
      text: "text-green-400",
    },
  },
  {
    id: "sepia",
    label: "Sepia",
    backgroundColor: "#f4ecd8",
    textColor: "#5c4a3a",
    codeBackground: "rgba(92, 74, 58, 0.1)",
    preBackground: "rgba(92, 74, 58, 0.08)",
    blockquoteBorder: "rgba(92, 74, 58, 0.3)",
    blockquoteColor: "rgba(92, 74, 58, 0.8)",
    tailwindClasses: {
      bg: "bg-[#f4ecd8]",
      text: "text-[#5c4a3a]",
    },
  },
  {
    id: "nord",
    label: "Nord",
    backgroundColor: "#2e3440",
    textColor: "#eceff4",
    codeBackground: "rgba(136, 192, 208, 0.15)",
    codeColor: "#88c0d0",
    preBackground: "rgba(136, 192, 208, 0.1)",
    blockquoteBorder: "#88c0d0",
    blockquoteColor: "#d8dee9",
    linkColor: "#88c0d0",
    tailwindClasses: {
      bg: "bg-[#2e3440]",
      text: "text-[#eceff4]",
    },
  },
];

export function getThemeById(id: string): ThemeConfig | undefined {
  return themes.find((theme) => theme.id === id);
}

export function getThemeBackground(themeId: string): string {
  const theme = getThemeById(themeId);
  return theme?.backgroundColor || "#ffffff";
}

export function getThemeStyles(theme: ThemeConfig): string {
  // Base styles
  const baseStyles = `
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      background: ${theme.backgroundColor};
      color: ${theme.textColor};
      max-width: 800px;
      margin: 40px auto;
      padding: 20px;
      line-height: 1.6;
    }
    
    /* Typography */
    h1, h2, h3, h4, h5, h6 {
      margin-top: 2rem;
      margin-bottom: 1rem;
      font-weight: 600;
      line-height: 1.3;
      color: ${theme.textColor};
    }
    
    h1 { font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; line-height: 1.2; }
    h2 { font-size: 2rem; font-weight: 600; margin-top: 2rem; margin-bottom: 0.75rem; }
    h3 { font-size: 1.5rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.5rem; }
    h4 { font-size: 1.5rem; }
    h5 { font-size: 1.25rem; }
    h6 { font-size: 1rem; }
    
    h1:first-child,
    h2:first-child,
    h3:first-child,
    h4:first-child,
    h5:first-child,
    h6:first-child {
      margin-top: 0;
    }
    
    p {
      margin-bottom: 1rem;
      color: ${theme.textColor};
      line-height: 1.7;
    }
    
    /* Lists */
    ul, ol {
      margin-bottom: 1rem;
      padding-left: 1.5rem;
      color: ${theme.textColor};
    }
    
    li {
      margin-bottom: 0.5rem;
    }
    
    li > ul,
    li > ol {
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
    
    /* Links */
    a {
      text-decoration: underline;
    }
    
    a:hover {
      opacity: 0.8;
    }
    
    /* Code */
    code {
      padding: 0.2rem 0.4rem;
      border-radius: 0.25rem;
      font-size: 0.875em;
      font-family: 'Courier New', monospace;
    }
    
    pre {
      padding: 1rem;
      border-radius: 0.5rem;
      overflow-x: auto;
      margin-bottom: 1rem;
      line-height: 1.5;
    }
    
    pre code {
      background-color: transparent !important;
      padding: 0;
      font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
      font-size: 0.875em;
    }
    
    pre code.hljs {
      background: transparent !important;
      padding: 0;
    }
    
    /* Blockquotes */
    blockquote {
      padding-left: 1rem;
      margin: 1rem 0;
      font-style: italic;
    }
    
    blockquote > p {
      margin-bottom: 0.5rem;
    }
    
    blockquote > p:last-child {
      margin-bottom: 0;
    }
    
    /* Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 1rem;
    }
    
    th, td {
      border: 1px solid ${theme.blockquoteBorder};
      padding: 0.75rem;
      text-align: left;
      color: ${theme.textColor};
    }
    
    th {
      background: ${theme.codeBackground};
      font-weight: 600;
    }
    
    tr:nth-child(even) {
      background: ${theme.preBackground};
    }
    
    /* Horizontal Rule */
    hr {
      border: none;
      border-top: 2px solid ${theme.blockquoteBorder};
      margin: 2rem 0;
    }
    
    /* Images */
    img {
      max-width: 100%;
      height: auto;
      display: block;
      margin: 1rem 0;
      border-radius: 8px;
    }
    
    /* Strong and Emphasis */
    strong, b {
      font-weight: 600;
      color: ${theme.textColor};
    }
    
    em, i {
      font-style: italic;
    }
    
    /* Strikethrough */
    del, s {
      text-decoration: line-through;
      opacity: 0.7;
    }
    
    /* Print styles */
    @media print {
      body {
        margin: 0;
        padding: 20px;
      }
      
      pre {
        page-break-inside: avoid;
      }
      
      h1, h2, h3, h4, h5, h6 {
        page-break-after: avoid;
      }
    }
  `;

  let themeSpecificStyles = "";

  switch (theme.id) {
    case "paper":
      themeSpecificStyles = `
        code {
          background-color: rgba(0, 0, 0, 0.05);
        }
        pre {
          background-color: #1e1e1e;
        }
        pre code {
          color: #d4d4d4;
        }
        blockquote {
          border-left: 4px solid rgba(0, 0, 0, 0.1);
          color: rgba(0, 0, 0, 0.7);
        }
      `;
      break;
    case "dark":
      themeSpecificStyles = `
        code {
          background-color: rgba(255, 255, 255, 0.1);
        }
        pre {
          background-color: #0d1117;
        }
        pre code {
          color: #c9d1d9;
        }
        blockquote {
          border-left: 4px solid rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.7);
        }
      `;
      break;
    case "terminal":
      themeSpecificStyles = `
        code {
          background-color: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }
        pre {
          background-color: #0a0a0a;
        }
        pre code {
          color: #22c55e;
        }
        pre .hljs {
          filter: hue-rotate(90deg) saturate(0.8);
        }
        blockquote {
          border-left: 4px solid rgba(34, 197, 94, 0.5);
          color: rgba(34, 197, 94, 0.8);
        }
        a {
          color: #22c55e;
        }
      `;
      break;
    case "sepia":
      themeSpecificStyles = `
        code {
          background-color: rgba(92, 74, 58, 0.1);
        }
        pre {
          background-color: #2b2416;
        }
        pre code {
          color: #f4ecd8;
        }
        blockquote {
          border-left: 4px solid rgba(92, 74, 58, 0.3);
          color: rgba(92, 74, 58, 0.8);
        }
      `;
      break;
    case "nord":
      themeSpecificStyles = `
        code {
          background-color: rgba(136, 192, 208, 0.15);
          color: #88c0d0;
        }
        pre {
          background-color: #2e3440;
        }
        pre code {
          color: #d8dee9;
        }
        blockquote {
          border-left: 4px solid #88c0d0;
          color: #d8dee9;
        }
        a {
          color: #88c0d0;
        }
      `;
      break;
  }

  return baseStyles + themeSpecificStyles;
}
