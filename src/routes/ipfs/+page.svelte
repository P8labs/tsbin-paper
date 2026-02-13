<script lang="ts">
  import { page } from "$app/state";
  import {
    Loader,
    CheckCircle,
    XCircle,
    ExternalLink,
    Copy,
    Check,
    AlertCircle,
  } from "lucide-svelte";
  import { onMount } from "svelte";

  let cid = $state<string | null>(null);
  let loading = $state(false);
  let copiedUrl = $state<string | null>(null);

  let error = $derived.by(() => {
    if (!cid) {
      return "No CID provided. Please provide a valid IPFS CID in the URL query parameter (?cid=your-cid-here).";
    }
    if (cid.length < 46 || !/^[a-zA-Z0-9]+$/.test(cid)) {
      return `Invalid CID format: "${cid}". IPFS CIDs must be at least 46 characters long and contain only alphanumeric characters.`;
    }
    return null;
  });

  interface GatewayInfo {
    name: string;
    domain: string;
    pathUrl: string;
    subdomainUrl: string;
    status: "checking" | "online" | "offline";
  }

  const gatewayConfigs = [
    { name: "IPFS.io", domain: "ipfs.io" },
    { name: "Dweb.link", domain: "dweb.link" },
    { name: "orbitor.dev", domain: "eu.orbitor.dev" },
    { name: "4everland.io", domain: "4everland.io" },
  ];

  let gateways = $state<GatewayInfo[]>([]);

  async function checkGateway(gateway: GatewayInfo) {
    if (!cid) return;
    const pathUrl = `https://${gateway.domain}/ipfs/${cid}`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(pathUrl, {
        method: "HEAD",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      gateway.status = response.ok ? "online" : "offline";
    } catch (err) {
      gateway.status = "offline";
    }
  }

  async function checkAllGateways() {
    if (!cid || cid.length < 46 || !/^[a-zA-Z0-9]+$/.test(cid)) {
      loading = false;
      return;
    }

    loading = true;

    gateways = gatewayConfigs.map((config) => ({
      name: config.name,
      domain: config.domain,
      pathUrl: `https://${config.domain}/ipfs/${cid}`,
      subdomainUrl: `https://${cid}.ipfs.${config.domain}`,
      status: "checking" as const,
    }));

    try {
      await Promise.all(gateways.map((gateway) => checkGateway(gateway)));
    } finally {
      loading = false;
    }
  }

  function copyToClipboard(url: string) {
    navigator.clipboard.writeText(url).then(() => {
      copiedUrl = url;
      setTimeout(() => (copiedUrl = null), 2000);
    });
  }

  onMount(() => {
    cid = page.url.searchParams.get("cid");
    checkAllGateways();
  });
</script>

<svelte:head>
  <title>IPFS Gateway Status{cid ? ` - ${cid}` : ""}</title>
</svelte:head>

<main>
  <div class="container gateway-status-page">
    {#if error}
      <div class="empty-state">
        <h2>Add a CID to get started</h2>
        <p>Provide an IPFS CID in the URL to check gateway availability.</p>
        <div class="url-example">
          <p class="example-label">Example:</p>
          <code class="example-code">/ipfs?cid=QmYourCIDHere...</code>
        </div>
        <a href="/editor" class="button-secondary">Go to Editor</a>
      </div>
    {:else}
      <div class="p-page-header">
        <h1>IPFS Gateway Status</h1>
        <p class="info-text">
          Check the availability of any IPFS content across multiple gateways.
          Works with any CID, regardless of where it was published. Checking
          multiple gateways helps propagate your content across the IPFS
          network, making it more accessible and resilient.
        </p>
        <p class="cid-display">
          <span class="cid-label">CID:</span>
          <code class="cid-code">{cid || "N/A"}</code>
          <button
            class="copy-btn-small"
            onclick={() => cid && copyToClipboard(cid)}
            title="Copy CID"
            disabled={!cid}
          >
            {#if copiedUrl === cid}
              <Check size={14} />
            {:else}
              <Copy size={14} />
            {/if}
          </button>
        </p>
        {#if loading}
          <p class="status-message">
            <Loader size={16} style="animation: spin 1s linear infinite;" />
            Checking gateway availability...
          </p>
        {:else}
          <button onclick={checkAllGateways} class="button">
            Refresh Status
          </button>
        {/if}
      </div>

      <div class="gateways-list">
        {#each gateways as gateway}
          <div
            class="gateway-card"
            class:online={gateway.status === "online"}
            class:offline={gateway.status === "offline"}
          >
            <div class="gateway-header">
              <div class="gateway-name">
                <h3>{gateway.name}</h3>
                <span class="gateway-domain">{gateway.domain}</span>
              </div>
              <div class="gateway-status">
                {#if gateway.status === "checking"}
                  <Loader
                    size={20}
                    style="animation: spin 1s linear infinite;"
                  />
                {:else if gateway.status === "online"}
                  <CheckCircle size={20} class="status-icon online" />
                  <span class="status-text online">Online</span>
                {:else}
                  <XCircle size={20} class="status-icon offline" />
                  <span class="status-text offline">Offline</span>
                {/if}
              </div>
            </div>

            {#if gateway.status === "online"}
              <div class="gateway-urls">
                <div class="url-row">
                  <div class="url-label">Path Format</div>
                  <div class="url-actions">
                    <a
                      href={gateway.pathUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="url-link"
                    >
                      <ExternalLink size={14} />
                      Open
                    </a>
                    <button
                      class="copy-btn"
                      onclick={() => copyToClipboard(gateway.pathUrl)}
                      title="Copy URL"
                    >
                      {#if copiedUrl === gateway.pathUrl}
                        <Check size={14} />
                      {:else}
                        <Copy size={14} />
                      {/if}
                    </button>
                  </div>
                </div>
                <code class="url-text">{gateway.pathUrl}</code>

                <div class="url-row">
                  <div class="url-label">Subdomain Format</div>
                  <div class="url-actions">
                    <a
                      href={gateway.subdomainUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="url-link"
                    >
                      <ExternalLink size={14} />
                      Open
                    </a>
                    <button
                      class="copy-btn"
                      onclick={() => copyToClipboard(gateway.subdomainUrl)}
                      title="Copy URL"
                    >
                      {#if copiedUrl === gateway.subdomainUrl}
                        <Check size={14} />
                      {:else}
                        <Copy size={14} />
                      {/if}
                    </button>
                  </div>
                </div>
                <code class="url-text">{gateway.subdomainUrl}</code>
              </div>
            {:else if gateway.status === "offline"}
              <div class="offline-note">
                <p>
                  This gateway is currently offline or hasn't cached this
                  content yet.
                </p>
                <p>
                  <a
                    href={gateway.pathUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="offline-link"
                  >
                    <ExternalLink size={14} />
                    Try visiting anyway
                  </a> — This might trigger content propagation to this gateway.
                </p>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </div>
</main>

<style>
  .container {
    max-width: 820px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  main {
    padding: 3rem 0;
  }

  .gateway-status-page {
    max-width: 1200px;
  }

  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    max-width: 600px;
    margin: 0 auto;
  }

  .empty-state h2 {
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 0.75rem;
    color: var(--text);
  }

  .empty-state p {
    color: var(--text);
    opacity: 0.6;
    margin-bottom: 2rem;
    font-size: 0.9375rem;
  }

  .url-example {
    background: var(--hover);
    border: 1px solid var(--divider);
    padding: 1.25rem;
    margin-bottom: 2rem;
    text-align: left;
  }

  .example-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text);
    opacity: 0.5;
    margin-bottom: 0.5rem;
  }

  .example-code {
    display: block;
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.8125rem;
    color: var(--text);
    word-break: break-all;
  }

  .info-text {
    color: var(--text);
    opacity: 0.6;
    font-size: 0.9375rem;
    margin-bottom: 1.5rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .p-page-header {
    margin-bottom: 2.5rem;
    text-align: center;
  }

  .p-page-header h1 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: var(--text);
  }

  .cid-display {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    margin-left: auto;
    margin-right: auto;
  }

  .cid-label {
    font-weight: 600;
    color: var(--text);
    opacity: 0.6;
    font-size: 0.875rem;
  }

  .cid-code {
    background: var(--hover);
    padding: 0.5rem 1rem;
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.75rem;
    color: var(--text);
    word-break: break-all;
    border: 1px solid var(--divider);
  }

  .copy-btn-small {
    background: transparent;
    border: 1px solid var(--divider);
    padding: 0.375rem;
    cursor: pointer;
    color: var(--text);
    transition: all 0.15s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .copy-btn-small:hover:not(:disabled) {
    background: var(--text);
    color: var(--bg);
    border-color: var(--text);
  }

  .copy-btn-small:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .status-message {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: var(--text);
    opacity: 0.6;
    font-size: 0.875rem;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }

  .button {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.875rem 2rem;
    border: 1px solid var(--text);
    background: transparent;
    color: var(--text);
    text-decoration: none;
    font-size: 0.9375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;
    font-family: inherit;
  }

  .button:hover {
    background: var(--text);
    color: var(--bg);
  }

  .button-secondary {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border: 1px solid var(--divider);
    background: transparent;
    color: var(--text);
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;
    font-family: inherit;
  }

  .button-secondary:hover {
    border-color: var(--text);
  }

  .gateways-list {
    display: grid;
    gap: 2.5rem;
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  }

  .gateway-card {
    background: var(--bg);
    border: 1px solid var(--divider);
    padding: 1.5rem;
    transition: all 0.15s ease;
  }

  .gateway-card.online {
    border-color: var(--text);
  }

  .gateway-card.offline {
    opacity: 0.5;
  }

  .gateway-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--divider);
  }

  .gateway-name h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text);
  }

  .gateway-domain {
    font-size: 0.875rem;
    color: var(--text);
    opacity: 0.6;
    font-family: "IBM Plex Mono", monospace;
  }

  .gateway-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .status-text {
    font-weight: 500;
    font-size: 0.875rem;
  }

  .status-text.online {
    color: var(--text);
  }

  .status-text.offline {
    color: var(--text);
    opacity: 0.5;
  }

  .gateway-status :global(.status-icon.online) {
    color: var(--text);
  }

  .gateway-status :global(.status-icon.offline) {
    color: var(--text);
    opacity: 0.5;
  }

  .gateway-urls {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .url-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.25rem;
  }

  .url-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text);
    opacity: 0.6;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .url-actions {
    display: flex;
    gap: 0.5rem;
  }

  .url-link {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.875rem;
    background: transparent;
    border: 1px solid var(--text);
    color: var(--text);
    text-decoration: none;
    font-size: 0.75rem;
    font-weight: 500;
    transition: all 0.15s ease;
  }

  .url-link:hover {
    background: var(--text);
    color: var(--bg);
  }

  .copy-btn {
    background: transparent;
    border: 1px solid var(--divider);
    padding: 0.375rem 0.5rem;
    cursor: pointer;
    color: var(--text);
    transition: all 0.15s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .copy-btn:hover {
    background: var(--text);
    color: var(--bg);
    border-color: var(--text);
  }

  .url-text {
    display: block;
    background: var(--hover);
    padding: 0.75rem;
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.75rem;
    color: var(--text);
    word-break: break-all;
    border: 1px solid var(--divider);
  }

  .offline-note {
    padding: 0.75rem 0;
  }

  .offline-note p {
    font-size: 0.8125rem;
    color: var(--text);
    opacity: 0.6;
    margin-bottom: 0.5rem;
    line-height: 1.5;
  }

  .offline-note p:last-child {
    margin-bottom: 0;
  }

  .offline-link {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    color: var(--text);
    text-decoration: none;
    font-weight: 500;
    border-bottom: 1px solid transparent;
    transition: border-color 0.15s ease;
  }

  .offline-link:hover {
    border-bottom-color: var(--text);
  }

  @media (max-width: 768px) {
    .container {
      padding: 0 1.5rem;
    }

    main {
      padding: 2rem 0;
    }

    .p-page-header h1 {
      font-size: 1.75rem;
    }

    .gateways-list {
      grid-template-columns: 1fr;
    }

    .cid-display {
      flex-direction: column;
    }

    .gateway-card {
      padding: 1rem;
    }
  }
</style>
