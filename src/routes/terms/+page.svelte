<script>
  import Footer from "$lib/components/Footer.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
</script>

<svelte:head>
  <title>Terms — tsbin paper</title>
  <meta name="description" content="Terms of use for paper.tsbin.tech" />
</svelte:head>

<Navbar />
<div class="py-16 px-4">
  <div class="max-w-3xl mx-auto">
    <h1
      class="text-4xl md:text-5xl font-semibold mb-12 text-center text-text-primary"
    >
      Terms
    </h1>

    <div class="prose prose-lg max-w-none space-y-8">
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold mt-8 mb-4 text-text-primary">
          Usage
        </h2>
        <p class="leading-relaxed text-text-primary">
          tsbin paper is provided as-is, without warranty of any kind. You are
          solely responsible for the content you paste, edit, export, or publish
          through this service.
        </p>
        <p class="leading-relaxed text-text-primary">
          By using paper, you agree not to:
        </p>
        <ul class="list-disc list-inside space-y-2 ml-4 text-text-primary">
          <li>Upload illegal, harmful, or abusive content</li>
          <li>Violate any applicable laws or regulations</li>
          <li>Infringe on intellectual property rights of others</li>
          <li>Attempt to disrupt or compromise the service</li>
          <li>Use the service for spam or malicious purposes</li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold mt-8 mb-4 text-text-primary">
          Account & Data
        </h2>

        <h3 class="text-xl font-medium mt-6 mb-3 text-text-primary">
          What works without an account
        </h3>
        <p class="leading-relaxed text-text-primary">In guest mode, you can:</p>
        <ul class="list-disc list-inside space-y-2 ml-4 text-text-primary">
          <li>Paste Markdown</li>
          <li>See a live preview</li>
          <li>Export a PNG image</li>
        </ul>
        <p class="leading-relaxed text-text-primary">In guest mode:</p>
        <ul class="list-disc list-inside space-y-2 ml-4 text-text-primary">
          <li>Nothing is saved on our servers</li>
          <li>Markdown lives only in the browser</li>
          <li>We do not store, log, or inspect the content</li>
        </ul>

        <h3 class="text-xl font-medium mt-6 mb-3 text-text-primary">
          What requires an account
        </h3>
        <p class="leading-relaxed text-text-primary">
          An account is only required for:
        </p>
        <ul class="list-disc list-inside space-y-2 ml-4 text-text-primary">
          <li>Saving drafts</li>
          <li>Keeping a personal list of papers</li>
          <li>Publishing content to IPFS</li>
          <li>Re-opening and re-exporting past work</li>
        </ul>

        <h3 class="text-xl font-medium mt-6 mb-3 text-text-primary">
          What we store when you have an account
        </h3>
        <p class="leading-relaxed text-text-primary">We store only:</p>
        <ul class="list-disc list-inside space-y-2 ml-4 text-text-primary">
          <li>Your account ID</li>
          <li>Your email (for login)</li>
          <li>Your saved drafts (Markdown text)</li>
          <li>
            Metadata about published papers (title, theme, IPFS CID, timestamps)
          </li>
        </ul>
        <p class="leading-relaxed text-text-primary">We do not:</p>
        <ul class="list-disc list-inside space-y-2 ml-4 text-text-primary">
          <li>Scan your content</li>
          <li>Sell your data</li>
          <li>Share your drafts with anyone</li>
          <li>Track what you write</li>
        </ul>

        <h3 class="text-xl font-medium mt-6 mb-3 text-text-primary">
          Publishing to IPFS
        </h3>
        <p class="leading-relaxed text-text-primary">
          When you publish a paper, we send the rendered document to IPFS via
          Pinata.
        </p>
        <p class="leading-relaxed text-text-primary">
          IPFS is a public, decentralized network. Published content becomes
          public and immutable. We cannot delete or modify it after publishing.
        </p>
        <p class="leading-relaxed text-text-primary">
          Do not publish anything you do not want to be public.
        </p>

        <h3 class="text-xl font-medium mt-6 mb-3 text-text-primary">
          Analytics
        </h3>
        <p class="leading-relaxed text-text-primary">
          We use analytics only to:
        </p>
        <ul class="list-disc list-inside space-y-2 ml-4 text-text-primary">
          <li>Count page visits</li>
          <li>Monitor basic performance</li>
          <li>Keep the service healthy</li>
        </ul>
        <p class="leading-relaxed text-text-primary">We do not track:</p>
        <ul class="list-disc list-inside space-y-2 ml-4 text-text-primary">
          <li>What you type</li>
          <li>What you export</li>
          <li>What you publish</li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold mt-8 mb-4 text-text-primary">
          IPFS Publishing
        </h2>
        <p class="leading-relaxed text-text-primary">
          When you choose to publish content, it is uploaded to IPFS
          (InterPlanetary File System) via Pinata.
        </p>
        <p class="leading-relaxed text-text-primary">
          <strong>Important:</strong> IPFS is a public, decentralized network. Once
          you publish content to IPFS:
        </p>
        <ul class="list-disc list-inside space-y-2 ml-4 text-text-primary">
          <li>
            Your content becomes publicly accessible to anyone with the link
          </li>
          <li>Content is immutable and cannot be edited or deleted</li>
          <li>
            We do not control the IPFS network and cannot remove published
            content
          </li>
          <li>Content may be replicated across multiple nodes globally</li>
        </ul>
        <p class="leading-relaxed text-text-primary">
          <strong
            >Do not publish anything you do not want to be permanently public.</strong
          >
        </p>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold mt-8 mb-4 text-text-primary">
          Transparency & Open Source
        </h2>
        <p class="leading-relaxed text-text-primary">
          This project is fully open-source and available at{" "}
          <a
            href="https://github.com/PriyanshuPz/tsbin-paper"
            target="_blank"
            rel="noopener"
            class="text-accent underline hover:text-accent-hover transition-colors"
          >
            github.com/PriyanshuPz/tsbin-paper
          </a>.
        </p>
        <p class="leading-relaxed text-text-primary">
          You can inspect exactly how the service works, what data is collected,
          and how your content is handled.
        </p>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold mt-8 mb-4 text-text-primary">
          Service Availability
        </h2>
        <p class="leading-relaxed text-text-primary">
          tsbin paper is operated by an individual developer as a free service.
          We make no guarantees about:
        </p>
        <ul class="list-disc list-inside space-y-2 ml-4 text-text-primary">
          <li>Service uptime or availability</li>
          <li>Data retention or backup</li>
          <li>Feature stability or compatibility</li>
        </ul>
        <p class="leading-relaxed text-text-primary">
          We reserve the right to modify, suspend, or discontinue the service at
          any time without notice.
        </p>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold mt-8 mb-4 text-text-primary">
          Liability
        </h2>
        <p class="leading-relaxed text-text-primary">
          tsbin paper and its operator are not liable for:
        </p>
        <ul class="list-disc list-inside space-y-2 ml-4 text-text-primary">
          <li>Loss of data or content</li>
          <li>Unauthorized access to published content</li>
          <li>Issues arising from IPFS network behavior</li>
          <li>Any damages resulting from use of the service</li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold mt-8 mb-4 text-text-primary">
          Changes to Terms
        </h2>
        <p class="leading-relaxed text-text-primary">
          We may update these terms at any time. Continued use of the service
          constitutes acceptance of any changes.
        </p>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-semibold mt-8 mb-4 text-text-primary">
          Contact
        </h2>
        <p class="leading-relaxed text-text-primary">
          For questions or concerns, please open an issue on{" "}
          <a
            href="https://github.com/PriyanshuPz/tsbin-paper/issues"
            target="_blank"
            rel="noopener"
            class="text-accent underline hover:text-accent-hover transition-colors"
          >
            GitHub
          </a>.
        </p>
      </section>

      <p class="text-sm text-text-secondary mt-12 pt-8 border-t border-border">
        Last updated: January 29, 2026
      </p>
    </div>
  </div>
</div>

<Footer />
