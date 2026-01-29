<script>
  import Footer from "$lib/components/Footer.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
</script>

<svelte:head>
  <title>About - tsbin paper</title>
  <meta
    name="description"
    content="About tsbin paper: a tiny tool that turns Markdown into something you can share."
  />
</svelte:head>

<Navbar />
<div class="py-16 px-4">
  <div class="max-w-3xl mx-auto">
    <h1
      class="text-4xl md:text-5xl font-semibold mb-12 text-center text-text-primary"
    >
      About tsbin paper
    </h1>

    <div class="prose prose-lg max-w-none space-y-6">
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold mt-8 mb-4 text-text-primary">
          What is tsbin paper?
        </h2>
        <p class="leading-relaxed text-text-primary">
          tsbin paper is a tiny tool that turns Markdown into something you can
          share. You paste. We render. You export.
        </p>
        <p class="leading-relaxed text-text-primary">
          This project is part of the tsbin.tech tool collection, a set of
          small, sharp utilities built under P8labs.
        </p>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold mt-8 mb-4 text-text-primary">
          How it works
        </h2>
        <p class="leading-relaxed text-text-primary">
          paper takes your Markdown text and transforms it into a beautifully
          formatted document. You can then:
        </p>
        <ul class="list-disc list-inside space-y-2 ml-4 text-text-primary">
          <li>Export it as a high-quality image (PNG, SVG)</li>
          <li>
            Publish it permanently to IPFS for immutable, decentralized storage
          </li>
          <li>Share it with a simple link</li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold mt-8 mb-4 text-text-primary">
          Privacy & Transparency
        </h2>
        <p class="leading-relaxed text-text-primary">
          tsbin paper is open-source and completely transparent. We do not store
          your files on our backend in guest mode. Everything you write stays in
          your browser until you explicitly choose to publish.
        </p>
        <p class="leading-relaxed text-text-primary">
          When you choose to publish content, it is uploaded to IPFS. IPFS is a
          public, decentralized network. Once published, your content becomes
          public and immutable. We do not control that network.
        </p>
        <p class="leading-relaxed text-text-primary">
          We collect minimal analytics data to understand basic traffic patterns
          and keep the service healthy. We do not track what you write, paste,
          or export.
        </p>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold mt-8 mb-4 text-text-primary">
          Open Source
        </h2>
        <p class="leading-relaxed text-text-primary">
          tsbin paper is fully open-source and available on GitHub. You can
          inspect the code, contribute improvements, or deploy your own
          instance.
        </p>
        <p class="leading-relaxed">
          <a
            href="https://github.com/PriyanshuPz/tsbin-paper"
            target="_blank"
            rel="noopener"
            class="text-accent underline hover:text-accent-hover transition-colors"
          >
            View source code on GitHub →
          </a>
        </p>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold mt-8 mb-4 text-text-primary">
          Support the Project
        </h2>
        <p class="leading-relaxed text-text-primary">
          tsbin paper is operated by an individual developer and maintained as a
          passion project. If you find it useful and want to support its
          development, you can sponsor on GitHub.
        </p>
        <p class="leading-relaxed">
          <a
            href="https://github.com/sponsors/PriyanshuPz"
            target="_blank"
            rel="noopener"
            class="text-accent underline hover:text-accent-hover transition-colors"
          >
            Sponsor on GitHub →
          </a>
        </p>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold mt-8 mb-4 text-text-primary">
          Philosophy
        </h2>
        <p class="leading-relaxed text-text-primary">
          tsbin paper exists to be small, honest, and useful. No bloat. No
          tracking. No lock-in. Just a simple tool that does one thing well.
        </p>
      </section>
    </div>
  </div>
</div>

<Footer />
