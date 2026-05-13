import { create } from "zustand";
import type { EditorStore, MarkdownFile } from "@/types";

/** 从 localStorage 恢复文件数据 */
function loadFiles(): MarkdownFile[] {
  try {
    const saved = localStorage.getItem("md-files");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export const useEditorStore = create<EditorStore>(set => ({
  // ---- 初始状态 ----
  currentFileId: localStorage.getItem("md-current") || null,
  files: loadFiles(),

  // ---- 操作方法 ----

  /** 切换当前编辑的文件 */
  setCurrentFile: id => set({ currentFileId: id }),

  /** 更新当前文件的内容 */
  updateContent: content =>
    set(state => ({
      files: state.files.map(f =>
        f.id === state.currentFileId
          ? { ...f, content, updatedAt: Date.now() }
          : f,
      ),
    })),

  /** 新建文件 */
  addFile: name => {
    const newFile: MarkdownFile = {
      id: crypto.randomUUID(),
      name: name || `未命名-${Date.now()}.md`,
      content: "",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    set(state => ({
      files: [...state.files, newFile],
      currentFileId: newFile.id,
    }));
  },

  /** 删除文件 */
  deleteFile: id =>
    set(state => ({
      files: state.files.filter(f => f.id !== id),
      currentFileId:
        state.currentFileId === id
          ? (state.files.find(f => f.id !== id)?.id ?? null)
          : state.currentFileId,
    })),

  /** 重命名文件 */
  renameFile: (id, name) =>
    set(state => ({
      files: state.files.map(f => (f.id === id ? { ...f, name } : f)),
    })),
}));

// ========================================
// 自动保存：监听 Store 变化，1 秒防抖写入 localStorage
// ========================================
let saveTimer: ReturnType<typeof setTimeout> | null = null;

useEditorStore.subscribe(state => {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    localStorage.setItem("md-files", JSON.stringify(state.files));
    if (state.currentFileId) {
      localStorage.setItem("md-current", state.currentFileId);
    }
  }, 1000);
});
