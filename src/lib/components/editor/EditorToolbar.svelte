<script lang="ts">
  import {
    Bold,
    Italic,
    Strikethrough,
    Heading1,
    Heading2,
    Heading3,
    Code,
    List,
    ListOrdered,
    Link,
    Image,
    Quote,
    Minus,
    Table,
    Trash2,
  } from "lucide-svelte";

  let {
    onInsert,
    onClear,
  }: {
    onInsert: (before: string, after?: string) => void;
    onClear: () => void;
  } = $props();

  const tools = [
    { icon: Bold, title: "Bold (Ctrl+B)", before: "**", after: "**" },
    { icon: Italic, title: "Italic (Ctrl+I)", before: "*", after: "*" },
    {
      icon: Strikethrough,
      title: "Strikethrough",
      before: "~~",
      after: "~~",
    },
    { icon: Heading1, title: "Heading 1", before: "# ", after: "" },
    { icon: Heading2, title: "Heading 2", before: "## ", after: "" },
    { icon: Heading3, title: "Heading 3", before: "### ", after: "" },
    { icon: Code, title: "Inline Code", before: "`", after: "`" },
    {
      icon: Code,
      title: "Code Block",
      before: "```\n",
      after: "\n```",
      separator: true,
    },
    { icon: List, title: "Bullet List", before: "- ", after: "" },
    { icon: ListOrdered, title: "Numbered List", before: "1. ", after: "" },
    {
      icon: Link,
      title: "Link",
      before: "[",
      after: "](url)",
      separator: true,
    },
    { icon: Image, title: "Image", before: "![alt](", after: ")" },
    { icon: Quote, title: "Quote", before: "> ", after: "" },
    { icon: Minus, title: "Horizontal Rule", before: "\n---\n", after: "" },
    {
      icon: Table,
      title: "Table",
      before: "\n| Column 1 | Column 2 |\n|----------|----------|\n| ",
      after: " | |\n",
    },
  ];
</script>

<div class="editor-toolbar">
  {#each tools as tool, i}
    {#if tool.separator && i > 0}
      <div class="toolbar-divider"></div>
    {/if}
    {@const Icon = tool.icon}
    <button
      onclick={() => onInsert(tool.before, tool.after)}
      class="toolbar-btn"
      title={tool.title}
    >
      <Icon size={16} />
    </button>
  {/each}
  <div style="flex: 1;"></div>
  <div class="toolbar-divider"></div>
  <button onclick={onClear} class="toolbar-btn" title="Clear All">
    <Trash2 size={16} />
  </button>
</div>
