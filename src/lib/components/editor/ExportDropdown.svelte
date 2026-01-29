<script lang="ts">
  import { ChevronDown } from "lucide-svelte";

  let {
    onExportPNG,
    onExportHTML,
    onExportMarkdown,
  }: {
    onExportPNG: () => void;
    onExportHTML: () => void;
    onExportMarkdown: () => void;
  } = $props();

  let isOpen = $state(false);

  function toggleDropdown() {
    isOpen = !isOpen;
  }

  function handleExport(exportFn: () => void) {
    exportFn();
    isOpen = false;
  }
</script>

<div class="relative">
  <button
    onclick={toggleDropdown}
    class="px-3 py-1.5 text-xs border border-border rounded bg-bg text-text-primary hover:bg-surface flex items-center gap-1"
  >
    Export
    <ChevronDown size={14} />
  </button>
  {#if isOpen}
    <div
      class="absolute right-0 mt-1 bg-bg border border-border rounded shadow-lg z-10 min-w-30"
    >
      <button
        onclick={() => handleExport(onExportPNG)}
        class="block w-full text-left px-4 py-2 text-xs hover:bg-surface text-text-primary"
      >
        PNG
      </button>
      <button
        onclick={() => handleExport(onExportHTML)}
        class="block w-full text-left px-4 py-2 text-xs hover:bg-surface text-text-primary"
      >
        HTML
      </button>
      <button
        onclick={() => handleExport(onExportMarkdown)}
        class="block w-full text-left px-4 py-2 text-xs hover:bg-surface text-text-primary"
      >
        Markdown
      </button>
    </div>
  {/if}
</div>

<svelte:window
  onclick={(e) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".relative")) {
      isOpen = false;
    }
  }}
/>
