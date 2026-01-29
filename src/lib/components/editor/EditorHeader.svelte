<script lang="ts">
  import { themes } from "$lib/config/themes";
  import { fonts } from "$lib/config/fonts";
  import ExportDropdown from "./ExportDropdown.svelte";
  import { ChevronDown } from "lucide-svelte";

  interface Props {
    previewFont: string;
    previewTheme: string;
    includeWatermark: boolean;
    onFontChange: (font: string) => void;
    onThemeChange: (theme: string) => void;
    onWatermarkToggle: (value: boolean) => void;
    onExportPNG: () => void;
    onExportHTML: () => void;
    onExportMarkdown: () => void;
    onPublish: () => void;
  }

  let {
    previewFont,
    previewTheme,
    includeWatermark,
    onFontChange,
    onThemeChange,
    onWatermarkToggle,
    onExportPNG,
    onExportHTML,
    onExportMarkdown,
    onPublish,
  }: Props = $props();

  let showThemeDropdown = $state(false);
  let showFontDropdown = $state(false);
</script>

<header
  class="border-b border-border bg-bg flex items-center justify-between px-4 py-2"
>
  <a
    href="/"
    class="text-lg font-semibold no-underline text-text-primary hover:opacity-70 transition-opacity"
  >
    paper
  </a>

  <div class="flex items-center gap-2">
    <!-- Watermark Toggle -->
    <label
      class="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-border rounded bg-bg cursor-pointer hover:bg-surface transition-colors"
    >
      <input
        type="checkbox"
        checked={includeWatermark}
        onchange={(e) =>
          onWatermarkToggle((e.target as HTMLInputElement).checked)}
        class="w-3.5 h-3.5 rounded border-border cursor-pointer accent-text-primary"
      />
      <span class="text-text-primary">Watermark</span>
    </label>

    <!-- Theme Dropdown -->
    <div class="relative">
      <button
        onclick={() => (showThemeDropdown = !showThemeDropdown)}
        class="px-3 py-1.5 text-xs border border-border rounded bg-bg text-text-primary hover:bg-surface flex items-center gap-1"
      >
        Theme: <span class="font-medium"
          >{themes.find((t) => t.id === previewTheme)?.label || "Paper"}</span
        >
        <ChevronDown size={14} />
      </button>
      {#if showThemeDropdown}
        <div
          class="absolute right-0 mt-1 bg-bg border border-border rounded shadow-lg z-10 min-w-32"
        >
          {#each themes as theme}
            <button
              onclick={() => {
                onThemeChange(theme.id);
                showThemeDropdown = false;
              }}
              class="block w-full text-left px-4 py-2 text-xs hover:bg-surface transition-colors text-text-primary relative"
              class:bg-surface={previewTheme === theme.id}
              class:font-semibold={previewTheme === theme.id}
            >
              {theme.label}
              {#if previewTheme === theme.id}
                <span class="absolute right-2 top-1/2 -translate-y-1/2">✓</span>
              {/if}
            </button>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Font Dropdown -->
    <div class="relative">
      <button
        onclick={() => (showFontDropdown = !showFontDropdown)}
        class="px-3 py-1.5 text-xs border border-border rounded bg-bg text-text-primary hover:bg-surface flex items-center gap-1"
      >
        Font: <span class="font-medium"
          >{fonts.find((f) => f.id === previewFont)?.label || "Serif"}</span
        >
        <ChevronDown size={14} />
      </button>
      {#if showFontDropdown}
        <div
          class="absolute right-0 mt-1 bg-bg border border-border rounded shadow-lg z-10 min-w-32"
        >
          {#each fonts as font}
            <button
              onclick={() => {
                onFontChange(font.id);
                showFontDropdown = false;
              }}
              class="block w-full text-left px-4 py-2 text-xs hover:bg-surface transition-colors text-text-primary relative"
              class:bg-surface={previewFont === font.id}
              class:font-semibold={previewFont === font.id}
            >
              {font.label}
              {#if previewFont === font.id}
                <span class="absolute right-2 top-1/2 -translate-y-1/2">✓</span>
              {/if}
            </button>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Export Dropdown -->
    <ExportDropdown {onExportPNG} {onExportHTML} {onExportMarkdown} />

    <!-- Publish Button -->
    <button
      onclick={onPublish}
      class="px-4 py-1.5 text-xs bg-text-primary text-bg rounded hover:opacity-80 transition-opacity"
    >
      Publish
    </button>
  </div>
</header>

<svelte:window
  onclick={(e) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".relative")) {
      showThemeDropdown = false;
      showFontDropdown = false;
    }
  }}
/>
