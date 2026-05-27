import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useUserStore = create(
  persist(
    (set) => ({
      currentUser: null,
      loading: false,
      error: null,

      authStarted: () => set({ loading: true, error: null }),
      authSuccessful: (user) => set({ currentUser: user, loading: false, error: null }),
      authFailed: (error) => set({ loading: false, error }),

      logoutStarted: () => set({ loading: true, error: null }),
      logoutSuccess: () => set({ currentUser: null, loading: false, error: null }),
      logoutFailed: (error) => set({ loading: false, error }),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({ currentUser: state.currentUser }),
    }
  )
)
