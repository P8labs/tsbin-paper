<script lang="ts">
  interface Props {
    show: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
  }

  let {
    show = $bindable(false),
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
  }: Props = $props();

  function handleConfirm() {
    show = false;
    onConfirm();
  }

  function handleCancel() {
    show = false;
    onCancel();
  }

  function handleDialogKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      handleCancel();
    }
  }
</script>

{#if show}
  <div
    role="button"
    tabindex="0"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    onkeydown={handleDialogKeydown}
    onclick={handleCancel}
  >
    <div
      class="bg-bg border border-border rounded-lg shadow-2xl max-w-md w-full p-6 animate-in"
      role="alertdialog"
      aria-modal="true"
    >
      <!-- onclick={(e) => e.stopPropagation()} -->
      <h3 class="text-lg font-semibold text-text-primary mb-3">
        {title}
      </h3>

      <p class="text-sm text-text-secondary leading-relaxed mb-6">
        {message}
      </p>

      <div class="flex justify-end gap-3">
        <button
          onclick={handleCancel}
          class="px-4 py-2 text-sm border border-border rounded hover:bg-surface transition-colors text-text-primary"
        >
          {cancelText}
        </button>
        <button
          onclick={handleConfirm}
          class="px-4 py-2 text-sm bg-text-primary text-bg rounded hover:opacity-80 transition-opacity"
        >
          {confirmText}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .animate-in {
    animation: scale-in 0.15s ease-out;
  }

  @keyframes scale-in {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>
