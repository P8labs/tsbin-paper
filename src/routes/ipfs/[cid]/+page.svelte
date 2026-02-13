<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import {
    Loader,
    CheckCircle,
    XCircle,
    ExternalLink,
    Copy,
    Check,
  } from "lucide-svelte";

  let cid = $derived($page.params.cid);
  let loading = $state(true);
  let copiedUrl = $state<string | null>(null);

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
    { name: "Cloudflare", domain: "cloudflare-ipfs.com" },
    { name: "Pinata", domain: "gateway.pinata.cloud" },
    { name: "4everland", domain: "ipfs.4everland.io" },
    { name: "NFT.Storage", domain: "nftstorage.link" },
  ];

  let gateways = $state<GatewayInfo[]>([]);

  async function checkGateway(gateway: GatewayInfo) {
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
    loading = true;

    gateways = gatewayConfigs.map((config) => ({
      name: config.name,
      domain: config.domain,
      pathUrl: `https://${config.domain}/ipfs/${cid}`,
      subdomainUrl: `https://${cid}.ipfs.${config.domain}`,
      status: "checking" as const,
    }));

    await Promise.all(gateways.map((gateway) => checkGateway(gateway)));
    loading = false;
  }

  function copyToClipboard(url: string) {
    navigator.clipboard.writeText(url).then(() => {
      copiedUrl = url;
      setTimeout(() => (copiedUrl = null), 2000);
    });
  }

  onMount(() => {
    if (cid) {
      checkAllGateways();
    }
  });
</script>

<svelte:head>
  <title>IPFS Gateway Status{cid ? ` - ${cid}` : ""}</title>
</svelte:head>

<main>
  <div class="container gateway-status-page">
    <div class="p-page-header">
      <h1>IPFS Gateway Status</h1>
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
                <Loader size={20} style="animation: spin 1s linear infinite;" />
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
          {/if}
        </div>
      {/each}
    </div>
  </div>
</main>

<style>
  .bg-effect {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    opacity: 0.15;
    pointer-events: none;
    overflow: hidden;
  }

  .bg-effect::before {
    content: "";
    position: absolute;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(99, 102, 241, 0.8) 0%,
      rgba(139, 92, 246, 0.4) 40%,
      transparent 70%
    );
    top: 10%;
    left: 15%;
    animation: floatBall1 25s ease-in-out infinite;
    filter: blur(60px);
  }

  .bg-effect::after {
    content: "";
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(168, 85, 247, 0.8) 0%,
      rgba(192, 132, 252, 0.4) 40%,
      transparent 70%
    );
    bottom: 15%;
    right: 20%;
    animation: floatBall2 20s ease-in-out infinite;
    filter: blur(60px);
  }

  @keyframes floatBall1 {
    0%,
    100% {
      transform: translate(0, 0) scale(1);
    }
    33% {
      transform: translate(50px, -40px) scale(1.1);
    }
    66% {
      transform: translate(-30px, 30px) scale(0.9);
    }
  }

  @keyframes floatBall2 {
    0%,
    100% {
      transform: translate(0, 0) scale(1);
    }
    33% {
      transform: translate(-40px, 50px) scale(1.15);
    }
    66% {
      transform: translate(40px, -30px) scale(0.85);
    }
  }

  header {
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--divider);
    background: var(--bg);
  }

  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    font-family: "IBM Plex Mono", monospace;
    font-weight: 500;
    font-size: 1.125rem;
    letter-spacing: 0.05em;
    text-decoration: none;
    color: var(--text);
  }

  nav {
    display: flex;
    gap: 2rem;
    font-size: 0.9375rem;
  }

  nav a {
    color: var(--text);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.15s ease;
  }

  nav a:hover {
    border-bottom-color: var(--text);
  }

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

  .copy-btn-small:hover {
    background: var(--text);
    color: var(--bg);
    border-color: var(--text);
  }

  .status-message {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: var(--text);
    opacity: 0.6;
    font-size: 0.875rem;
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

  @media (max-width: 768px) {
    .container {
      padding: 0 1.5rem;
    }

    .header-container {
      flex-direction: column;
      align-items: flex-start;
      gap: 1.5rem;
    }

    nav {
      gap: 1.5rem;
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
