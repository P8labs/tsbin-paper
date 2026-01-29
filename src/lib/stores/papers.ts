import { writable } from "svelte/store";
import { databases, DATABASE_ID, COLLECTION_ID } from "$lib/appwrite";
import { ID, Query } from "appwrite";

export interface Paper {
  $id: string;
  title: string;
  content: string;
  htmlContent: string;
  theme: string;
  font: string;
  watermark: boolean;
  status: "draft" | "published";
  ipfsCid?: string;
  ipfsGateway?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export type PaperInput = Omit<Paper, "$id" | "createdAt" | "updatedAt">;

function createPapersStore() {
  const { subscribe, set, update } = writable<{
    papers: Paper[];
    loading: boolean;
    currentPaper: Paper | null;
  }>({
    papers: [],
    loading: false,
    currentPaper: null,
  });

  return {
    subscribe,

    async loadUserPapers(userId: string) {
      update((state) => ({ ...state, loading: true }));
      try {
        const response = await databases.listRows({
          databaseId: DATABASE_ID,
          tableId: COLLECTION_ID,
          queries: [
            Query.equal("userId", userId),
            Query.orderDesc("$createdAt"),
            Query.limit(100),
          ],
        });
        update((state) => ({
          ...state,
          papers: response.rows as unknown as Paper[],
          loading: false,
        }));
      } catch (error) {
        console.error("Failed to load papers:", error);
        update((state) => ({ ...state, loading: false }));
      }
    },

    async createPaper(paper: PaperInput) {
      try {
        const doc = await databases.createRow({
          databaseId: DATABASE_ID,
          tableId: COLLECTION_ID,
          rowId: ID.unique(),
          data: paper,
        });
        update((state) => ({
          ...state,
          papers: [doc as unknown as Paper, ...state.papers],
          currentPaper: doc as unknown as Paper,
        }));
        return doc as unknown as Paper;
      } catch (error) {
        console.error("Failed to create paper:", error);
        throw error;
      }
    },

    async updatePaper(paperId: string, updates: Partial<PaperInput>) {
      try {
        const doc = await databases.updateRow({
          databaseId: DATABASE_ID,
          tableId: COLLECTION_ID,
          rowId: paperId,
          data: updates,
        });
        update((state) => ({
          ...state,
          papers: state.papers.map((p) =>
            p.$id === paperId ? (doc as unknown as Paper) : p,
          ),
          currentPaper:
            state.currentPaper?.$id === paperId
              ? (doc as unknown as Paper)
              : state.currentPaper,
        }));
        return doc as unknown as Paper;
      } catch (error) {
        console.error("Failed to update paper:", error);
        throw error;
      }
    },

    async deletePaper(paperId: string) {
      try {
        await databases.deleteRow({
          databaseId: DATABASE_ID,
          tableId: COLLECTION_ID,
          rowId: paperId,
        });
        update((state) => ({
          ...state,
          papers: state.papers.filter((p) => p.$id !== paperId),
          currentPaper:
            state.currentPaper?.$id === paperId ? null : state.currentPaper,
        }));
      } catch (error) {
        console.error("Failed to delete paper:", error);
        throw error;
      }
    },

    async loadPaper(paperId: string) {
      try {
        const doc = await databases.getRow({
          databaseId: DATABASE_ID,
          tableId: COLLECTION_ID,
          rowId: paperId,
        });
        update((state) => ({
          ...state,
          currentPaper: doc as unknown as Paper,
        }));
        return doc as unknown as Paper;
      } catch (error) {
        console.error("Failed to load paper:", error);
        throw error;
      }
    },

    setCurrentPaper(paper: Paper | null) {
      update((state) => ({ ...state, currentPaper: paper }));
    },

    clearCurrentPaper() {
      update((state) => ({ ...state, currentPaper: null }));
    },
  };
}

export const papersStore = createPapersStore();
