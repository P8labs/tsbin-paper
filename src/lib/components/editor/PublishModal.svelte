<script lang="ts">
  let {
    show,
    onClose,
  }: {
    show: boolean;
    onClose: () => void;
  } = $props();

  function handleBackdropClick() {
    onClose();
  }

  function handleBackdropKeydown(e: KeyboardEvent) {
    if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClose();
    }
  }

  function handleDialogKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      onClose();
    }
  }
</script>

{#if show}
  <div
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    onclick={handleBackdropClick}
    onkeydown={handleBackdropKeydown}
    role="button"
    tabindex="0"
    aria-label="Close modal"
  >
    <div
      class="bg-bg border border-border rounded-lg p-8 max-w-md mx-4"
      onclick={(e) => e.stopPropagation()}
      onkeydown={handleDialogKeydown}
      role="dialog"
      aria-modal="true"
      tabindex="0"
      aria-labelledby="modal-title"
    >
      <h2
        id="modal-title"
        class="text-2xl font-semibold mb-4 text-text-primary"
      >
        Coming Soon
      </h2>
      <p class="text-text-secondary mb-6">
        IPFS publishing will be available soon. For now, you can export your
        paper as PNG, HTML, or Markdown.
      </p>
      <button
        onclick={onClose}
        class="px-4 py-2 bg-text-primary text-bg rounded hover:opacity-80"
      >
        Close
      </button>
    </div>
  </div>
{/if}
