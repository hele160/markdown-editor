import { create } from "zustand";
import type { Theme, ThemeStore } from "@/types";

export const useThemeStore = create<ThemeStore>(set => ({
  theme: (localStorage.getItem("md-theme") as Theme) || "light",

  toggleTheme: () =>
    set(state => {
      const next = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("md-theme", next);
      return { theme: next };
    }),
}));
