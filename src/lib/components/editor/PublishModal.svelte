<script lang="ts">
  import { Loader } from "lucide-svelte";
  import type { User } from "$lib/stores/auth";

  let {
    show,
    user,
    currentTitle = "",
    onClose,
    onSaveDraft,
    onPublish,
  }: {
    show: boolean;
    user: User | null;
    currentTitle?: string;
    onClose: () => void;
    onSaveDraft: (title: string) => Promise<void>;
    onPublish: (title: string) => Promise<void>;
  } = $props();

  let title = $state("");
  let saving = $state(false);
  let publishing = $state(false);
  let error = $state("");

  $effect(() => {
    if (show && currentTitle && !title) {
      title = currentTitle;
    }
  });

  function handleBackdropClick() {
    if (!saving && !publishing) {
      onClose();
    }
  }

  function handleBackdropKeydown(e: KeyboardEvent) {
    if (e.key === "Escape" && !saving && !publishing) {
      e.preventDefault();
      onClose();
    }
  }

  async function handleSaveDraft() {
    if (!title.trim()) {
      error = "Please enter a title";
      return;
    }
    error = "";
    saving = true;
    try {
      await onSaveDraft(title.trim());
      title = "";
      onClose();
    } catch (err: any) {
      error = err.message || "Failed to save draft";
    } finally {
      saving = false;
    }
  }

  async function handlePublish() {
    if (!title.trim()) {
      error = "Please enter a title";
      return;
    }
    error = "";
    publishing = true;
    try {
      await onPublish(title.trim());
      title = "";
      onClose();
    } catch (err: any) {
      error = err.message || "Failed to publish";
    } finally {
      publishing = false;
    }
  }

  function resetOnClose() {
    if (!saving && !publishing) {
      title = "";
      error = "";
      onClose();
    }
  }
</script>

{#if show}
  <div
    class="modal-overlay"
    onclick={handleBackdropClick}
    onkeydown={handleBackdropKeydown}
    role="button"
    tabindex="0"
    aria-label="Close modal"
  >
    <div
      class="modal-content"
      onclick={(e) => e.stopPropagation()}
      onkeydown={(e) => e.key === "Escape" && resetOnClose()}
      role="dialog"
      aria-modal="true"
      tabindex="0"
      aria-labelledby="modal-title"
    >
      <h2 id="modal-title" class="modal-header">
        {#if user}
          {currentTitle ? currentTitle : "Save or Publish Paper"}
        {:else}
          Login Required
        {/if}
      </h2>

      {#if !user}
        <p class="modal-body">
          Please login with Google to save and publish your papers.
        </p>
        <button
          onclick={resetOnClose}
          class="editor-btn editor-btn-primary"
          style="width: 100%; justify-content: center;"
        >
          Close
        </button>
      {:else}
        <p class="modal-body">Save as draft or publish to IPFS permanently</p>

        <div class="form-group">
          <label for="paper-title" class="form-label"> Paper Title </label>
          <input
            id="paper-title"
            type="text"
            bind:value={title}
            placeholder="Enter a title for your paper"
            class="form-input"
            disabled={saving || publishing}
          />
          {#if error}
            <p class="form-error">{error}</p>
          {/if}
        </div>

        <div style="display: flex; gap: 0.75rem;">
          <button
            onclick={handleSaveDraft}
            disabled={saving || publishing}
            class="editor-btn"
            style="flex: 1; justify-content: center;"
          >
            {#if saving}
              <Loader size={16} class="animate-spin" />
              Saving...
            {:else}
              Save Draft
            {/if}
          </button>
          <button
            onclick={handlePublish}
            disabled={saving || publishing}
            class="editor-btn editor-btn-primary"
            style="flex: 1; justify-content: center;"
          >
            {#if publishing}
              <Loader size={16} class="animate-spin" />
              Publishing...
            {:else}
              Publish to IPFS
            {/if}
          </button>
        </div>

        <button
          onclick={resetOnClose}
          disabled={saving || publishing}
          class="editor-btn"
          style="width: 100%; margin-top: 0.75rem; color: var(--text-secondary); justify-content: center;"
        >
          Cancel
        </button>
      {/if}
    </div>
  </div>
{/if}
