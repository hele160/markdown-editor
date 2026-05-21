import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { ThemeStore } from "@/types";

/** 将主题同步到 <html> 元素的 data-theme 属性 */
function applyTheme(theme: string) {
  document.documentElement.setAttribute("data-theme", theme);
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    immer(set => ({
      theme: "light",

      toggleTheme: () =>
        set(state => {
          state.theme = state.theme === "light" ? "dark" : "light";
          applyTheme(state.theme);
        }),
    })),
    {
      name: "md-theme-storage",
      storage: createJSONStorage(() => localStorage),
      // 从 localStorage 恢复后，同步主题到 <html>
      onRehydrateStorage: () => state => {
        if (state) {
          applyTheme(state.theme);
        }
      },
    },
  ),
);
