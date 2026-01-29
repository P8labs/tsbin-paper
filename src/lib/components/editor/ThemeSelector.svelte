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

<div
  class="flex items-center gap-2 p-3 border-b border-border-subtle flex-wrap"
>
  <span class="text-xs text-text-secondary">Theme:</span>
  {#each themes as t}
    <button
      onclick={() => onThemeChange(t.id)}
      class="px-3 py-1 text-xs rounded transition-colors"
      class:bg-text-primary={theme === t.id}
      class:text-bg={theme === t.id}
      class:text-text-secondary={theme !== t.id}
    >
      {t.label}
    </button>
  {/each}
</div>
