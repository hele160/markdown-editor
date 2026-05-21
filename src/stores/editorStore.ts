import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { EditorStore, MarkdownFile } from "@/types";

/** 初始示例文件 */
function createWelcomeFile(): MarkdownFile {
  return {
    id: crypto.randomUUID(),
    name: "欢迎使用.md",
    content: `# 🎉 欢迎使用 Markdown 编辑器

这是一个功能完善的 Markdown 编辑器，支持实时预览、文件管理和多种编辑功能。

## 基础语法

### 文本样式

- **加粗**：\`**加粗**\`
- *斜体*：\`*斜体*\`
- ~~删除线~~：\`~~删除线~~\`
- \`行内代码\`：\`\\\`行内代码\\\`\`

### 列表

1. 有序列表项 1
2. 有序列表项 2
   - 无序子列表
   - 无序子列表

### 任务列表

- [x] 已完成任务
- [ ] 未完成任务
- [ ] 待办事项

### 引用

> 这是一段引用文本
> 引用可以跨多行

### 代码块

\`\`\`typescript
function greet(name: string): string {
  return \`你好，\${name}！\`;
}

console.log(greet("Markdown"));
\`\`\`

### 表格

| 功能 | 快捷键 | 说明 |
|------|--------|------|
| 新建文件 | Ctrl+N | 创建新文档 |
| 保存 | Ctrl+S | 保存到本地 |
| 切换主题 | Ctrl+Shift+N | 明暗切换 |

---

> 💡 **提示**：试试在左侧文件管理器中新建文件，或使用工具栏上的按钮快速插入 Markdown 语法！
`,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

export const useEditorStore = create<EditorStore>()(
  persist(
    immer(set => ({
      currentFileId: null as string | null,
      files: [] as MarkdownFile[],

      // 切换当前编辑的文件
      setCurrentFile: id =>
        set(state => {
          state.currentFileId = id;
        }),

      // 更新指定文件的内容
      updateContent: (id, content) =>
        set(state => {
          const file = state.files.find(f => f.id === id);
          if (file) {
            file.content = content;
            file.updatedAt = Date.now();
          }
        }),

      // 新建文件
      addFile: name => {
        const newFile: MarkdownFile = {
          id: crypto.randomUUID(),
          name: name || `未命名-${new Date().toLocaleDateString()}`,
          content: "",
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        set(state => {
          state.files.unshift(newFile);
          state.currentFileId = newFile.id;
        });
      },

      // 删除文件并处理 ID 选中逻辑
      deleteFile: id =>
        set(state => {
          const index = state.files.findIndex(f => f.id === id);
          if (index !== -1) {
            state.files.splice(index, 1);

            // 如果删除的是当前选中的文件
            if (state.currentFileId === id) {
              state.currentFileId =
                state.files.length > 0 ? state.files[0].id : null;
            }
          }
        }),

      // 重命名文件
      renameFile: (id, newName) =>
        set(state => {
          const file = state.files.find(f => f.id === id);
          if (file) {
            file.name = newName;
            file.updatedAt = Date.now();
          }
        }),
    })),
    {
      name: "md-file-storage",
      storage: createJSONStorage(() => localStorage),
      // 持久化 files 和 currentFileId
      partialize: state => ({
        files: state.files,
        currentFileId: state.currentFileId,
      }),
      // 从 localStorage 恢复后，如果没有数据则创建欢迎文件
      onRehydrateStorage: () => state => {
        if (state && state.files.length === 0) {
          const welcomeFile = createWelcomeFile();
          state.files.push(welcomeFile);
          state.currentFileId = welcomeFile.id;
        }
      },
    },
  ),
);
