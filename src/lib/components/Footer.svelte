<script lang="ts">
  import moment from "moment";
  import { browser } from "$app/environment";

  const buildTime =
    import.meta.env.PUBLIC_BUILD_TIME || new Date().toISOString();
  const commitHash = import.meta.env.PUBLIC_COMMIT_HASH || "unknown";
  const timeAgo = moment(buildTime).fromNow();

  let theme = $state("system");

  $effect(() => {
    if (browser) {
      const saved = localStorage.getItem("theme") || "system";
      theme = saved;
      applyTheme(saved);
    }
  });

  function applyTheme(newTheme: string) {
    if (!browser) return;

    localStorage.setItem("theme", newTheme);
    const root = document.documentElement;

    if (newTheme === "system") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", newTheme);
    }
  }

  function toggleTheme() {
    const themes = ["light", "dark"];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    theme = nextTheme;
    applyTheme(nextTheme);
  }
</script>

<footer class="border-t border-border py-3 px-6 mt-auto">
  <div
    class="max-w-400 mx-auto flex items-center justify-between gap-4 text-xs sm:flex-row flex-col-reverse"
  >
    <div class="text-text-tertiary">
      <span>© 2026 tsbin, Built at P8labs</span>
      <div class="flex items-center gap-1 max-sm:justify-center">
        <span>{timeAgo}</span>
        <span>•</span>
        <code>{commitHash}</code>
      </div>
    </div>

    <nav class="flex items-center gap-1 md:gap-3">
      <a
        href="/about"
        class="text-text-secondary hover:text-text-primary no-underline transition-colors"
        >About</a
      >
      <span class="text-border">•</span>
      <a
        href="/terms"
        class="text-text-secondary hover:text-text-primary no-underline transition-colors"
        >Terms</a
      >
      <span class="text-border">•</span>
      <a
        href="https://github.com/P8labs/tsbin-paper"
        target="_blank"
        rel="noopener"
        class="text-text-secondary hover:text-text-primary no-underline transition-colors"
        >GitHub</a
      >
      <button
        onclick={toggleTheme}
        class="px-3 py-1.5 text-text-secondary hover:text-text-primary rounded transition-colors"
        title="Toggle theme"
      >
        {theme}
      </button>
    </nav>
  </div>
</footer>
