<script>
  import Footer from "$lib/components/Footer.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
</script>

<svelte:head>
  <title>tsbin paper - Markdown in. Paper out.</title>
  <meta
    name="description"
    content="tsbin paper is a tiny tool to turn Markdown into beautiful images or publish it permanently on IPFS. Part of the tsbin.tech tool collection by P8labs."
  />
  <meta property="og:title" content="tsbin paper - Markdown in. Paper out." />
  <meta
    property="og:description"
    content="tsbin paper is a tiny tool to turn Markdown into beautiful images or publish it permanently on IPFS. Part of the tsbin.tech tool collection by P8labs."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://paper.tsbin.tech" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="tsbin paper - Markdown in. Paper out." />
  <meta
    name="twitter:description"
    content="tsbin paper is a tiny tool to turn Markdown into beautiful images or publish it permanently on IPFS. Part of the tsbin.tech tool collection by P8labs."
  />
</svelte:head>

<Navbar />

<div
  class="flex items-center justify-center min-h-[calc(100vh-8rem)] py-12 px-4"
>
  <div class="max-w-3xl w-full">
    <div class="text-center mb-16">
      <h1
        class="text-6xl md:text-8xl font-semibold mb-6 tracking-tight text-text-primary leading-none"
      >
        tsbin paper
      </h1>
      <p class="text-xl md:text-2xl text-text-secondary font-light mb-8">
        Markdown in. Paper out.
      </p>
      <p
        class="text-base md:text-lg leading-relaxed text-text-secondary max-w-xl mx-auto"
      >
        Paste Markdown. Get a beautiful paper.<br />
        Export as an image or publish it forever.
      </p>
    </div>

    <div
      class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
    >
      <a
        href="/editor"
        class="inline-block px-12 py-4 bg-text-primary text-bg hover:opacity-80 transition-opacity no-underline font-medium rounded-lg text-base"
      >
        Open Editor
      </a>
      <a
        href="/about"
        class="inline-block px-8 py-4 text-text-secondary hover:text-text-primary no-underline transition-colors text-base"
      >
        Learn more
      </a>
    </div>

    <div class="pt-12 mt-8">
      <div class="flex items-center justify-center mb-12">
        <div
          class="h-px w-16 bg-linear-to-r from-transparent via-border to-transparent"
        ></div>
        <div class="mx-4 flex gap-1.5">
          <div class="w-1 h-1 rounded-full bg-border"></div>
          <div class="w-1 h-1 rounded-full bg-border"></div>
          <div class="w-1 h-1 rounded-full bg-border"></div>
        </div>
        <div
          class="h-px w-16 bg-linear-to-r from-transparent via-border to-transparent"
        ></div>
      </div>

      <div class="max-w-2xl mx-auto space-y-6">
        <div class="grid sm:grid-cols-2 gap-6 text-sm">
          <div class="space-y-2">
            <h3 class="font-medium text-text-primary">Guest Mode</h3>
            <p class="text-text-secondary leading-relaxed">
              Nothing is stored. Your work stays in your browser until you
              choose to export or publish.
            </p>
          </div>
          <div class="space-y-2">
            <h3 class="font-medium text-text-primary">Accounts</h3>
            <p class="text-text-secondary leading-relaxed">
              Optional. Only needed if you want to save drafts or publish to
              IPFS.
            </p>
          </div>
          <div class="space-y-2">
            <h3 class="font-medium text-text-primary">IPFS Publishing</h3>
            <p class="text-text-secondary leading-relaxed">
              Published content is public and immutable. Cannot be deleted.
            </p>
          </div>
          <div class="space-y-2">
            <h3 class="font-medium text-text-primary">Open Source</h3>
            <p class="text-text-secondary leading-relaxed">
              Fully transparent. <a
                href="https://github.com/PriyanshuPz/tsbin-paper"
                target="_blank"
                rel="noopener"
                class="underline hover:text-text-primary transition-colors"
                >View on GitHub</a
              >
            </p>
          </div>
        </div>

        <div class="text-center pt-4">
          <a
            href="/terms"
            class="text-sm text-text-secondary hover:text-text-primary underline transition-colors"
          >
            Read full terms & privacy policy
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

<Footer />
