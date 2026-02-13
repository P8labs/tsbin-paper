<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { authStore } from "$lib/stores/auth";
  import { papersStore, type Paper } from "$lib/stores/papers";
  import { Trash2, Edit, ExternalLink, FileText, Loader } from "lucide-svelte";
  import ConfirmDialog from "$lib/components/editor/ConfirmDialog.svelte";
  import moment from "moment";
  import "./profile.css";

  let user = $state<any>(null);
  let papers = $state<Paper[]>([]);
  let loading = $state(true);
  let authLoading = $state(true);
  let papersLoading = $state(false);
  let filter = $state<"all" | "published" | "draft">("all");
  let showConfirmDialog = $state(false);
  let paperToDelete = $state<Paper | null>(null);

  $effect(() => {
    loading = authLoading || papersLoading;
  });

  onMount(() => {
    authStore.init();

    const unsubscribe = authStore.subscribe((state) => {
      user = state.user;
      authLoading = state.loading;

      if (!state.loading && !state.user) {
        goto("/");
      } else if (state.user && !papersLoading && papers.length === 0) {
        papersStore.loadUserPapers(state.user.$id);
      }
    });

    const unsubscribePapers = papersStore.subscribe((state) => {
      papers = state.papers;
      papersLoading = state.loading;
    });

    return () => {
      unsubscribe();
      unsubscribePapers();
    };
  });

  const filteredPapers = $derived(
    filter === "all" ? papers : papers.filter((p) => p.status === filter),
  );

  function handleEdit(paper: Paper) {
    papersStore.setCurrentPaper(paper);
    goto("/editor");
  }

  function confirmDelete(paper: Paper) {
    paperToDelete = paper;
    showConfirmDialog = true;
  }

  async function handleDelete() {
    if (!paperToDelete) return;
    try {
      await papersStore.deletePaper(paperToDelete.$id);
      paperToDelete = null;
    } catch (error) {
      console.error("Failed to delete paper:", error);
    }
  }
</script>

<svelte:head>
  <title>My Papers - tsbin paper</title>
</svelte:head>

<div class="bg-effect"></div>

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

<main>
  <div class="profile-container">
    <div class="profile-header">
      <h1>My Papers</h1>
      <p>Manage your published and draft papers</p>
    </div>

    <div class="filter-tabs">
      <button
        onclick={() => (filter = "all")}
        class="filter-tab"
        class:active={filter === "all"}
      >
        All ({papers.length})
      </button>
      <button
        onclick={() => (filter = "published")}
        class="filter-tab"
        class:active={filter === "published"}
      >
        Published ({papers.filter((p) => p.status === "published").length})
      </button>
      <button
        onclick={() => (filter = "draft")}
        class="filter-tab"
        class:active={filter === "draft"}
      >
        Drafts ({papers.filter((p) => p.status === "draft").length})
      </button>
    </div>

    {#if loading}
      <div class="loading-state">
        <Loader size={32} style="animation: spin 1s linear infinite;" />
        <p>Loading your papers...</p>
      </div>
    {:else if filteredPapers.length === 0}
      <div class="empty-state">
        <FileText size={48} class="empty-state-icon" />
        <p>
          {filter === "all"
            ? "No papers yet"
            : filter === "published"
              ? "No published papers"
              : "No draft papers"}
        </p>
        <a href="/editor" class="button"> Create Your First Paper </a>
      </div>
    {:else}
      <div class="paper-list">
        {#each filteredPapers as paper (paper.$id)}
          <div class="paper-card">
            <div class="paper-card-content">
              <div class="paper-card-main">
                <h3>{paper.title}</h3>
                <div class="paper-meta">
                  <span
                    class="status-badge"
                    class:published={paper.status === "published"}
                    class:draft={paper.status === "draft"}
                  >
                    {paper.status === "published" ? "Published" : "Draft"}
                  </span>
                  <span class="paper-meta-item">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {moment(paper.createdAt).format("MMM D, YYYY")}
                  </span>
                  <span class="paper-meta-item">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                      />
                    </svg>
                    {paper.theme}
                  </span>
                  <span class="paper-meta-item">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    {paper.font}
                  </span>
                  {#if paper.watermark}
                    <span class="paper-meta-item">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Watermark
                    </span>
                  {/if}
                </div>
                {#if paper.content}
                  <p class="paper-excerpt">
                    {paper.content.substring(0, 150)}{paper.content.length > 150
                      ? "..."
                      : ""}
                  </p>
                {/if}
                {#if paper.ipfsCid}
                  <div class="ipfs-info">
                    <span class="ipfs-label">IPFS CID:</span>
                    <code class="ipfs-cid">{paper.ipfsCid}</code>
                    <a href="/ipfs?cid={paper.ipfsCid}" class="ipfs-link">
                      <ExternalLink size={14} />
                      View on IPFS
                    </a>
                  </div>
                {/if}
                <div class="paper-updated">
                  <span>Last updated: {moment(paper.updatedAt).fromNow()}</span>
                </div>
              </div>
              <div class="paper-actions">
                {#if paper.status === "draft"}
                  <button
                    onclick={() => handleEdit(paper)}
                    class="paper-action-btn"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onclick={() => confirmDelete(paper)}
                    class="paper-action-btn delete"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                {:else}
                  <a
                    href="/ipfs?cid={paper.ipfsCid}"
                    class="paper-action-btn view"
                    title="View Published"
                  >
                    <ExternalLink size={18} />
                  </a>
                {/if}
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <ConfirmDialog
    bind:show={showConfirmDialog}
    title="Delete Paper"
    message="Are you sure you want to delete '{paperToDelete?.title}'? This action cannot be undone."
    confirmText="Delete"
    cancelText="Cancel"
    onConfirm={handleDelete}
    onCancel={() => {
      paperToDelete = null;
    }}
  />
</main>
