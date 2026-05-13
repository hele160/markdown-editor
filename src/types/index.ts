/** 单个 Markdown 文件 */
export interface MarkdownFile {
  id: string;
  name: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

/** 编辑器 Store 的状态和操作 */
export interface EditorStore {
  currentFileId: string | null;
  files: MarkdownFile[];
  setCurrentFile: (id: string) => void;
  updateContent: (content: string) => void;
  addFile: (name?: string) => void;
  deleteFile: (id: string) => void;
  renameFile: (id: string, name: string) => void;
}

/** 主题类型 */
export type Theme = "light" | "dark";

/** 主题 Store 的状态和操作 */
export interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
}
