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
    class="modal-overlay"
    onkeydown={handleDialogKeydown}
    onclick={handleCancel}
  >
    <div class="modal-content" role="alertdialog" aria-modal="true">
      <h3 class="modal-header">
        {title}
      </h3>

      <div class="modal-body">
        <p style="margin: 0;">{message}</p>
      </div>

      <div class="modal-footer">
        <button onclick={handleCancel} class="editor-btn">
          {cancelText}
        </button>
        <button onclick={handleConfirm} class="editor-btn editor-btn-primary">
          {confirmText}
        </button>
      </div>
    </div>
  </div>
{/if}
