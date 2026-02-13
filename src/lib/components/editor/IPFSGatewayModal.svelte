<script lang="ts">
  import { Copy, ExternalLink, Check } from "lucide-svelte";

  interface Props {
    show: boolean;
    cid: string;
    gateways: string[];
  }

  let { show = $bindable(false), cid, gateways }: Props = $props();
  let copiedCid = $state(false);
  let copiedGateway = $state<string | null>(null);

  function copyToClipboard(text: string, type: "cid" | "gateway") {
    navigator.clipboard.writeText(text).then(() => {
      if (type === "cid") {
        copiedCid = true;
        setTimeout(() => (copiedCid = false), 2000);
      } else {
        copiedGateway = text;
        setTimeout(() => (copiedGateway = null), 2000);
      }
    });
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      show = false;
    }
  }
</script>

{#if show}
  <div class="modal-backdrop" onclick={handleBackdropClick} role="presentation">
    <div class="modal-content">
      <div class="modal-header">
        <h2>IPFS Information</h2>
        <button
          class="close-button"
          onclick={() => (show = false)}
          aria-label="Close"
        >
          ×
        </button>
      </div>

      <div class="modal-body">
        <div class="cid-section">
          <label>Content Identifier (CID)</label>
          <div class="cid-copy-container">
            <code class="cid-text">{cid}</code>
            <button
              class="copy-button"
              onclick={() => copyToClipboard(cid, "cid")}
              title="Copy CID"
            >
              {#if copiedCid}
                <Check size={16} />
              {:else}
                <Copy size={16} />
              {/if}
            </button>
          </div>
        </div>

        <div class="gateways-section">
          <label>Alternative IPFS Gateways</label>
          <p class="gateway-description">
            Access your content through any of these public IPFS gateways:
          </p>
          <ul class="gateway-list">
            {#each gateways as gateway}
              {@const fullUrl = `${gateway}${cid}`}
              <li class="gateway-item">
                <a
                  href={fullUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="gateway-link"
                >
                  <ExternalLink size={16} />
                  <span class="gateway-url">{gateway}</span>
                </a>
                <button
                  class="copy-button"
                  onclick={() => copyToClipboard(fullUrl, "gateway")}
                  title="Copy full URL"
                >
                  {#if copiedGateway === fullUrl}
                    <Check size={16} />
                  {:else}
                    <Copy size={16} />
                  {/if}
                </button>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 1rem;
  }

  .modal-content {
    background: white;
    border-radius: 0.75rem;
    box-shadow:
      0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
    max-width: 600px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
  }

  .modal-header {
    padding: 1.5rem;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .modal-header h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
  }

  .close-button {
    background: none;
    border: none;
    font-size: 2rem;
    line-height: 1;
    color: #6b7280;
    cursor: pointer;
    padding: 0;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.25rem;
    transition: all 0.2s;
  }

  .close-button:hover {
    background: #f3f4f6;
    color: #1f2937;
  }

  .modal-body {
    padding: 1.5rem;
  }

  .cid-section,
  .gateways-section {
    margin-bottom: 1.5rem;
  }

  .gateways-section:last-child {
    margin-bottom: 0;
  }

  label {
    display: block;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.025em;
  }

  .cid-copy-container {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    background: #f9fafb;
    padding: 0.75rem;
    border-radius: 0.5rem;
    border: 1px solid #e5e7eb;
  }

  .cid-text {
    flex: 1;
    font-family: "Courier New", monospace;
    font-size: 0.875rem;
    color: #1f2937;
    word-break: break-all;
    background: none;
    padding: 0;
  }

  .copy-button {
    flex-shrink: 0;
    background: white;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    padding: 0.5rem;
    cursor: pointer;
    color: #6b7280;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .copy-button:hover {
    background: #f3f4f6;
    color: #3b82f6;
    border-color: #3b82f6;
  }

  .gateway-description {
    color: #6b7280;
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }

  .gateway-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .gateway-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem;
    background: #f9fafb;
    border-radius: 0.5rem;
    border: 1px solid #e5e7eb;
    list-style: none !important;
  }

  ul li:before {
    content: "" !important;
    position: absolute;
    left: 0;
  }

  .gateway-link {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #3b82f6;
    text-decoration: none;
    font-size: 0.875rem;
    transition: color 0.2s;
  }

  .gateway-link:hover {
    color: #2563eb;
  }

  .gateway-url {
    word-break: break-all;
  }
</style>
