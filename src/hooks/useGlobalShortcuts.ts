import { useEffect } from "react";
import { useEditorStore } from "@/stores/editorStore";
import { useThemeStore } from "@/stores/themeStore";

/**
 * 全局快捷键 Hook
 * - Ctrl+S: 保存（触发 localStorage 持久化）
 * - Ctrl+N: 新建文件
 * - Ctrl+Shift+N: 切换暗色/亮色主题
 */
export function useGlobalShortcuts() {
  const addFile = useEditorStore(s => s.addFile);
  const files = useEditorStore(s => s.files);
  const toggleTheme = useThemeStore(s => s.toggleTheme);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isCtrl = e.ctrlKey || e.metaKey;

      // Ctrl+S: 保存（手动触发 localStorage 持久化）
      if (isCtrl && e.key === "s") {
        e.preventDefault();
        localStorage.setItem("md-files", JSON.stringify(files));
        const currentId = useEditorStore.getState().currentFileId;
        if (currentId) {
          localStorage.setItem("md-current", currentId);
        }
      }

      // Ctrl+N: 新建文件
      if (isCtrl && e.key === "n" && !e.shiftKey) {
        e.preventDefault();
        addFile();
      }

      // Ctrl+Shift+N: 切换主题
      if (isCtrl && e.key === "n" && e.shiftKey) {
        e.preventDefault();
        toggleTheme();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [addFile, files, toggleTheme]);
}
