<script lang="ts">
  interface Props {
    show: boolean;
    message: string;
    type?: "info" | "error" | "warning" | "success";
    actionText?: string;
    actionUrl?: string;
    onClose: () => void;
  }

  let {
    show = $bindable(false),
    message,
    type = "info",
    actionText,
    actionUrl,
    onClose,
  }: Props = $props();

  function close() {
    show = false;
    onClose();
  }

  function handleDialogKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      onClose();
    }
  }
</script>

{#if show}
  <div
    role="button"
    tabindex="0"
    class="modal-overlay"
    onclick={close}
    onkeydown={handleDialogKeydown}
  >
    <div
      tabindex="0"
      class="modal-content alert"
      role="alertdialog"
      aria-modal="true"
    >
      <div class="modal-body">
        <div class="alert-content">
          <div class="alert-icon">
            {#if type === "error"}
              <svg
                class="icon-error"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            {:else if type === "warning"}
              <svg
                class="icon-warning"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            {:else if type === "success"}
              <svg
                class="icon-success"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            {:else}
              <svg
                class="icon-info"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            {/if}
          </div>

          <div class="alert-message">
            <p>{message}</p>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        {#if actionText && actionUrl}
          <a
            href={actionUrl}
            target="_blank"
            rel="noopener noreferrer"
            onclick={close}
            class="editor-btn editor-btn-primary"
          >
            {actionText}
            <svg
              style="width: 1rem; height: 1rem;"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        {/if}
        <button onclick={close} class="editor-btn editor-btn-primary">
          OK
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .alert-content {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }

  .alert-icon {
    flex-shrink: 0;
    margin-top: 0.125rem;
  }

  .alert-icon svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  .icon-error {
    color: #ef4444;
  }

  .icon-warning {
    color: #eab308;
  }

  .icon-success {
    color: #22c55e;
  }

  .icon-info {
    color: #3b82f6;
  }

  .alert-message {
    flex: 1;
  }

  .alert-message p {
    font-size: 0.9375rem;
    line-height: 1.6;
    color: var(--text);
    margin: 0;
    white-space: pre-line;
  }
</style>
