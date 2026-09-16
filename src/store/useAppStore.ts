import { create } from "zustand";

interface AppState {
  isNavOpen: boolean;
  activeSection: string;
  setNavOpen: (open: boolean) => void;
  toggleNav: () => void;
  setActiveSection: (section: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isNavOpen: false,
  activeSection: "hero",
  setNavOpen: (open) => set({ isNavOpen: open }),
  toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen })),
  setActiveSection: (section) => set({ activeSection: section }),
}));
