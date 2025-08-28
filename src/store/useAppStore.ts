import { create } from "zustand";
import { productCatalog, Product } from "../data/productCatalog";
import { Recommendation, getAIRecommendations } from "../api/aiClient";

interface AppState {
  products: Product[];
  recommendations: Recommendation[];
  loading: boolean;
  error: string | null;
  fetchRecommendations: (query: string) => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
  products: productCatalog,
  recommendations: [],
  loading: false,
  error: null,
  fetchRecommendations: async (query: string) => {
    set({ loading: true, error: null });
    try {
      const results = await getAIRecommendations(query, productCatalog);
      set({ recommendations: results, loading: false });
    } catch (err) {
      set({ error: "Failed to fetch AI recommendations.", loading: false });
    }
  },
}));
