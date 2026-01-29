<script lang="ts">
  import "./layout.css";
  let { children } = $props();
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
