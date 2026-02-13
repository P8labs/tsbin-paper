<script lang="ts">
  import { dev } from "$app/environment";
  import { page } from "$app/state";
  import moment from "moment";
  import "./layout.css";

  let { children } = $props();

  const isEditorPages = $derived(
    ["/editor", "/profile"].includes(page.route.id!),
  );

  const buildTime =
    import.meta.env.PUBLIC_BUILD_TIME || new Date().toISOString();
  const gitHash = import.meta.env.PUBLIC_COMMIT_HASH || "prod";
  const buildTimeAgo = moment(buildTime).fromNow();
</script>

<svelte:head>
  <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
  <title>tsbin paper - Markdown in. Paper out.</title>
  <meta
    name="description"
    content="A tiny tool that turns Markdown into something you can share. You paste. We render. You export."
  />
  <meta
    name="keywords"
    content="markdown, paper, export, IPFS, publish, privacy, tsbin"
  />
  <meta name="author" content="P8labs" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://paper.tsbin.tech" />

  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://paper.tsbin.tech/" />
  <meta property="og:title" content="tsbin paper - Markdown in. Paper out." />
  <meta
    property="og:description"
    content="A tiny tool that turns Markdown into something you can share. You paste. We render. You export."
  />
  <meta property="og:image" content="/og.png" />
  <meta property="og:site_name" content="tsbin paper" />
  <meta property="og:locale" content="en_US" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="https://paper.tsbin.tech/" />
  <meta name="twitter:title" content="tsbin paper - Markdown in. Paper out." />
  <meta
    name="twitter:description"
    content="A tiny tool that turns Markdown into something you can share. You paste. We render. You export."
  />

  <meta name="theme-color" content="#fafafa" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="default" />
</svelte:head>

{#if !isEditorPages}
  <div class="bg-effect"></div>
{/if}

{#if !isEditorPages}
  <header>
    <div class="container">
      <a href="/" class="logo">PAPER</a>
      <nav>
        <a href="/editor">editor</a>
        <a href="/about">about</a>
        <a href="/terms">terms</a>
        <a
          href="https://github.com/P8labs/tsbin-paper"
          target="_blank"
          rel="noopener">github</a
        >
      </nav>
    </div>
  </header>
{/if}

{@render children()}

<footer>
  <div class={isEditorPages ? "editor-footer-container" : "container"}>
    <div class="footer-copyright">
      © 2026 tsbin paper, Built at <a
        href="https://github.com/P8labs"
        target="_blank"
        rel="noopener">P8labs</a
      ><br />
      {buildTimeAgo} • {gitHash}
    </div>
    <div class="footer-links">
      <a
        href="https://github.com/P8labs/tsbin-paper"
        target="_blank"
        rel="noopener">GitHub</a
      >
      <a href="/about">About</a>
      <a href="/terms">Terms</a>
    </div>
  </div>
</footer>

<style>
  .editor-footer-container {
    margin: 0 auto;
    padding: 0 2rem;
  }
</style>
