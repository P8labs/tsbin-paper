<script lang="ts">
  import { themes } from "$lib/config/themes";
  import { fonts } from "$lib/config/fonts";
  import ExportDropdown from "./ExportDropdown.svelte";
  import { ChevronDown, User, FilePlus, Settings } from "lucide-svelte";
  import { authStore, type User as AuthUser } from "$lib/stores/auth";

  interface Props {
    previewFont: string;
    previewTheme: string;
    includeWatermark: boolean;
    user: AuthUser | null;
    onFontChange: (font: string) => void;
    onThemeChange: (theme: string) => void;
    onWatermarkToggle: (value: boolean) => void;
    onExportPNG: () => void;
    onExportPDF: () => void;
    onExportHTML: () => void;
    onExportMarkdown: () => void;
    onPublish: () => void;
    onNewPaper: () => void;
    onProfileClick: () => void;
    onLogin: () => void;
  }

  let {
    previewFont,
    previewTheme,
    includeWatermark,
    user,
    onFontChange,
    onThemeChange,
    onWatermarkToggle,
    onExportPNG,
    onExportPDF,
    onExportHTML,
    onExportMarkdown,
    onPublish,
    onNewPaper,
    onProfileClick,
    onLogin,
  }: Props = $props();

  let showStylesDropdown = $state(false);
  let showProfileDropdown = $state(false);

  function handleLogout() {
    authStore.logout();
    showProfileDropdown = false;
  }
</script>

<header class="editor-header">
  <a href="/" class="editor-header-logo">PAPER</a>

  <div class="editor-header-controls">
    <div class="dropdown">
      <button
        onclick={() => (showStylesDropdown = !showStylesDropdown)}
        class="editor-btn"
        title="Customize styles"
      >
        <Settings size={14} />
        <span style="display: none;">Styles</span>
        <ChevronDown size={14} />
      </button>
      {#if showStylesDropdown}
        <div class="dropdown-menu" style="min-width: 14rem;">
          <div class="dropdown-section">
            <p class="dropdown-label">Theme</p>
            <div style="display: flex; flex-direction: column; gap: 0.25rem;">
              {#each themes as theme}
                <button
                  onclick={() => {
                    onThemeChange(theme.id);
                  }}
                  class="dropdown-item"
                  class:active={previewTheme === theme.id}
                >
                  {theme.label}
                  {#if previewTheme === theme.id}
                    <span class="dropdown-checkmark">✓</span>
                  {/if}
                </button>
              {/each}
            </div>
          </div>

          <div class="dropdown-section">
            <p class="dropdown-label">Font</p>
            <div style="display: flex; flex-direction: column; gap: 0.25rem;">
              {#each fonts as font}
                <button
                  onclick={() => {
                    onFontChange(font.id);
                  }}
                  class="dropdown-item"
                  class:active={previewFont === font.id}
                >
                  {font.label}
                  {#if previewFont === font.id}
                    <span class="dropdown-checkmark">✓</span>
                  {/if}
                </button>
              {/each}
            </div>
          </div>

          <div class="dropdown-section">
            <label
              style="display: flex; align-items: center; justify-content: space-between; cursor: pointer;"
            >
              <span class="dropdown-label" style="margin: 0;">Watermark</span>
              <input
                type="checkbox"
                checked={includeWatermark}
                onchange={(e) =>
                  onWatermarkToggle((e.target as HTMLInputElement).checked)}
                style="width: 1rem; height: 1rem; cursor: pointer;"
              />
            </label>
          </div>
        </div>
      {/if}
    </div>

    <ExportDropdown
      {onExportPNG}
      {onExportPDF}
      {onExportHTML}
      {onExportMarkdown}
    />

    {#if user}
      <button onclick={onNewPaper} class="editor-btn" title="New Paper">
        <FilePlus size={14} />
        <span style="display: none;">New</span>
      </button>

      <button onclick={onPublish} class="editor-btn editor-btn-primary">
        Publish
      </button>

      <div class="dropdown">
        <button
          onclick={() => (showProfileDropdown = !showProfileDropdown)}
          class="editor-btn"
          title="Profile"
          style="padding: 0.5rem;"
        >
          <User size={16} />
        </button>
        {#if showProfileDropdown}
          <div class="dropdown-menu" style="min-width: 11rem;">
            <div class="dropdown-section">
              <p
                style="font-size: 0.875rem; margin-bottom: 0; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
              >
                {user.name}
              </p>
              <p
                style="font-size: 0.75rem;  margin-bottom: 0; opacity: 0.6; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
              >
                {user.email}
              </p>
            </div>
            <div class="dropdown-section">
              <button
                onclick={() => {
                  onProfileClick();
                  showProfileDropdown = false;
                }}
                class="dropdown-item"
              >
                My Papers
              </button>
              <button onclick={handleLogout} class="dropdown-item">
                Logout
              </button>
            </div>
          </div>
        {/if}
      </div>
    {:else}
      <button onclick={onLogin} class="editor-btn-primary editor-btn">
        <span style="display: none;">Login to Publish</span>
        <span>Login</span>
      </button>
    {/if}
  </div>
</header>

<svelte:window
  onclick={(e) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".dropdown")) {
      showStylesDropdown = false;
      showProfileDropdown = false;
    }
  }}
/>

<style>
  @media (min-width: 640px) {
    .editor-header-controls .editor-btn span {
      display: inline !important;
    }
    .editor-btn-primary span:first-child {
      display: inline !important;
    }
    .editor-btn-primary span:last-child {
      display: none !important;
    }
  }
</style>
