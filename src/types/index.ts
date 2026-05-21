// 文件
export interface MarkdownFile {
  id: string;
  name: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}
// 编辑器 Store
export interface EditorStore {
  currentFileId: string | null;
  files: MarkdownFile[];

  setCurrentFile: (id: string) => void;
  // 显示id
  updateContent: (id: string, content: string) => void;

  addFile: (name?: string) => void;
  deleteFile: (id: string) => void;
  renameFile: (id: string, newName: string) => void;
}

// 主题
export type Theme = "light" | "dark";

// 主题 Store
export interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
}
