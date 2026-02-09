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

<div class="editor-panel">
  <EditorToolbar {onInsert} {onClear} />

  <textarea
    bind:this={textarea}
    bind:value={markdown}
    placeholder="Write in Markdown"
    class="editor-textarea"
  ></textarea>
</div>
