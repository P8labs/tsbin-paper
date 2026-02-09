<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { account } from "$lib/appwrite";
  import { authStore } from "$lib/stores/auth";

  onMount(async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const secret = urlParams.get("secret");
      const userId = urlParams.get("userId");

      if (secret && userId) {
        await account.createSession({
          secret,
          userId,
        });

        await authStore.init();

        goto("/editor");
      } else {
        console.error("Missing OAuth parameters");
        goto("/");
      }
    } catch (error) {
      console.error("Auth callback error:", error);
      goto("/");
    }
  });
</script>

<svelte:head>
  <title>Authenticating...</title>
</svelte:head>

<main>
  <div
    style="display: flex; align-items: center; justify-content: center; min-height: 50vh; text-align: center;"
  >
    <div>
      <div
        style="width: 48px; height: 48px; border: 4px solid var(--text); border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 1rem;"
      ></div>
      <p style="opacity: 0.75;">Completing login...</p>
    </div>
  </div>
</main>

<style>
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
