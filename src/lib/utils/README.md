# Utility Functions

Shared utility functions used across the application.

## exportUtils.ts

Export-related utility functions for the editor.

### Functions

#### `downloadFile(content: string, type: string, filename: string)`

Creates a blob and triggers a browser download.

**Parameters:**

- `content` - File content as string
- `type` - MIME type (e.g., 'text/html', 'text/markdown')
- `filename` - Name for the downloaded file

**Example:**

```typescript
downloadFile(markdown, "text/markdown", "paper.md");
```

#### `exportToPNG(elementId: string, backgroundColor: string)`

Exports a DOM element as a PNG image using html2canvas.

**Parameters:**

- `elementId` - DOM element ID to capture
- `backgroundColor` - Background color for the capture

**Example:**

```typescript
await exportToPNG("preview-card", "#ffffff");
```

#### `createHTMLExport(content: string, font: string): string`

Creates a standalone HTML file with embedded styles.

**Parameters:**

- `content` - HTML content (rendered markdown)
- `font` - Font family ('serif', 'sans', or 'mono')

**Returns:** Complete HTML document as string

**Example:**

```typescript
const html = createHTMLExport(renderedHtml, "serif");
downloadFile(html, "text/html", "paper.html");
```

#### `getThemeBackground(theme: string): string`

Returns the background color hex code for a given theme.

**Parameters:**

- `theme` - Theme name ('paper', 'dark', or 'terminal')

**Returns:** Hex color string

**Example:**

```typescript
const bg = getThemeBackground("dark"); // Returns '#18181b'
```
