<script lang="ts">
  import { browser } from "$app/environment";
  import MarkdownIt from "markdown-it";
  import hljs from "highlight.js";
  import markdownItHighlightJs from "markdown-it-highlightjs";
  import Footer from "$lib/components/Footer.svelte";
  import EditorHeader from "$lib/components/editor/EditorHeader.svelte";
  import EditorPanel from "$lib/components/editor/EditorPanel.svelte";
  import PreviewPanel from "$lib/components/editor/PreviewPanel.svelte";
  import PublishModal from "$lib/components/editor/PublishModal.svelte";
  import Alert from "$lib/components/editor/Alert.svelte";
  import ConfirmDialog from "$lib/components/editor/ConfirmDialog.svelte";
  import { getThemeById } from "$lib/config/themes";
  import { getGoogleFontsUrl } from "$lib/config/fonts";
  import {
    exportToPNG,
    createHTMLExport,
    downloadFile,
  } from "$lib/utils/exportUtils";

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  }).use(markdownItHighlightJs, { hljs });

  const DEFAULT_CONTENT = `# Hello

This will become paper.

## Features
- Write in **Markdown**
- See live preview
- Export as PNG, HTML, or MD

\`\`\`javascript
console.log("Beautiful code");
\`\`\`

> A simple quote to make things interesting.
`;

  const STORAGE_KEY = "paper-markdown-content";
  const STORAGE_THEME = "paper-theme";
  const STORAGE_FONT = "paper-font";
  const STORAGE_WATERMARK = "paper-watermark";

  let markdown = $state(DEFAULT_CONTENT);
  let previewTheme = $state("paper");
  let previewFont = $state("serif");
  let includeWatermark = $state(true);
  let isLoaded = $state(false);

  let showPublishModal = $state(false);
  let showAlert = $state(false);
  let alertMessage = $state("");
  let alertType = $state<"info" | "error" | "warning" | "success">("info");
  let showConfirmDialog = $state(false);
  let confirmAction: (() => void) | null = null;
  let textarea = $state<HTMLTextAreaElement>();

  let previewHtml = $derived(md.render(markdown));

  // Load from localStorage on mount
  $effect(() => {
    if (browser && !isLoaded) {
      const storedMarkdown = localStorage.getItem(STORAGE_KEY);
      const storedTheme = localStorage.getItem(STORAGE_THEME);
      const storedFont = localStorage.getItem(STORAGE_FONT);
      const storedWatermark = localStorage.getItem(STORAGE_WATERMARK);

      if (storedMarkdown !== null) markdown = storedMarkdown;
      if (storedTheme !== null) previewTheme = storedTheme;
      if (storedFont !== null) previewFont = storedFont;
      if (storedWatermark !== null)
        includeWatermark = storedWatermark === "true";

      isLoaded = true;
    }
  });

  // Save markdown to localStorage
  $effect(() => {
    if (browser && isLoaded) {
      localStorage.setItem(STORAGE_KEY, markdown);
    }
  });

  $effect(() => {
    if (browser && isLoaded) {
      localStorage.setItem(STORAGE_THEME, previewTheme);
    }
  });

  $effect(() => {
    if (browser && isLoaded) {
      localStorage.setItem(STORAGE_FONT, previewFont);
    }
  });

  $effect(() => {
    if (browser && isLoaded) {
      localStorage.setItem(STORAGE_WATERMARK, String(includeWatermark));
    }
  });

  function insertMarkdown(before: string, after = "") {
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = markdown.substring(start, end);
    const replacement = before + selected + after;

    markdown =
      markdown.substring(0, start) + replacement + markdown.substring(end);

    if (browser && textarea) {
      setTimeout(() => {
        textarea!.focus();
        textarea!.setSelectionRange(
          start + before.length,
          start + before.length + selected.length,
        );
      }, 0);
    }
  }

  function showAlertDialog(
    message: string,
    type: "info" | "error" | "warning" | "success" = "info",
  ) {
    alertMessage = message;
    alertType = type;
    showAlert = true;
  }

  function showConfirm(message: string, onConfirm: () => void) {
    confirmAction = onConfirm;
    showConfirmDialog = true;
  }

  function clearEditor() {
    showConfirm("Are you sure you want to clear all content?", () => {
      markdown = "";
      localStorage.setItem(STORAGE_KEY, "");
    });
  }

  async function handleExportPNG() {
    if (!browser) return;
    const theme = getThemeById(previewTheme);
    try {
      await exportToPNG("preview-card", theme?.backgroundColor || "#ffffff");
      showAlertDialog("Image exported successfully!", "success");
    } catch (err) {
      showAlertDialog(
        "Export failed: The content is too large. Try reducing the content or exporting to HTML instead.",
        "error",
      );
    }
  }

  function handleExportHTML() {
    const theme = getThemeById(previewTheme);
    if (!theme) return;
    const html = createHTMLExport(previewHtml, previewFont, theme);
    downloadFile(html, "text/html", "paper.html");
    showAlertDialog("HTML exported successfully!", "success");
  }

  function handleExportMarkdown() {
    downloadFile(markdown, "text/markdown", "paper.md");
    showAlertDialog("Markdown exported successfully!", "success");
  }
</script>

<svelte:head>
  <title>Editor — tsbin paper</title>
  {#if getGoogleFontsUrl()}
    <link rel="stylesheet" href={getGoogleFontsUrl()} />
  {/if}
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css"
  />
</svelte:head>

<div class="flex flex-col h-screen">
  <EditorHeader
    {previewFont}
    {previewTheme}
    {includeWatermark}
    onFontChange={(font) => {
      previewFont = font;
    }}
    onThemeChange={(theme) => {
      previewTheme = theme;
    }}
    onWatermarkToggle={(value) => {
      includeWatermark = value;
    }}
    onExportPNG={handleExportPNG}
    onExportHTML={handleExportHTML}
    onExportMarkdown={handleExportMarkdown}
    onPublish={() => (showPublishModal = true)}
  />

  <main class="flex-1 flex flex-col lg:flex-row overflow-hidden">
    <EditorPanel
      bind:markdown
      bind:textarea
      onInsert={insertMarkdown}
      onClear={clearEditor}
    />

    <PreviewPanel
      {previewHtml}
      {previewTheme}
      {previewFont}
      {includeWatermark}
    />
  </main>

  <PublishModal
    show={showPublishModal}
    onClose={() => (showPublishModal = false)}
  />

  <Alert
    bind:show={showAlert}
    message={alertMessage}
    type={alertType}
    onClose={() => {}}
  />

  <ConfirmDialog
    bind:show={showConfirmDialog}
    title="Confirm Action"
    message="Are you sure you want to clear all content?"
    confirmText="Clear"
    cancelText="Cancel"
    onConfirm={() => {
      if (confirmAction) {
        confirmAction();
        confirmAction = null;
      }
    }}
    onCancel={() => {
      confirmAction = null;
    }}
  />
</div>

<Footer />
