<script lang="ts">
  import { ChevronDown } from "lucide-svelte";

  let {
    onExportPNG,
    onExportHTML,
    onExportMarkdown,
    onExportPDF,
  }: {
    onExportPNG: () => void;
    onExportHTML: () => void;
    onExportMarkdown: () => void;
    onExportPDF: () => void;
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

<div class="dropdown">
  <button onclick={toggleDropdown} class="editor-btn">
    Export
    <ChevronDown size={14} />
  </button>
  {#if isOpen}
    <div class="dropdown-menu" style="min-width: 8rem;">
      <div class="dropdown-section">
        <button onclick={() => handleExport(onExportPNG)} class="dropdown-item">
          PNG
        </button>
        <button onclick={() => handleExport(onExportPDF)} class="dropdown-item">
          PDF
        </button>
        <button
          onclick={() => handleExport(onExportHTML)}
          class="dropdown-item"
        >
          HTML
        </button>
        <button
          onclick={() => handleExport(onExportMarkdown)}
          class="dropdown-item"
        >
          Markdown
        </button>
      </div>
    </div>
  {/if}
</div>

<svelte:window
  onclick={(e) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".dropdown")) {
      isOpen = false;
    }
  }}
/>
