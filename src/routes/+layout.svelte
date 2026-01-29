<script lang="ts">
  import { dev } from "$app/environment";
  import { injectAnalytics } from "@vercel/analytics/sveltekit";
  import "./layout.css";
  let { children } = $props();

  injectAnalytics({ mode: dev ? "development" : "production" });
</script>

<svelte:head>
  <link rel="icon" href="/favicon.ico" />
  <meta property="og:image" content="/og.png" />
</svelte:head>

<div class="flex flex-col min-h-screen">
  <main class="flex-1">
    {@render children()}
  </main>
</div>
