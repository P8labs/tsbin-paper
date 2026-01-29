import { writable } from "svelte/store";
import { account } from "$lib/appwrite";
import { OAuthProvider } from "appwrite";

export interface User {
  $id: string;
  name: string;
  email: string;
}

function createAuthStore() {
  const { subscribe, set, update } = writable<{
    user: User | null;
    loading: boolean;
  }>({
    user: null,
    loading: true,
  });

  return {
    subscribe,

    async init() {
      try {
        const session = await account.get();
        set({
          user: {
            $id: session.$id,
            name: session.name,
            email: session.email,
          },
          loading: false,
        });
      } catch {
        set({ user: null, loading: false });
      }
    },

    async loginWithGoogle() {
      const redirectUrl =
        typeof window !== "undefined"
          ? `${window.location.origin}/auth/callback`
          : "";

      account.createOAuth2Token({
        provider: OAuthProvider.Google,
        success: redirectUrl,
        failure: redirectUrl + "/error",
      });
    },

    async logout() {
      try {
        await account.deleteSession({ sessionId: "current" });
        set({ user: null, loading: false });
      } catch (error) {
        console.error("Logout failed:", error);
      }
    },

    setUser(user: User | null) {
      update((state) => ({ ...state, user, loading: false }));
    },
  };
}

export const authStore = createAuthStore();
