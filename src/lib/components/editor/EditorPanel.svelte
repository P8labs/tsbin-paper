<script lang="ts">
  import EditorToolbar from "./EditorToolbar.svelte";

  interface Props {
    markdown: string;
    textarea: HTMLTextAreaElement | undefined;
    onInsert: (before: string, after?: string) => void;
    onClear: () => void;
  }

  let {
    markdown = $bindable(),
    textarea = $bindable(),
    onInsert,
    onClear,
  }: Props = $props();
</script>

<div
  class="flex-1 flex flex-col border-b lg:border-b-0 lg:border-r border-border bg-bg"
>
  <EditorToolbar {onInsert} {onClear} />

  <textarea
    bind:this={textarea}
    bind:value={markdown}
    placeholder="Write in Markdown"
    class="flex-1 p-6 resize-none bg-transparent text-text-primary placeholder:text-text-tertiary font-mono text-sm leading-relaxed focus:outline-none overflow-auto"
  ></textarea>
</div>

<style>
  textarea {
    font-family: var(--font-family-mono);
  }
</style>
