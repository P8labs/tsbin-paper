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

<div class="flex items-center justify-center min-h-screen bg-bg">
  <div class="text-center">
    <div
      class="w-12 h-12 border-4 border-text-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"
    ></div>
    <p class="text-text-secondary">Completing login...</p>
  </div>
</div>
