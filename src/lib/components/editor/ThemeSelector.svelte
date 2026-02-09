<script lang="ts">
  import { themes } from "$lib/config/themes";

  let {
    theme,
    onThemeChange,
  }: {
    theme: string;
    onThemeChange: (theme: string) => void;
  } = $props();
</script>

<div class="theme-selector">
  <span class="theme-label">Theme:</span>
  {#each themes as t}
    <button
      onclick={() => onThemeChange(t.id)}
      class="theme-btn"
      class:active={theme === t.id}
    >
      {t.label}
    </button>
  {/each}
</div>

<style>
  .theme-selector {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem;
    border-bottom: 1px solid var(--divider);
    flex-wrap: wrap;
  }

  .theme-label {
    font-size: 0.75rem;
    color: var(--text-secondary, #666);
  }

  .theme-btn {
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
    border-radius: 4px;
    transition: all 0.2s;
    background: transparent;
    border: 1px solid transparent;
    color: var(--text-secondary, #666);
    cursor: pointer;
  }

  .theme-btn:hover {
    background: var(--hover);
  }

  .theme-btn.active {
    background: var(--text);
    color: var(--bg);
    border-color: var(--text);
  }
</style>
